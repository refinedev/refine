const { createProxyMiddleware } = require("http-proxy-middleware");
const Bundler = require("parcel-bundler");
const express = require("express");

const bundler = new Bundler("src/index.html", {});
const app = express();

app.use(
    "/api",
    createProxyMiddleware({
        target: "https://readmin-fake-rest.pankod.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
    }),
);
app.use(express.static("public"));
app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 3000));
