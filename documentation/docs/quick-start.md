---
slug: /
id: quick-start
title: Getting started
sidebar_label: Overview
---


### Overview
No need to install or configure any tools for starting a new single-page application project. superplate handles everything so that you can focus on the code.

superplate offers a full system build setup with no configuration for best JavaScript UI framework single-page applications. 
It provides easy starting to your project in seconds with using industry-standard best practices and performance oriented tools & libraries.


You can easily develop your own framework CLI and plugins according to your needs to on top of superplate codebase due to its framework/plugin agnostic nature.


:::note
For now, superplate creates a boilerplate for only Next.js apps. [Other frameworks](https://github.com/pankod/superplate#coming-soon) integrations will be added soon.
:::
## Quick Start

Make sure you have npx installed (npx is shipped by default since npm 5.2.0) or npm v6.1 or yarn.

```bash
npx superplate-cli <my-project>
```
It will ask you some questions about what features and tools you want to add to your project.
Once all questions are answered, it will install all plugins and the dependencies. Then navigate to the project folder and launch it:

```bash
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) to see created app.


## superplate Plugins
superplate uses a plugin-based architecture. Basically, plugins are created from highly-demanded npm tools in the front-end ecosystem with configuration files. 

The features and tools listed during the project creation process are implemented as plugins.

Plugins can be included as part of your project creation phase. 37+ plugins working in harmony with superplate UI Framework boilerplates.

See the list of core plugin [superplate-core-plugins](https://github.com/pankod/superplate-core-plugins). 

:::info
Plugins are customizable and extendable. You can develop your own plugin or modify existings.  
[Refer to documentation to see how plugin works &#8594](development/how-it-works)
:::



:::tip

Don't be sad if you missed feature plugins to add during project creation phase. We added explation about how to add plugin features to existing project.

:::


## Scripts

Some built-in commands that you'll use inside the created project:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Run the app in development

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run dev
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn dev
```
  </TabItem>
</Tabs>


### Build the app for production

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run build
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn build
```
  </TabItem>
</Tabs>

<br />

### The following scripts can be use if the selected plugins during project creation process are like shown below 

#### Runs testing frameworks: Jest, Enzyme, Testing Library.

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run test
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn test
```
  </TabItem>
</Tabs>

<br />

#### E2E Testing frameworks: Cypress, WebdriverIO

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run cypress:run
npm run webdriver:run
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn cypress:run
yarn webdriver:run
```
  </TabItem>
</Tabs>

<br />

#### Apollo GraphQL or graphql-request tools:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run apollo:sync
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn apollo:sync
```
  </TabItem>
</Tabs>

<br />

#### Launch Storybook 

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run storybook
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn storybook
```
  </TabItem>
</Tabs>

#### Build Storybook

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run build-storybook
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn build-storybook
```
  </TabItem>
</Tabs>



<br />

#### SVGR: Produce component from SVGR

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run svgr
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn svgr
```
  </TabItem>
</Tabs>

<br />

#### Bundle Analyzer: Produce bundle map

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm run build:analyze
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn build:analyze
```
  </TabItem>
</Tabs>