/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();

const redirectJson = require("./redirects.json");
const tutorialData = require("./tutorial-units");
const thumbsUpDownFeedbackWidget = require("./plugins/thumbs-up-down-feedback-widget");

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
  title: "Refine",
  tagline: "Build your React-based CRUD applications, without constraints",
  url: "https://refine.dev",
  baseUrl: "/",
  projectName: "refine",
  organizationName: "refinedev",
  trailingSlash: true,
  favicon: "img/favicon.ico",
  scripts: [
    "https://platform.twitter.com/widgets.js",
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "fa91d75a-5c82-4272-a893-a21d92245578",
      "data-project-name": "Refine",
      "data-project-color": "#303450",
      "data-modal-header-bg-color": "#303450",
      "data-modal-title-color": "#ffffff",
      "data-button-border-radius": "100%",
      "data-button-text-font-size": "0px",
      "data-button-text-color": "#303450",
      "data-button-bg-color": "transparent",
      "data-button-text": "",
      "data-button-box-shadow": "none",
      "data-button-image-height": "60px",
      "data-button-image-width": "60px",
      "data-modal-title": "",
      "data-modal-image":
        "https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-white-icon.png",
      "data-project-logo":
        "https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-ai-bot-logo.png",
      async: true,
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: process.env.DISABLE_DOCS
          ? false
          : {
              path: "./docs",
              sidebarPath: require.resolve("./sidebars.js"),
              editUrl:
                "https://github.com/refinedev/refine/tree/main/documentation",
              showLastUpdateAuthor: true,
              showLastUpdateTime: true,
              disableVersioning: process.env.DISABLE_VERSIONING === "true",
              versions: {
                current: {
                  label: "4.xx.xx",
                },
              },
              lastVersion: "current",
              admonitions: {
                tag: ":::",
                keywords: [
                  "additional",
                  "note",
                  "tip",
                  "info-tip",
                  "info",
                  "caution",
                  "danger",
                  "sourcecode",
                  "create-example",
                  "simple",
                ],
              },
              exclude: ["**/**/_*.md"],
              remarkPlugins: [thumbsUpDownFeedbackWidget.plugin],
            },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/refine-theme/css/colors.css"),
            require.resolve("./src/refine-theme/css/fonts.css"),
            require.resolve("./src/refine-theme/css/custom.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/split-pane.css"),
            require.resolve("./src/css/demo-page.css"),
          ],
        },
        gtag: {
          trackingID: "G-27Z1WY952H",
        },
        sitemap: {
          ignorePatterns: ["**/_*.md"],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: redirectJson.redirects,
        createRedirects(existingPath) {
          if (existingPath.includes("/api-reference/core/")) {
            return [
              existingPath.replace("/api-reference/core/", "/api-references/"),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    [
      "docusaurus-plugin-copy",
      {
        id: "Copy Workers",
        path: "static/workers",
        context: "workers",
        include: ["**/*.{js}"],
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
    "./plugins/docgen.js",
    ...(process.env.DISABLE_BLOG
      ? []
      : [
          [
            "./plugins/blog-plugin.js",
            {
              blogTitle: "Blog",
              blogDescription:
                "A resource for Refine, front-end ecosystem, and web development",
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
        ]),
    "./plugins/clarity.js",
    "./plugins/templates.js",
    "./plugins/example-redirects.js",
    "./plugins/tutorial-navigation.js",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorial",
        path: "tutorial",
        routeBasePath: "tutorial",
        sidebarPath: false,
        docLayoutComponent: "@theme/TutorialPage",
        docItemComponent: "@theme/TutorialItem",
        include: ["**/index.md"],
        admonitions: {
          tag: ":::",
          keywords: [
            "additional",
            "note",
            "tip",
            "info-tip",
            "info",
            "caution",
            "danger",
            "sourcecode",
            "create-example",
            "simple",
          ],
        },
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/vsDark"),
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
        {
          className: "theme-code-block-added-line",
          line: "added-line",
          block: { start: "added-start", end: "added-end" },
        },
        {
          className: "theme-code-block-removed-line",
          line: "removed-line",
          block: { start: "removed-start", end: "removed-end" },
        },
      ],
    },
    image: "img/refine_social.png",
    algolia: {
      appId: "KRR9VEUPCT",
      apiKey: "cd0188125dcd31fb4b011b5e536d963a",
      indexName: "refine",
      contextualSearch: true,
      searchParameters: {
        attributesToHighlight: ["hierarchy.lvl0", "hierarchy"],
      },
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
        { to: "blog", label: "Blog", position: "left" },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
        {
          href: "https://github.com/refinedev/refine",
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
          title: "Resources",
          items: [
            {
              label: "Getting Started",
              to: "docs",
            },
            {
              label: "Tutorials",
              to: "tutorial",
            },
            {
              label: "Blog",
              to: "blog",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Examples",
              to: "examples",
            },
            {
              label: "Integrations",
              to: "integrations",
            },
            {
              label: "Become an Expert",
              to: "become-a-refine-expert",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              to: "about",
            },
            {
              label: "Store 🎁",
              to: "https://store.refine.dev",
            },
          ],
        },
        {
          title: "__LEGAL",
          items: [
            {
              label: "License",
              to: "https://github.com/refinedev/refine/blob/main/LICENSE",
            },
            // {
            //     label: "Terms",
            //     to: "/enterprise",
            // },
            // {
            //     label: "Privacy",
            //     to: "/privacy-policy",
            // },
            // {
            //     label: "info@refine.dev",
            //     to: "mailto:info@refine.dev",
            // },
          ],
        },
        {
          title: "__SOCIAL",
          items: [
            {
              href: "https://github.com/refinedev/refine",
              label: "github",
            },
            {
              href: "https://discord.gg/refine",
              label: "discord",
            },
            {
              href: "https://reddit.com/r/refine",
              label: "reddit",
            },
            {
              href: "https://twitter.com/refine_dev",
              label: "twitter",
            },
            {
              href: "https://www.linkedin.com/company/refine-dev",
              label: "linkedin",
            },
          ],
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
    },
  },
  customFields: {
    /** Footer Fields */
    footerDescription:
      '<strong style="font-weight:700;">refine</strong> is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by <strong style="font-weight:700;">CRUD</strong> operations and provides industry standard solutions.',
    contactTitle: "Contact",
    contactDescription: [
      "Refine Development Inc.",
      "256 Chapman Road STE 105-4 Newark, DE 19702",
    ],
    contactEmail: "info@refine.dev",
    /** ---- */
    /** Live Preview */
    LIVE_PREVIEW_URL:
      process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    /** ---- */
    tutorial: tutorialData,
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
};

module.exports = siteConfig;
