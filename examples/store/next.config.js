const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        newNextLinkBehavior: true,
    },
    images: {
        domains: ["refine-store.fra1.cdn.digitaloceanspaces.com"],
    },
});
