const images = require("@rollup/plugin-image");

module.exports = {
    rollup(config) {
        config.plugins.unshift(images());
        return config;
    },
};
