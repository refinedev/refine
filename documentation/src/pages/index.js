import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { features } from '../features';
import styles from './styles.module.css';

function Badges() {
  return (
    <div className={styles.topBadges}>
      <a href="https://meercode.io">
        <img src="https://meercode.io/badge/pankod/superplate?type=ci-score&branch=master&token=2ZiT8YsoJgt57JB23NYwXrFY3rJHZboT&lastDay=31" alt="Meercode CI Score" />
      </a>
      <a href="https://meercode.io">
        <img src="https://meercode.io/badge/pankod/superplate?type=ci-success-rate&branch=master&token=2ZiT8YsoJgt57JB23NYwXrFY3rJHZboT&lastDay=31" alt="Meercode CI Success Rate" />
      </a>
      <a href="https://codeclimate.com/github/pankod/superplate/maintainability">
        <img src="https://api.codeclimate.com/v1/badges/eb4b5a8f88b6e511e61d/maintainability" />
      </a>
      <a href="https://www.npmjs.com/package/superplate-cli">
        <img src="https://img.shields.io/npm/v/superplate-cli.svg" alt="npm version" />
      </a>
      <a href="https://david-dm.org/pankod/superplate">
        <img src="https://david-dm.org/pankod/superplate/status.svg" alt="Dependencies Status" />
      </a>
      <a href="https://david-dm.org/pankod/superplate?type=dev">
        <img src="https://david-dm.org/pankod/superplate/dev-status.svg" alt="devDependencies Status" />
      </a>
      <a href="https://www.npmjs.com/package/superplate-cli">
        <img src="https://img.shields.io/npm/dm/superplate-cli" alt="npm" />
      </a>
    </div>
  )
}
function Feature({ imageUrl, title, url }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--2', styles.feature)}>
      <a href={url} target="_blank">
        {imgUrl && (
          <div className="text--center">
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </div>
        )}
        <h3 className={styles.featureTitle}>{title}</h3>
      </a>
    </div>
  );
}

