import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import dns from "dns";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host",
            remotes: [
                {
                    blog_posts: {
                        external: "http://localhost:4001/assets/blog_posts.js",
                        from: "vite",
                        externalType: "url",
                    },
                },
                // {
                //     payment: {
                //         external: "Promise.resolve(window.paymentUrl)",
                //         from: "vite",
                //         externalType: "promise",
                //     },
                // },
            ],
            shared: [
                "react",
                "react-dom",
                "react-router-dom",
                "@refinedev/core",
                "@refinedev/antd",
                "antd",
            ],
        }),
        tsconfigPaths(),
    ],
    server: {
        host: "localhost",
        port: 4000,
        strictPort: true,
    },
    preview: {
        host: "localhost",
        port: 4000,
        strictPort: true,
    },
    build: {
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
