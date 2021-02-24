const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://readmin-fake-rest.pankod.com",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        }),
    );
};
