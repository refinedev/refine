/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'superplate',
  tagline: 'The frontend boilerplate with superpowers',
  url: 'https://pankod.github.io',
  baseUrl: '/superplate/',
  projectName: 'superplate',
  organizationName: 'pankod',
  favicon: 'img/superplate-logo.svg',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/pankod/superplate/tree/master/documentation',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/footer_icon.png',
    algolia: {
      apiKey: '3b7cf26a19755c7de95bcb3632edd314',
      indexName: 'superplate',
    },
    navbar: {
      title: 'superplate',
      logo: {
        alt: 'SuperPlate Logo',
        src: 'img/superplate-logo.svg',
      },
      items: [
        { to: 'docs', label: 'Docs', position: 'right' },
        {
          href: 'https://github.com/pankod/superplate',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs',
            },
            {
              label: 'UI Frameworks',
              to: 'docs/tailwind',
            },
            {
              label: 'CSS Preprocessors',
              to: 'docs/css',
            },
            {
              label: 'Features',
              to: 'docs/fetch',
            },
            {
              label: 'Hooks',
              to: 'docs/hooks/swr',
            },
            {
              label: 'State Management',
              to: 'docs/state-management/redux-toolkit',
            },
            {
              label: 'i18n',
              to: 'docs/i18n/next-translate',
            },
            {
              label: 'Linting Tools',
              to: 'docs/linter/eslint',
            },
            {
              label: 'Testing',
              to: 'docs/testing/jest',
            },
            {
              label: 'E2E Testing',
              to: 'docs/e2e-testing/cypress',
            },
            {
              label: 'Deployment',
              to: 'docs/docker',
            },
            {
              label: 'Continuous Integrations',
              to: 'docs/ci/github-actions',
            },
            {
              label: 'Development',
              to: 'docs/development/how-it-works',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/PankodDev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: "https://github.com/pankod/superplate",
            },
            {
              html: `
                  <a href="https://github.com/pankod/superplate" target="_blank" rel="noreferrer noopener" aria-label="Star this project on GitHub">
                    <img src="https://img.shields.io/github/stars/pankod/superplate?logo=reverbnation&logoColor=white" alt="github-stars" />
                  </a>
                `,
            },
          ],
        },
      ],
      logo: {
        alt: 'Pankod Logo',
        src: 'img/pankod_footer_logo.png',
        href: 'https://github.com/pankod'
      },
      copyright: `Copyright © ${new Date().getFullYear()} Pankod, Inc.`,
    },
  },
};

module.exports = siteConfig;