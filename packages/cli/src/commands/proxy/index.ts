import { Command } from "commander";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
import {
    createProxyMiddleware,
    Filter,
    Options,
    RequestHandler,
} from "http-proxy-middleware";

const proxy = (program: Command) => {
    return program
        .command("proxy")
        .description("Manage proxy settings")
        .action(action);
};

const action = async () => {
    const app = express();

    app.use(
        "/.refine",
        createProxyMiddleware({
            target: "https://develop.cloud.refine.dev/.refine",
            changeOrigin: true,
            pathRewrite: { "^/.refine": "" },
        }),
    );

    app.use(
        "/.kratos",
        createProxyMiddleware({
            target: "https://develop.cloud.refine.dev/.kratos",
            changeOrigin: true,
            cookieDomainRewrite: {
                "refine.dev": "",
            },
            pathRewrite: { "^/.kratos": "" },
        }),
    );

    app.use(
        "/.ory",
        createProxyMiddleware({
            target: "https://develop.cloud.refine.dev/.ory",
            changeOrigin: true,
            cookieDomainRewrite: {
                "refine.dev": "",
            },
            pathRewrite: { "^/.ory": "" },
        }),
    );

    app.use(
        "*",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        }),
    );

    app.listen(7313);
};

export default proxy;
