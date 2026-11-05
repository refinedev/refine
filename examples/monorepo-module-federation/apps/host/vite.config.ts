import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import * as dns from "dns";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      // Static remote: its URL is known at build time.
      // The `categories` remote's URL is only known at runtime, so it is
      // registered with `registerRemotes()` in src/remotes.ts instead.
      remotes: {
        blog_posts: {
          name: "blog_posts",
          entry: "http://localhost:4001/assets/blog_posts.js",
          type: "module",
        },
      },
      shared: [
        "react",
        "react-dom",
        "react-router",
        "@refinedev/core",
        "@refinedev/antd",
        "antd",
      ],
    }),
    tsconfigPaths({ root: __dirname }),
  ],

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
