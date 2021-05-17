const path = require("path");
const postcss = require("rollup-plugin-postcss");
const images = require("@rollup/plugin-image");

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                extract: path.resolve("dist/styles.min.css"),
                minimize: true,
            }),
        );
        config.plugins.unshift(images());
        return config;
    },
};
