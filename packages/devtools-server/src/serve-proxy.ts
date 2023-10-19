import { readJSON, writeJSON } from "fs-extra";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import path from "path";
import { REFINE_API_URL, SERVER_PORT } from "./constants";
import { getProjectIdFromPackageJson } from "./project-id/get-project-id-from-package-json";

import type { Express, RequestHandler } from "express";

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

export const serveProxy = async (app: Express) => {
    let token: string | undefined = undefined;

    try {
        const persist = await readJSON(
            path.join(__dirname, "..", ".persist.json"),
        );
        token = persist.auth_token;
    } catch (error) {
        //
    }

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
        selfHandleResponse: true,
        onProxyReq: (proxyReq) => {
            if (token) {
                proxyReq.setHeader("X-Session-Token", token ?? "");
            }
        },
        onProxyRes: (proxyRes, req, res) => {
            if (req.url.includes("self-service/methods/oidc/callback")) {
                let body = "";
                proxyRes.on("data", (chunk) => {
                    body += chunk;
                });
                proxyRes.on("end", () => {
                    let sessionToken: string | undefined = undefined;
                    try {
                        const parsed = JSON.parse(body);
                        sessionToken = parsed.session_token;
                    } catch (err) {
                        //
                    }
                    if (!sessionToken) {
                        if (
                            body?.includes?.(
                                "An+account+with+the+same+identifier",
                            )
                        ) {
                            res.redirect(
                                "/after-login?error=An+account+with+the+same+identifier+exists+already",
                            );
                            return;
                        }
                        res.redirect(
                            "/after-login?error=Invalid-session-token",
                        );
                        return;
                    }
                    token = sessionToken;
                    try {
                        writeJSON(path.join(__dirname, "..", ".persist.json"), {
                            auth_token: sessionToken,
                        });
                    } catch (error) {
                        //
                    }
                    res.redirect(`/after-login`);
                });
            } else {
                res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            }
        },
    });

    app.use("/api/.auth", authProxy);

    const refineApiProxy = createProxyMiddleware({
        target: REFINE_API_URL,
        secure: false,
        changeOrigin: true,
        logLevel: __DEVELOPMENT__ ? "debug" : "silent",
        pathRewrite: { "^/api/.refine": "/.refine" },
        onProxyReq: (proxyReq, ...rest) => {
            if (token) {
                // proxyReq.setHeader("X-Session-Token", token ?? "");
                proxyReq.setHeader("Authorization", `Bearer ${token}`);
                // remove cookies just in case
                proxyReq.removeHeader("cookie");
            }

            restream(proxyReq, ...rest);
        },
    });

    app.use("/api/.refine", projectIdAppender, refineApiProxy);
};
