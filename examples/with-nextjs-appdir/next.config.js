/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        newNextLinkBehavior: true,
    },
    transpilePackages: [
        "@refinedev/antd",
        "@refinedev/inferencer",
        "antd",
        "@ant-design/pro-components",
        "@ant-design/pro-layout",
        "@ant-design/pro-utils",
        "@ant-design/pro-provider",
        "rc-pagination",
        "rc-picker",
    ],
};

module.exports = nextConfig;
