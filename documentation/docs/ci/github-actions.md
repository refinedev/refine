---
id: github-actions
title: Github Actions
sidebar_label: Github Actions
description: Deploy Next.js Apps using Github Actions
---




Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow.

[Refer to official documentation for detailed usage. &#8594](https://docs.github.com/en/actions)

The following YAML workflow file created into the `.github/workflows/ci.yml` as a default by superplate, if GitHub Actions selected as a CI plugin.

```bash title=".github/workflows/ci.yml"
name: ci

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  ci:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [14]

    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Setup node env
        uses: actions/setup-node@v2.1.2
        with:
          node-version: ${{ matrix.node }}

      - name: Cache node_modules
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

```
:::tip
The following commands are added to `.github/workflows/ci.yml` by superplate if any of plugins listed below is selected during project creation phase.
:::

:::note
You can use the following commands in case of adding Github Actions to existing project later.
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
- name: Cache node_modules
  uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Get yarn cache directory path 
  id: yarn-cache-dir-path
  run: echo "::set-output name=dir::$(yarn cache dir)"

- name: Cache node_modules
  uses: actions/cache@v2
  id: yarn-cache # use this to check for `cache-hit` (`steps.yarn-cache.outputs.cache-hit != 'true'`)
  with:
    path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
    key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
    restore-keys: |
      ${{ runner.os }}-yarn-
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
- name: Install dependencies 
  run: npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Install dependencies 
  run: yarn
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
- name: Run lint
  run: npm run lint
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run lint
  run: yarn lint
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
- name: Run tests
  run: npm run test
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run tests
  run: yarn test
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
- name: Run e2e test
  run: npm run cypress:test
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run e2e test
  run: yarn cypress:test
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
- name: Run e2e test
  run: npm run webdriver:run
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run e2e test
  run: yarn webdriver:run
```            
  </TabItem>
</Tabs>

:::tip
We recommend using **[Meercode](https://meercode.io)**, if you are using Github Actions. **[Meercode](https://meercode.io)** is the monitoring dashboard for your CI/CD builds.
:::

