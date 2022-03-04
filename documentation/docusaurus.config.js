/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const redirectJson = require("./redirects.json");

const TwitterSvg =
    '<svg style="fill: #FFFFFF; vertical-align: middle;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';

const siteConfig = {
    title: "refine",
    tagline: "A React-based framework for building internal tools, rapidly.",
    url: "https://refine.dev",
    baseUrl: "/",
    projectName: "refine",
    organizationName: "pankod",
    trailingSlash: true,
    favicon: "img/refine_favicon.png",
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
                blog: {
                    blogTitle: "refine blog!",
                    blogDescription: "A Docusaurus powered blog!",
                    postsPerPage: "ALL",
                    blogSidebarTitle: "All posts",
                    blogSidebarCount: "ALL",
                    feedOptions: {
                        type: "all",
                        copyright: `Copyright © ${new Date().getFullYear()} refine.`,
                    },
                },
                theme: {
                    customCss: [
                        require.resolve("./src/css/custom.css"),
                        require.resolve("./src/css/split-pane.css"),
                        require.resolve("./src/css/demo-page.css"),
                    ],
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
    ],
    themeConfig: {
        image: "img/refine_social.png",
        algolia: {
            apiKey: "fbebca5afe7376dbef2995691670b708",
            indexName: "refine",
            contextualSearch: true,
        },
        metadata: [
            {
                name: "keywords",
                content:
                    "react-admin, react-framework, internal-tool, admin-panel, ant-design",
            },
        ],
        announcementBar: {
            id: "support",
            backgroundColor: "#0B82F0",
            textColor: "#fff",
            isCloseable: false,
            content: `⭐️ If you like Refine, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/pankod/refine">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/refine_dev">Twitter</a> ${TwitterSvg}`,
        },
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
                    className: "header-first-nav-item",
                },
                { to: "docs", label: "Tutorial", position: "left" },
                {
                    to: "/demo",
                    label: "Demo",
                    position: "left",
                },
                {
                    to: "docs/guides-and-concepts/ssr-nextjs",
                    label: "Guides",
                    position: "left",
                },
                {
                    to: "docs/examples/tutorial",
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
                    href: "https://discord.gg/UuU3XCc3J5",
                    position: "right",
                    className: "header-icon-link header-discord-link",
                },
                {
                    href: "https://twitter.com/refine_dev",
                    position: "right",
                    className:
                        "header-icon-link header-twitter-link header-last-nav-item",
                },
            ],
        },
        gtag: {
            // You can also use your "G-" Measurement ID here.
            trackingID: "G-27Z1WY952H",
            // Optional fields.
            anonymizeIP: true, // Should IPs be anonymized?
        },
        // footer: {
        //     style: "dark",
        //     links: [
        //         {
        //             title: "Docs",
        //             items: [],
        //         },
        //         {
        //             title: "Community",
        //             items: [
        //                 {
        //                     label: "Twitter",
        //                     href: "https://twitter.com/refine_dev",
        //                 },
        //             ],
        //         },
        //         {
        //             title: "More",
        //             items: [
        //                 {
        //                     label: "GitHub",
        //                     href: "https://github.com/pankod/refine",
        //                 },
        //                 {
        //                     html: `
        //           <a href="https://github.com/pankod/refine" target="_blank" rel="noreferrer noopener" aria-label="Star this project on GitHub">
        //             <img src="https://img.shields.io/github/stars/pankod/refine?logo=reverbnation&logoColor=white" alt="github-stars" />
        //           </a>
        //         `,
        //                 },
        //             ],
        //         },
        //     ],
        //     logo: {
        //         alt: "Pankod Logo",
        //         src: "img/pankod_footer_logo.png",
        //         href: "https://github.com/pankod",
        //     },
        //     copyright: `Copyright © ${new Date().getFullYear()} Pankod, Inc.`,
        // },
        /* plugins: [
            [
                "@docusaurus/plugin-client-redirects",
                {
                    redirects: [
                        {
                            to: "/docs/newDocPath", // string
                            from: [
                                "/docs/api-references/providers/auth-provider/",
                            ],
                        },
                    ],
                },
            ],
        ], */
    },
};

module.exports = siteConfig;
