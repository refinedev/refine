import { ENV } from "@utils/env";
import { Command } from "commander";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

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
        );
};

const action = async ({
    port,
    target,
    domain,
}: {
    port: string;
    target: string;
    domain: string;
}) => {
    const app = express();

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
        "/.kratos",
        createProxyMiddleware({
            target: `${domain}/.kratos`,
            changeOrigin: true,
            cookieDomainRewrite: {
                "refine.dev": "",
            },
            pathRewrite: { "^/.kratos": "" },
            logProvider: () => ({
                log: console.log,
                info: (msg) => {
                    if (`${msg}`.includes("Proxy rewrite rule created")) return;

                    if (`${msg}`.includes("Proxy created")) {
                        console.log(
                            `Proxying localhost:${port}/.kratos to ${domain}/.kratos`,
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
        "/.ory",
        createProxyMiddleware({
            target: `${domain}/.ory`,
            changeOrigin: true,
            cookieDomainRewrite: {
                "refine.dev": "",
            },
            pathRewrite: { "^/.ory": "" },
            logProvider: () => ({
                log: console.log,
                info: (msg) => {
                    if (`${msg}`.includes("Proxy rewrite rule created")) return;

                    if (`${msg}`.includes("Proxy created")) {
                        console.log(
                            `Proxying localhost:${port}/.ory to ${domain}/.ory`,
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
