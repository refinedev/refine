---
id: eslint
title: ESLint
sidebar_label: ESLint
description: Using ESLint and Prettier in a TypeScript Next.js Project
---

Use ESLint to find and fix problems in your codebase.
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

[Refer to official documentation for detailed usage. &#8594](https://eslint.org/)


```json title="package.json"
{
    "scripts": {
        "lint": "eslint '**/*.{js,jsx,ts,tsx}'"
    },
    "devDependencies": {
        "eslint": "^7.15.0",
        "@typescript-eslint/eslint-plugin": "^4.9.1",
        "@typescript-eslint/parser": "^4.9.1",

        // highlight-next-line
        If you want to use Prettier with ESLint, you need to add the following packages.
        // "eslint-config-prettier": "^7.0.0",
        // "eslint-plugin-prettier": "^3.2.0"
    }
}
```

ESLint is designed to be flexible and configurable for your use case. You can turn off every rule and run only with basic syntax validation or mix and match the bundled rules and your custom rules to fit the needs of your project. 

```json title="_.eslintrc"
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "overrides": [
      {
          "files": ["*.js"],
          "rules": {
              "@typescript-eslint/no-var-requires": "off"
          }
      }
  ],
  "env": {
      "node": true,
      "browser": true,
      "amd": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",

    // highlight-next-line
    If you want to use prettier with ESLint, the following configuration can be used.
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended" 
  ]
}
```

You can tell ESLint to ignore specific files and directories in your config files.

```bash title=".eslintignore"
node_modules
__generated__
```

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::


## Adding ESLint to your project later

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
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
If you want to use Prettier with ESLint, you need to add the following packages.

```
npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier/@typescript-eslint plugin:prettier/recommended
```
  </TabItem>
  <TabItem value="yarn">

```
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
If you want to use Prettier with ESLint, you need to add the following packages.

```
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier/@typescript-eslint plugin:prettier/recommended
```            
  </TabItem>
</Tabs>