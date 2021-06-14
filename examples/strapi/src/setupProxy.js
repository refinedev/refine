const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://api.strapi.refine.dev",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        }),
    );
};
