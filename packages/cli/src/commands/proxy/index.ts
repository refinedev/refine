import { ENV } from "@utils/env";
import { Command } from "commander";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { OnProxyResCallback } from "http-proxy-middleware/dist/types";

const load = (program: Command) => {
  return program
    .command("proxy")
    .description("Manage proxy settings")
    .action(action)
    .option(
      "-p, --port [port]",
      "Port to serve the proxy server. You can also set this with the `REFINE_PROXY_PORT` environment variable.",
      ENV.REFINE_PROXY_PORT,
    )
    .option(
      "-t, --target [target]",
      "Target to proxy. You can also set this with the `REFINE_PROXY_TARGET` environment variable.",
      ENV.REFINE_PROXY_TARGET,
    )
    .option(
      "-d, --domain [domain]",
      "Domain to proxy. You can also set this with the `REFINE_PROXY_DOMAIN` environment variable.",
      ENV.REFINE_PROXY_DOMAIN,
    )
    .option(
      "-r, --rewrite-url [rewrite URL]",
      "Rewrite URL for redirects. You can also set this with the `REFINE_PROXY_REWRITE_URL` environment variable.",
      ENV.REFINE_PROXY_REWRITE_URL,
    );
};

const action = async ({
  port,
  target,
  domain,
  rewriteUrl,
}: {
  port: string;
  target: string;
  domain: string;
  rewriteUrl: string;
}) => {
  const app = express();

  const targetUrl = new URL(target);

  const onProxyRes: OnProxyResCallback | undefined =
    targetUrl.protocol === "http:"
      ? (proxyRes) => {
          if (proxyRes.headers["set-cookie"]) {
            proxyRes.headers["set-cookie"]?.forEach((cookie, i) => {
              if (proxyRes?.headers?.["set-cookie"]) {
                proxyRes.headers["set-cookie"][i] = cookie.replace(
                  "Secure;",
                  "",
                );
              }
            });
          }
        }
      : undefined;

  app.use(
    "/.refine",
    createProxyMiddleware({
      target: `${domain}/.refine`,
      changeOrigin: true,
      pathRewrite: { "^/.refine": "" },
      logProvider: () => ({
        log: console.log,
        info: (msg) => {
          if (`${msg}`.includes("Proxy rewrite rule created")) return;

          if (`${msg}`.includes("Proxy created")) {
            console.log(
              `Proxying localhost:${port}/.refine to ${domain}/.refine`,
            );
          } else if (msg) {
            console.log(msg);
          }
        },
        warn: console.warn,
        debug: console.debug,
        error: console.error,
      }),
    }),
  );

  app.use(
    "/.auth",
    createProxyMiddleware({
      target: `${domain}/.auth`,
      changeOrigin: true,
      cookieDomainRewrite: {
        "refine.dev": "",
      },
      headers: {
        "auth-base-url-rewrite": `${rewriteUrl}/.auth`,
      },
      pathRewrite: { "^/.auth": "" },
      logProvider: () => ({
        log: console.log,
        info: (msg) => {
          if (`${msg}`.includes("Proxy rewrite rule created")) return;

          if (`${msg}`.includes("Proxy created")) {
            console.log(`Proxying localhost:${port}/.auth to ${domain}/.auth`);
          } else if (msg) {
            console.log(msg);
          }
        },
        warn: console.warn,
        debug: console.debug,
        error: console.error,
      }),
      onProxyRes,
    }),
  );

  app.use(
    "*",
    createProxyMiddleware({
      target: `${target}`,
      changeOrigin: true,
      ws: true,
      logProvider: () => ({
        log: console.log,
        info: (msg) => {
          if (`${msg}`.includes("Proxy created")) {
            console.log(`Proxying localhost:${port} to ${target}`);
          } else if (msg) {
            console.log(msg);
          }
        },
        warn: console.warn,
        debug: console.debug,
        error: console.error,
      }),
    }),
  );

  app.listen(Number(port));
};

export default load;
