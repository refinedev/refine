/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    experimental: {
        newNextLinkBehavior: true,
    },
    images: {
        loader: "imgix",
        path: "https://refine-store.imgix.net/",
    },
};

module.exports = nextConfig;
