const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/json-server-api",
        createProxyMiddleware({
            target: "https://readmin-fake-rest.pankod.com",
            changeOrigin: true,
            pathRewrite: { "^/json-server-api": "" },
        }),
    );

    app.use(
        "/nestjsx-crud-api",
        createProxyMiddleware({
            target: "https://readmin-nestjs-crud.pankod.com",
            changeOrigin: true,
            pathRewrite: { "^/nestjsx-crud-api": "" },
        }),
    );
};
