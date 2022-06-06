const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        newNextLinkBehavior: true,
    },
});
