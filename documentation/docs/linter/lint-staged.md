---
id: lint-staged
title: lint-staged
sidebar_label: lint-staged
description: Setting up linter for Next.js
---

Use lint-staged to make your code uniform. It allows you to run arbitrary scripts against currently staged files.
 
[Refer to official documentation for detailed usage. &#8594](https://github.com/okonet/lint-staged)

### How to configure lint-staged?

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::


```json title="package.json"
{
    "devDependencies": {
        "husky": "^4.3.7",
        "lint-staged": "^10.5.3"
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "npm run lint -- --quiet --fix"
        ]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```

## Adding lint-staged to your project later

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
npm i -D lint-staged husky
```
  </TabItem>
  <TabItem value="yarn">

```
yarn add -D lint-staged husky
```
  </TabItem>
</Tabs>

:::warning
You must have installed the `ESLint` plugin to use `lint-staged`.

:::
[To learn how to configure ESLint in your project follow instructions from here  &#8594](eslint)