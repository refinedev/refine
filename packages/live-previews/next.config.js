/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // productionBrowserSourceMaps: true, // Disabled for now, as it causes build to hang on deploy
    swcMinify: false,
};

module.exports = nextConfig;
