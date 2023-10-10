import { type Express, RequestHandler } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { REFINE_API_URL, SERVER_PORT } from "./constants";
import { getProjectIdFromPackageJson } from "./project-id/get-project-id-from-package-json";

const onProxyRes: Options["onProxyRes"] | undefined = (proxyRes) => {
    if (proxyRes.headers["set-cookie"]) {
        proxyRes.headers["set-cookie"]?.forEach((cookie, i) => {
            if (
                proxyRes &&
                proxyRes.headers &&
                proxyRes.headers["set-cookie"]
            ) {
                proxyRes.headers["set-cookie"][i] = cookie.replace(
                    "Secure;",
                    "",
                );
            }
        });
    }
};

const restream: Options["onProxyReq"] = function (proxyReq, req) {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
};

let currentProjectId: string | null | false = null;
const projectIdAppender: RequestHandler = async (req, res, next) => {
    if (!currentProjectId) {
        currentProjectId = await getProjectIdFromPackageJson();
    }

    if (currentProjectId) {
        req.headers["x-project-id"] = currentProjectId;
    }

    next();
};

export const serveProxy = (app: Express) => {
    const authProxy = createProxyMiddleware({
        target: REFINE_API_URL,
        // secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api/.auth": "/.auth" },
        cookieDomainRewrite: {
            "refine.dev": "",
        },
        logLevel: __DEVELOPMENT__ ? "debug" : "silent",
        headers: {
            "auth-base-url-rewrite": `http://localhost:${SERVER_PORT}/api/.auth`,
        },
        onProxyRes,
    });

    app.use("/api/.auth", authProxy);

    const refineApiProxy = createProxyMiddleware({
        target: REFINE_API_URL,
        secure: false,
        changeOrigin: true,
        logLevel: __DEVELOPMENT__ ? "debug" : "silent",
        pathRewrite: { "^/api/.refine": "/.refine" },
        onProxyReq: restream,
    });

    app.use("/api/.refine", projectIdAppender, refineApiProxy);
};