function Sections() {
  return (
    <>
      <div className={styles.gettingStartedSection}>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--4 col--offset-1">
              <h2>All plugins follow the best practices</h2>
              <p>
                superplate gives you many abilities to create your own plugin and interact with the others.
                You can add <strong>usefull, highly-demands front-end development tools and libraries</strong> as a plugin by using superplate CLI during the project creation phase.
                <br />
                <br />
                To create a project called <i>my-app</i>, run this command:
              </p>
              <CodeBlock className="language-sh">
                npx superplate-cli my-app
              </CodeBlock>
              <br />
            </div>
            <div className="col col--5 col--offset-1">
              <img
                className={styles.sectionImage}
                alt="Easy to get started in seconds"
                src="img/cli.gif"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container padding-vert--xl text--left">
          <div className="row">
            <div className="col col--5 col--offset-1">
              <CodeBlock className="language-js">
{` const base = {
  _app: {
      import: [
          'import { ChakraProvider } from "@chakra-ui/react";',
          'import theme from "@definitions/chakra/theme";',
      ],
      wrapper: [["<ChakraProvider theme={theme}>", "</ChakraProvider>"]],
  },
  testSetup: {
      import: [
          'import { ChakraProvider } from "@chakra-ui/react";',
          'import theme from "@definitions/chakra/theme";',
      ],
      wrapper: [["<ChakraProvider theme={theme}>", "</ChakraProvider>"]],
  },
};
module.exports = {
    extend() {
        return base;
    },
};
`}
              </CodeBlock>
              <br />
            </div>
            <div className="col col--4 col--offset-1">
              <h2>Easy to extend/customize plugin structure</h2>
              <p>
                You can easily develop your own framework CLI and plugins according to your needs to on top of superplate codebase due to its framework/plugin agnostic nature.
              </p>
              <CodeBlock className="language-sh">
                npm run dev
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className={styles.logoContainer}>
            <img className={clsx(styles.heroBannerLogo, 'margin-vert--md')} src="img/superplate-logo.svg" alt="logo-icon" />
          </div>
          <svg width="633" height="133" viewBox="0 0 633 133" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heroTitle}>
            <path d="M418.9 10.4l18.7-10v99H419v-89zM0 93.4c3.8 2.3 8 4 12.2 5 5.2 1.3 10.5 2 15.8 2 5.6 0 11.1-.8 16.4-2.7a23 23 0 0010.5-7.2 17 17 0 003.6-10.7c0-4.7-1.3-8.3-3.7-11a19.5 19.5 0 00-8.8-5.4c-4.3-1.3-8.6-2.2-13-2.9-3.5-.4-7-1.2-10.4-2.3-2.1-.8-3.2-2.2-3.2-4.2 0-1.7 1-3.1 3-4.3 2-1 5-1.7 9-1.7 6.5 0 13 1.7 18.6 4.9l6.3-13.4A38 38 0 0045 35.4c-4.4-1-9-1.5-13.6-1.5a44 44 0 00-16 2.6c-4 1.5-7.6 4-10.3 7.4-2.4 3.1-3.6 7-3.6 10.9 0 4.9 1.3 8.6 3.8 11.3 2.4 2.6 5.5 4.5 9 5.5a96 96 0 0013 2.8c3.4.3 6.8 1 10 2 2.2.8 3.3 2.1 3.3 4 0 3.9-4 5.8-12 5.8A43.8 43.8 0 016.3 80L0 93.4zM66 69.7c0 9.6 2.9 17.2 8.6 22.8a33.3 33.3 0 0024 8.2c10.3 0 18.3-2.7 24-8.3a30.1 30.1 0 008.7-22.8V35h-18.7V69c0 5.4-1.2 9.5-3.5 12.2-2.3 2.7-5.7 4-10.2 4-4.5 0-8-1.3-10.4-4C86.3 78.4 85 74.4 85 69V35H66v34.8z" fill="currentcolor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M194 38c4.9 2.7 8.9 6.7 11.6 11.6a38.4 38.4 0 010 35c-2.7 4.9-6.7 9-11.6 11.6a33 33 0 01-16.4 4.2 25 25 0 01-19.4-7.8v30l-18.7 10V34.9h17.8v7.5c4.7-5.6 11.5-8.4 20.3-8.4 5.7 0 11.4 1.3 16.4 4.1zm-7.8 42.1a18 18 0 004.6-13 18 18 0 00-4.6-13 16.8 16.8 0 00-23.6 0 18 18 0 00-4.7 13 18 18 0 004.7 13 16.8 16.8 0 0023.6 0zM233.2 72.4H282l.4-5c.1-6.2-1.4-12.3-4.4-17.7-2.8-5-7-9-12-11.7a38.3 38.3 0 00-34.8.1 31.5 31.5 0 00-12.4 12 33 33 0 00-4.5 17 31.2 31.2 0 0017.6 29c6 3 12.6 4.4 19.3 4.3 11.7 0 20.6-3.5 26.6-10.5l-10-10.8a21.9 21.9 0 01-16.2 6.3c-4.3.1-8.6-1-12.2-3.5a15.2 15.2 0 01-6.2-9.5zm-.3-11A15.3 15.3 0 01249 48a15.5 15.5 0 0115.8 13.4H233z" fill="currentcolor" />
            <path d="M317.8 36.3c4.2-1.7 8.6-2.5 13.1-2.4v17.3l-4.2-.3c-5.3 0-9.5 1.5-12.6 4.5-3 3-4.6 7.5-4.5 13.5v30.5h-18.8V34.8h18v8.6c2.2-3.2 5.4-5.6 9-7.1z" fill="currentcolor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M405.8 49.6c-2.7-4.9-6.7-8.9-11.6-11.6-5-2.8-10.6-4.2-16.4-4.1-8.8 0-15.6 2.8-20.2 8.4v-7.4h-18v97.8l18.8-10V92.5a25 25 0 0019.4 7.8 33 33 0 0016.4-4.1c4.9-2.7 9-6.7 11.6-11.6a38.4 38.4 0 000-35zM391 67.1a18 18 0 01-4.6 13 16.8 16.8 0 01-23.6 0 18 18 0 01-4.6-13 18 18 0 014.6-13 16.8 16.8 0 0123.6 0 18 18 0 014.6 13zM515 99.4V34.8h-18.7v7c-4.7-5.3-11-7.9-19.3-7.9-5.8 0-11.5 1.3-16.5 4.1-5 2.7-9 6.8-11.6 11.7a38.6 38.6 0 000 35c2.7 4.9 6.7 9 11.6 11.6 5 2.8 10.7 4.2 16.5 4.1 8.7 0 15.5-2.8 20.1-8.4v7.4H515zm-18.3-32.3a18 18 0 01-4.7 13 16.8 16.8 0 01-23.6 0 18 18 0 01-4.7-13 18 18 0 014.7-13 16.8 16.8 0 0123.6 0 18 18 0 014.7 13z" fill="currentcolor" />
            <path d="M565.2 96.3c-2 1.4-4.4 2.5-6.8 3-2.7.7-5.5 1-8.4 1-7.7 0-13.7-2-17.8-5.8-4.2-4-6.3-9.7-6.3-17.3V20.4l18.8-10v25.9h16v14.4h-16V77a9 9 0 002 6.3 7.6 7.6 0 005.8 2.2c2.8 0 5.5-.8 7.7-2.4l5 13.2z" fill="currentcolor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M583 72.4H632l.4-5c0-6.2-1.4-12.3-4.4-17.7-2.8-5-7-9-12-11.7a38.3 38.3 0 00-34.8.1 31.5 31.5 0 00-12.4 12 33 33 0 00-4.5 17 31.2 31.2 0 0017.6 29c6 3 12.6 4.4 19.3 4.3 11.7 0 20.5-3.5 26.6-10.5l-10-10.8a21.7 21.7 0 01-16.2 6.3c-4.3.1-8.6-1-12.2-3.5a15.2 15.2 0 01-6.3-9.5zm-.2-11c.5-3.7 2.4-7.3 5.3-9.8 3-2.4 6.8-3.7 10.7-3.6a15.5 15.5 0 0115.8 13.4h-31.8z" fill="currentcolor" />
          </svg>
          <p className={clsx(styles.heroSubtitle, 'hero__subtitle')}>{siteConfig.tagline}</p>
          <Badges />
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {(features ?? []) && features.length > 0 && (
          <section className={styles.featuresContainer}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Sections />
    </Layout>
  );
}

export default Home;
