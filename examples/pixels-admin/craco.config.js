const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    fs: require.resolve("browserify-fs"),
                    path: require.resolve("path-browserify"),
                    zlib: require.resolve("browserify-zlib"),
                    stream: require.resolve("stream-browserify"),
                    util: require.resolve("util"),
                    buffer: require.resolve("buffer"),
                    asset: require.resolve("assert"),
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                }),
            ],
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
