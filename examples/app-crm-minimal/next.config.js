/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ["@refinedev/antd", "@ant-design/plots"],
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    experimental: {
        newNextLinkBehavior: true,
    },
};
