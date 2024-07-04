import path from "path";
import { readJSON, writeJSON } from "fs-extra";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import {
  REFINE_API_URL,
  AUTH_SERVER_URL,
  AUTH_CALLBACK_API_PATH,
  AUTH_CALLBACK_UI_PATH,
  AUTH_TRIGGER_API_PATH,
} from "./constants";
import { getProjectIdFromPackageJson } from "./project-id/get-project-id-from-package-json";

import type { Express, RequestHandler } from "express";

const persistPath = path.join(__dirname, "..", ".persist.json");

const saveAuth = async (token?: string, jwt?: string) => {
  try {
    await writeJSON(persistPath, { token, jwt });
  } catch (error) {
    //
  }
};

const loadAuth = async () => {
  try {
    return (await readJSON(persistPath)) as { token?: string; jwt?: string };
  } catch (error) {
    //
  }

  return {};
};

export const serveProxy = async (app: Express) => {
  let { token, jwt } = await loadAuth();

  const authProxy = createProxyMiddleware({
    target: `${AUTH_SERVER_URL}/api/.auth`,
    secure: false,
    changeOrigin: true,
    logger: __DEVELOPMENT__ ? console : undefined,
    on: {
      proxyReq: fixRequestBody,
      proxyRes: (_proxyRes, req) => {
        if (req.url?.includes("self-service/logout/api")) {
          token = undefined;
          jwt = undefined;
          saveAuth();
        }
      },
    },
  });

  const refineProxy = createProxyMiddleware({
    target: `${REFINE_API_URL}/.refine`,
    secure: false,
    changeOrigin: true,
    logger: __DEVELOPMENT__ ? console : undefined,
    on: {
      proxyReq: fixRequestBody,
    },
  });

  let currentProjectId: string | null | false = null;
  const projectIdAppender: RequestHandler = async (req, _res, next) => {
    if (!currentProjectId) {
      currentProjectId = await getProjectIdFromPackageJson();
    }

    if (currentProjectId) {
      req.headers["x-project-id"] = currentProjectId;
    }

    next();
  };

  const appendAuth: RequestHandler = async (req, _res, next) => {
    if (token) {
      req.headers["X-Session-Token"] = token;
    }
    if (req.url?.includes("self-service/logout/api")) {
      req.body = {
        session_token: token,
      };

      req.headers["Content-Length"] = Buffer.byteLength(
        JSON.stringify(req.body),
      ).toString();
    }

    next();
  };

  const appendJwt: RequestHandler = async (req, _res, next) => {
    if (jwt) {
      req.headers["Authorization"] = `Bearer ${jwt}`;
      delete req.headers["cookie"];
    }

    next();
  };

  const loginCallback: RequestHandler = async (req, res, _next) => {
    const query = req.query;

    if (query.token && query.jwt) {
      token = query.token as string;
      jwt = query.jwt as string;
      await saveAuth(query.token as string, query.jwt as string);
    }

    const errorParams = new URLSearchParams();
    if (query.error) {
      errorParams.set("error", query.error as string);
    }
    if (query.code) {
      errorParams.set("code", query.code as string);
    }

    res.redirect(`${AUTH_CALLBACK_UI_PATH}?${errorParams.toString()}`);
  };

  const loginTrigger: RequestHandler = async (req, res, _next) => {
    const query = req.query;
    const protocol = req.secure ? "https" : "http";
    const host = req.headers.host;

    if (!host) {
      res.redirect(`${AUTH_CALLBACK_API_PATH}?error=Missing%20Host`);
      return;
    }

    const callbackUrl = `${protocol}://${host}${AUTH_CALLBACK_API_PATH}`;

    const params = new URLSearchParams({
      provider: query.provider as string,
      returnUrl: encodeURIComponent(callbackUrl),
    });

    res.redirect(`${AUTH_SERVER_URL}/login?${params.toString()}`);
  };

  app.use(AUTH_TRIGGER_API_PATH, loginTrigger);

  app.use(AUTH_CALLBACK_API_PATH, loginCallback);

  app.use("/api/.auth", appendAuth, authProxy);

  app.use("/api/.refine", projectIdAppender, appendJwt, refineProxy);
};
