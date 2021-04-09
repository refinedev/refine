---
id: storybook
title: Storybook
sidebar_label: Storybook
description: How to use Storybook in Next.js?
---
  
Storybook is a tool for UI development. It makes development faster and easier by isolating components. 

This allows you to work on one component at a time. You can develop entire UI without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

[Refer to official documentation for detailed usage. &#8594](https://storybook.js.org/docs/react/get-started/introduction)

:::tip

All required configurations will be handled automatically by CLI as long as you choose CSS Preprocessor  and feature plugins during the project creation phase.

Storybook with CSS configuration handled by CLI as a default if you don't prefer to choose any CSS feature or UI framework plugin.

:::

```jsx title="storybook/main.js"
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-knobs",
  ],
  webpackFinal: async (config) => {
    return config;
  },
};
```

```js title="storybook/preview.js"
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
```

For example, lets check out a `button` component storybook file:

```tsx title="components/button/index.stories.tsx"
import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { Button } from "./index";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs],
};

export const Basic = () => <Button disabled={boolean("Disabled", false)}>Button</Button>;
```
We added addon-knobs to show how to use of dynamic variables. You are free to omit knobs if you don't need to use.

Refer to [github repo](https://github.com/storybookjs/storybook/tree/master/addons/knobs) for detailed usage of knobs.

Run your storybook with `npm run storybook`.

:::note
You can build `Storybook` as a static web application with:
```bash
  npm run build-storybook
```

:::
Refer to [official documentation](https://storybook.js.org/docs/react/workflows/publish-storybook) for detailed usage of publishing storybook.

## How to configure Storybook with plugins?

:::caution

Selected UI framework plugin adds by superplate during the project creating phase. You can follow instructions at the below, if you want to add UI framework later.

:::

### Scss 
To use `scss` with `storybook` in your project, the `webpackFinal` field in `main.js` should be changed as follows.


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
npm i -D sass-loader
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D sass-loader
```
  </TabItem>
</Tabs>


[To learn how to configure Scss in your project follow instructions from here  &#8594](scss)

```js title="storybook/main.js"
webpackFinal: async (config) => {
    config.module.rules.push({
        // this is for both less and scss
        test: /.*\.(?:sc|c)ss$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    modules: true,
                },
            },
            "sass-loader",
        ],
    });
    return config;
}
```
### Chakra-UI 
To use `chakra-ui` with `storybook` in your project, `main.js` and `preview.js` should be updated as follows.

```jsx title="storybook/main.js"
const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-knobs",
  ],
  webpackFinal: async (config) => {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    };

    return config;
  },
};
```

```js title="storybook/preview.js"
import { addDecorator } from "@storybook/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();
  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

addDecorator(withChakra);
```

### Bootstrap and Antd
To use `bootstrap` and `antd` with `storybook` in your project, imports related to the plugin should be added to the `preview.js` file.

Antd

```js title="storybook/preview.js"
import "antd/dist/antd.css";
```

Bootstrap

```js title="storybook/preview.js"
import styles from "../src/styles/app.scss";
```

### Styled-Components 
To use `styled-components` with `storybook` in your project.

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm i -D storybook-addon-styled-component-theme
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D storybook-addon-styled-component-theme
```
  </TabItem>
</Tabs>


We recommend to check [styled-component documentation](styled-components.md) to integrate styled-component to your existing project and then the `addons` field in `main.js` should be changed as follows and `preview.js` should be updated as follows.

```js title="storybook/main.js"
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-knobs",
     //highlight-next-line
    "storybook-addon-styled-component-theme/dist/register",
  ],
```

```js title="storybook/preview.js"
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import { light } from "../src/definitions/styled-components/light";
import { dark } from "../src/definitions/styled-components/dark";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const lightTheme = {
  name: "LIGHT",
  ...light,
};

const darkTheme = {
  name: "DARK",
  ...dark,
};

export const getAllThemes = () => {
  return [lightTheme, darkTheme];
};

addDecorator(withThemesProvider(getAllThemes()));
```

Storybook includes two themes that looks good: `light` and `dark`.

:::note

With the `styled-components` you will be able to use the theme fully integrated into Storybook when you switch storybook theme then Storybook itself will change into the theme and the components you use will change as well.
:::

## Adding Storybook to your project later

:::tip

All this work will be handled automatically by superplate, so you don’t need to do anything extra as long as you choose Storybook  plugin during the project creation phase.

:::

If you want to add Storybook to your existing project first install the dependencies

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm i -D @babel/core @storybook/addon-actions @storybook/addon-essentials @storybook/addon-links @storybook/preset-scss @storybook/addon-knobs @storybook/react babel-loader style-loader css-loader
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add -D @babel/core @storybook/addon-actions @storybook/addon-essentials @storybook/addon-links @storybook/preset-scss @storybook/addon-knobs @storybook/react babel-loader style-loader css-loader
```
  </TabItem>
</Tabs>

[Refer to official documentation for detailed usage. &#8594](https://storybook.js.org/docs/react/get-started/introduction)

