const withPlugins = require("next-compose-plugins");
const { i18n } = require("./next-i18next.config");

module.exports = withPlugins([], {
    i18n,
    experimental: {
        newNextLinkBehavior: true,
    },
});
