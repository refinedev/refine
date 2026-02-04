import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { REFINE_API_URL } from "./constants";
import { getProjectIdFromPackageJson } from "./project-id/get-project-id-from-package-json";

import type { Express, RequestHandler } from "express";

export const serveProxy = async (app: Express) => {
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

  app.use("/api/.refine", projectIdAppender, refineProxy);
};
