---
id: travis
title: Travis CI
sidebar_label: Travis CI
description: Deploy Next.js Apps using Travis CI
---


As a continuous integration platform, Travis CI supports your development process by automatically building and testing code changes, providing immediate feedback on the success of the change.  
[Refer to official documentation for detailed usage. &#8594](https://docs.travis-ci.com)

The following YAML workflow file created into the `./travis.yml` as a default by superplate, if Travis CI selected as a CI plugin.

```bash title="travis.yml"
language: node_js
node_js:
  - "14"
install:
  - npm ci
  - npm run lint
  - npm run test
```
:::tip
The following commands are added to `travis.yml` by superplate if any of plugins listed below is selected during project creation phase.
:::

:::note
You can use the following commands in case of adding Travis CI to existing project later.
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Package manager  
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

``` 
- npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn
```            
  </TabItem>
</Tabs>

<br/>


### Install dependencies  
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn
```            
  </TabItem>
</Tabs>

<br/>

### Run ESlint
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run lint
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn lint
```            
  </TabItem>
</Tabs>

<br/>

## Testing
---


### Run tests
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run test
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn test
```            
  </TabItem>
</Tabs>

### Run Cypress E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run cypress:test
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn cypress:test
```            
  </TabItem>
</Tabs>


### WebdriverIO E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run webdriver:run
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn webdriver:run
```            
  </TabItem>
</Tabs>



:::tip
We recommend using **[Meercode](https://meercode.io)**, if you are using Travis CI. **[Meercode](https://meercode.io)** is the monitoring dashboard for your CI/CD builds.
:::