const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://refine-strapi.pankod.com",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        }),
    );
};
