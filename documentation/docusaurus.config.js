/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'Readmin',
  tagline: 'Admin panel. Reimagined.',
  url: 'https://pankod.github.io',
  baseUrl: '/readmin/',
 projectName: 'readmin',
  organizationName: 'pankod',
  favicon: 'img/footer_icon.png',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/pankod/readmin/tree/master/documentation',
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
      indexName: 'readmin',
    },
    navbar: {
      title: 'readmin',
      logo: {
        alt: 'readmin Logo',
        src: 'img/pankod_footer_logo.png',
      },
      items: [
        { to: 'docs', label: 'Docs', position: 'right' },
        {
          href: 'https://github.com/pankod/readmin',
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
              href: "https://github.com/pankod/readmin",
            },
            {
              html: `
                  <a href="https://github.com/pankod/readmin" target="_blank" rel="noreferrer noopener" aria-label="Star this project on GitHub">
                    <img src="https://img.shields.io/github/stars/pankod/readmin?logo=reverbnation&logoColor=white" alt="github-stars" />
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