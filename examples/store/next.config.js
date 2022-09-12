const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        newNextLinkBehavior: true,
    },
    images: {
        loader: "imgix",
        path: "https://refine-store.imgix.net/",
    },
});
