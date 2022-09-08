import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
    target: "https://api.store.refine.dev",
    changeOrigin: true,
    pathRewrite: { "^/api": "/" },
});

export const config = {
    api: {
        bodyParser: false, // enable POST requests
        externalResolver: true, // hide warning message
    },
};
