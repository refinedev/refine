---
id: bundle-analyzer
title: Bundle Analyzer
sidebar_label: Bundle Analyzer
description: How to use Bundle Analyzer in Next.js?
---

Bundle Analyzer visualizes size of output files with an interactive treemap. This helps you understand what’s taking the most space in the bundles.

superplate serves optional plugin which adds [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to the created project.

 Run the command below:

 ```
 npm run build:analyze
```

This should open 2 pages in the browser. One for client bundles, and one for the server bundles.

### Adding Bundler Analyzer to your project later
:::tip

All this work will be handled automatically by superplate, so you don’t need to do anything extra as long as you choose Bundle Analyzer plugin during the project creation phase.

:::


If you didn't choose the Bundle Analyzer plugin during project creation phase, you can follow the instructions below to add it. 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm install @next/bundle-analyzer
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add @next/bundle-analyzer
```
  </TabItem>
</Tabs>

Then add followings to config file

```ts title="next.config.js"
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withBundleAnalyzer]]);
```

[Refer to official documentation for detailed usage  &#8594](https://www.npmjs.com/package/@next/bundle-analyzer)
