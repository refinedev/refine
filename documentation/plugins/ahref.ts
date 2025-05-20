import type { Plugin } from "@docusaurus/types";

export default async function ahref(): Promise<Plugin> {
  return {
    name: "docusaurus-plugin-ahref",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://analytics.ahrefs.com",
            },
          },
          {
            tagName: "script",
            attributes: {
              src: "https://analytics.ahrefs.com/analytics.js",
              "data-key": "bjK8XrJbZu7AboWmTMvB0g",
            },
          },
        ],
      };
    },
  };
}
