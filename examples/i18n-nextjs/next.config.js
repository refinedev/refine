const withPlugins = require("next-compose-plugins");
const { i18n } = require("./next-i18next.config");

module.exports = withPlugins([], {
    i18n,
    experimental: {
        newNextLinkBehavior: true,
    },
    transpilePackages: [
        "@pankod/refine-antd",
        "@pankod/refine-inferencer",
        "antd",
        "@ant-design/pro-components",
        "@ant-design/pro-layout",
        "@ant-design/pro-utils",
        "@ant-design/pro-provider",
        "rc-pagination",
        "rc-picker",
    ],
});
