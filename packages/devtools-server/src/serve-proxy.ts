import { readJSON, writeJSON } from "fs-extra";
import { FrontendApi } from "@ory/client";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import path from "path";
import { REFINE_API_URL, SERVER_PORT } from "./constants";
import { getProjectIdFromPackageJson } from "./project-id/get-project-id-from-package-json";

import type { Express, RequestHandler } from "express";

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

const restream: Options["onProxyReq"] = (proxyReq, req) => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

const tokenize = async (token: string) => {
  try {
    const ORY_URL = `${REFINE_API_URL}/.auth`;

    const ory = new FrontendApi({
      isJsonMime: () => true,
      basePath: ORY_URL,
      baseOptions: {
        withCredentials: true,
      },
    });

    const { data } = await ory.toSession({
      xSessionToken: token,
      tokenizeAs: "jwt_template_1",
    });

    return data?.tokenized;
  } catch (err) {
    //
  }

  return undefined;
};

const saveAuth = async (token?: string, jwt?: string) => {
  try {
    writeJSON(path.join(__dirname, "..", ".persist.json"), {
      token: token,
      jwt: jwt,
    });
  } catch (error) {
    //
  }
};

const loadAuth = async () => {
  try {
    const persist = await readJSON(path.join(__dirname, "..", ".persist.json"));
    return persist as { token?: string; jwt?: string };
  } catch (error) {
    //
  }

  return {
    token: undefined,
    jwt: undefined,
  };
};

const handleLogoutToken: (
  token?: string,
) => NonNullable<Options["onProxyReq"]> = (token) => {
  return (proxyReq, req) => {
    if (req.url.includes("self-service/logout/api")) {
      const bodyData = JSON.stringify({
        session_token: token,
      });
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
    }
  };
};

const handleSignInCallbacks: (
  onToken: (token?: string, jwt?: string) => void,
) => NonNullable<Options["onProxyRes"]> = (onToken) => {
  return (proxyRes, req, res) => {
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
        if (body?.includes?.("an+account+with+the+same+identifier")) {
          res.redirect(
            "/after-login?error=An+account+with+the+same+identifier+exists+already",
          );
          return;
        }
        res.redirect("/after-login?error=Invalid-session-token");
        return;
      }

      // After grabbing the session_token, convert it to JWT, then redirect to /after-login
      tokenize(sessionToken).then((tokenized) => {
        onToken(sessionToken, tokenized ?? "");
        res.redirect("/after-login");
      });
    });
  };
};

export const serveProxy = async (app: Express) => {
  let { token, jwt } = await loadAuth();

  const authProxy = createProxyMiddleware({
    target: REFINE_API_URL,
    // secure: false,
    changeOrigin: true,
    pathRewrite: { "^/api/.auth": "/.auth" },
    cookieDomainRewrite: {
      "refine.dev": "localhost",
    },
    logLevel: __DEVELOPMENT__ ? "debug" : "silent",
    headers: {
      "auth-base-url-rewrite": `http://localhost:${SERVER_PORT}/api/.auth`,
    },
    selfHandleResponse: true,
    onProxyReq: (proxyReq, req, ...rest) => {
      if (token) {
        proxyReq.setHeader("X-Session-Token", token ?? "");

        handleLogoutToken(token)(proxyReq, req, ...rest);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      const newSetCookie = proxyRes.headers["set-cookie"]?.map((cookie) =>
        cookie
          .replace("Domain=refine.dev;", "Domain=localhost;")
          .replace(" HttpOnly; Secure; SameSite=Lax", ""),
      );
      if (newSetCookie) proxyRes.headers["set-cookie"] = newSetCookie;

      if (req.url.includes("self-service/methods/oidc/callback")) {
        return handleSignInCallbacks((_token, _jwt) => {
          token = _token;
          jwt = _jwt;
          saveAuth(token, jwt);
        })(proxyRes, req, res);
      }
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
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
      if (jwt) {
        proxyReq.setHeader("Authorization", `Bearer ${jwt}`);
        proxyReq.removeHeader("cookie");
      }

      restream(proxyReq, ...rest);
    },
  });

  app.use("/api/.refine", projectIdAppender, refineApiProxy);
};
