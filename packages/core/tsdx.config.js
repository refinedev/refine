const path = require("path");
const postcss = require("rollup-plugin-postcss");

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                extract: path.resolve("dist/styles.min.css"),
                minimize: true,
            }),
        );
        return config;
    },
};
