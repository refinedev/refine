const path = require("path");
const postcss = require("rollup-plugin-postcss");
const images = require("@rollup/plugin-image");
const copy = require("rollup-plugin-copy");

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                extract: path.resolve("dist/antd.styles.min.css"),
                minimize: true,
            }),
            copy({
                targets: [
                    { src: "src/assets/styles/styles.min.css", dest: "dist" },
                ],
            }),
            {
                name: "watch-external",
                buildStart() {
                    this.addWatchFile(
                        path.resolve(
                            __dirname,
                            "src/assets/styles/styles.min.css",
                        ),
                    );
                },
            },
        );
        config.plugins.unshift(images());
        return config;
    },
};
