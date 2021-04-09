---
id: prettier
title: Prettier
sidebar_label: Prettier
description: How to Use ESLint and Prettier in Your Next.js Application?
---

Use Prettier to make your code uniform and maintain code style integrity.

[Refer to official documentation for detailed usage. &#8594](https://prettier.io/)

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::


```json title="package.json"
{
    "scripts": {
        "prettier": "prettier '**/*.{js,jsx,ts,tsx}'"
    },
    "dependencies": {
        "prettier": "^2.2.1"
    }
}
```

Prettier uses `cosmiconfig` for configuration file support. 
This means you can configure Prettier in the ways specified in the [original document](https://prettier.io/docs/en/configuration.html#docsNav).

```json title=".prettierrc"
{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": false,
    "printWidth": 80,
    "tabWidth": 4
}
```

To exclude files from formatting, create a `.prettierignore` file in the root of your project.

```bash title=".prettierignore"
node_modules
__generated__
```


## Adding Prettier to your project later

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
npm i -D prettier
```
  </TabItem>
  <TabItem value="yarn">

```
yarn add -D prettier
```
  </TabItem>
</Tabs>