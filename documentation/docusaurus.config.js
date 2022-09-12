/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const redirectJson = require("./redirects.json");

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
    title: "refine",
    tagline: "A React-based framework for building internal tools, rapidly.",
    url: "https://refine.dev",
    baseUrl: "/",
    projectName: "refine",
    organizationName: "pankod",
    trailingSlash: true,
    favicon: "img/refine_favicon.png",
    scripts: ["https://platform.twitter.com/widgets.js"],
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: "./docs",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/pankod/refine/tree/master/documentation",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    versions: {
                        current: {
                            label: "3.xx.xx",
                        },
                    },
                    lastVersion: "current",
                },
                blog: false,
                theme: {
                    customCss: [
                        require.resolve("./src/css/custom.css"),
                        require.resolve("./src/css/split-pane.css"),
                        require.resolve("./src/css/demo-page.css"),
                    ],
                },
                gtag: {
                    // You can also use your "G-" Measurement ID here.
                    trackingID: "G-27Z1WY952H",
                    // Optional fields.
                    anonymizeIP: true, // Should IPs be anonymized?
                },
            },
        ],
    ],
    plugins: [
        [
            "@docusaurus/plugin-client-redirects",
            {
                redirects: redirectJson.redirects,
            },
        ],
        async function tailwindcss() {
            return {
                name: "docusaurus-tailwindcss",
                configurePostCss(postcssOptions) {
                    postcssOptions.plugins.push(require("tailwindcss"));
                    postcssOptions.plugins.push(require("autoprefixer"));
                    return postcssOptions;
                },
            };
        },
        [
            "./plugins/blog-plugin.js",
            {
                blogTitle: "refine blog!",
                blogDescription: "A Docusaurus powered blog!",
                routeBasePath: "/blog",
                postsPerPage: 12,
                blogSidebarTitle: "All posts",
                blogSidebarCount: 0,
                feedOptions: {
                    type: "all",
                    copyright: `Copyright © ${new Date().getFullYear()} refine.`,
                },
            },
        ],
    ],
    themes: ["@docusaurus/theme-live-codeblock"],
    themeConfig: {
        prism: {
            magicComments: [
                // Remember to extend the default highlight class name as well!
                {
                    className: "theme-code-block-highlighted-line",
                    line: "highlight-next-line",
                    block: { start: "highlight-start", end: "highlight-end" },
                },
                {
                    className: "code-block-hidden",
                    line: "hide-next-line",
                    block: { start: "hide-start", end: "hide-end" },
                },
            ],
        },
        image: "img/refine_social.png",
        algolia: {
            appId: "KRR9VEUPCT",
            apiKey: "cd0188125dcd31fb4b011b5e536d963a",
            indexName: "refine",
            contextualSearch: true,
        },
        metadata: [
            {
                name: "keywords",
                content:
                    "react-admin, react-framework, internal-tool, admin-panel, ant-design, material ui, mui",
            },
        ],
        navbar: {
            logo: {
                alt: "refine",
                src: "img/refine_logo.png",
            },
            items: [
                {
                    to: "docs/getting-started/overview",
                    label: "Quickstart",
                    position: "left",
                },
                {
                    to: "docs",
                    label: "Tutorial",
                    position: "left",
                    activeBaseRegex: "/^/docs(/)?$/",
                },
                {
                    to: "/demo",
                    label: "Demo",
                    position: "left",
                },
                {
                    to: "docs/guides-and-concepts/ssr/remix/",
                    label: "Guides",
                    position: "left",
                },
                {
                    to: "docs/examples/tutorial/headless-tutorial",
                    label: "Examples",
                    position: "left",
                },
                { to: "blog", label: "Blog", position: "left" },
                {
                    to: "/enterprise",
                    label: "Enterprise",
                    position: "left",
                },
                {
                    type: "docsVersionDropdown",
                    position: "right",
                    dropdownActiveClassDisabled: true,
                },
                {
                    href: "https://github.com/pankod/refine",
                    position: "right",
                    className: "header-icon-link header-github-link",
                },
                {
                    href: "https://discord.gg/refine",
                    position: "right",
                    className: "header-icon-link header-discord-link",
                },
                {
                    href: "https://twitter.com/refine_dev",
                    position: "right",
                    className: "header-icon-link header-twitter-link",
                },
            ],
        },
        footer: {
            logo: {
                alt: "refine",
                src: "/img/refine_logo.png",
            },
            links: [
                {
                    title: "Why refine?",
                    items: [
                        {
                            label: "Features",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Enterprise",
                            to: "/enterprise",
                        },
                        {
                            label: "Demo",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "Product",
                    items: [
                        {
                            label: "Features",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Enterprise",
                            to: "/enterprise",
                        },
                        {
                            label: "Demo",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "Open Source",
                    items: [
                        {
                            label: "Features",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Enterprise",
                            to: "/enterprise",
                        },
                        {
                            label: "Demo",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "Developers",
                    items: [
                        {
                            label: "Features",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Enterprise",
                            to: "/enterprise",
                        },
                        {
                            label: "Demo",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "Company",
                    items: [
                        {
                            label: "Features",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Enterprise",
                            to: "/enterprise",
                        },
                        {
                            label: "Demo",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "__LEGAL",
                    items: [
                        {
                            label: "License",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Terms",
                            to: "/enterprise",
                        },
                        {
                            label: "Privacy",
                            to: "/demo",
                        },
                    ],
                },
                {
                    title: "__SOCIAL",
                    items: [
                        {
                            href: "https://github.com/pankod/refine",
                            label: "github",
                        },
                        {
                            href: "https://discord.gg/refine",
                            label: "discord",
                        },
                        {
                            href: "https://twitter.com/refine_dev",
                            label: "twitter",
                        },
                        {
                            href: "https://twitter.com/refine_dev",
                            label: "linkedin",
                        },
                    ],
                },
            ],
        },
    },
};

module.exports = siteConfig;
