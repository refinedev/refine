const images = require("@rollup/plugin-image");

// TODO: remove this file
module.exports = {
    rollup(config) {
        config.plugins.unshift(images());
        return config;
    },
};
