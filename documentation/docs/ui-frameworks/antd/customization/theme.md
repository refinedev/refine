---
id: antd-custom-theme
title: Custom Theme
---

Ant Design allows you to customize many of its [less variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less). To be able to theme Ant Design, instead of importing Ant Design's compiled css files, you should import its less files and override the values of _less variables_ contained within these files. You should configure your bundler for handling less files to override its variables.

[Refer to the Ant Design documentation for more information about customizing Ant Design theme. &#8594](https://ant.design/docs/react/customize-theme)

In this example, we'll be demonstrating theming with `less` using [CRACO (Create React App Configuration Override)](https://github.com/gsoft-inc/craco) as our customization layer for [Create React App](https://github.com/facebook/create-react-app).

:::tip
We recommend [**superplate**][superplate] to initialize your refine projects. It configures the project according to your needs including SSR and Theme with Next.js.
:::

:::tip
If you're not using Create React App and already have a webpack setup, you can refer to Ant Design docs for configuring your setup: [Customize in webpack](https://ant.design/docs/react/customize-theme#Customize-in-webpack)
:::

:::tip
If you're using Next.js, [refer to finefoods client example app for theme configuration][finefoods-client]. It uses [next-plugin-antd-less][] to customize theme in a Next.js app.
:::

If you're using Create React App, you can easily enable CRACO.

## Enabling CRACO

First you should install CRACO:

```bash
npm install @craco/craco --save
```

Then in your `package.json` file, update the calls from `react-scripts` to `craco`:

```json title="package.json"
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "craco eject"
  },
```

You can then configure your application with many community maintained CRACO plugins.

You also have to install [`craco-less`](https://github.com/DocSpring/craco-less) and add it to `craco.config.js` to enable `less` support.

```bash
npm install craco-less --save
```

<br />

Now you need to create the `craco.config.js` file:

```ts title="craco.config.js"
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
```

<br />

Create a less file and import antd styles from `node_modules/antd`:

```less title="/styles/antd.less"
@import "~antd/lib/style/themes/default.less";
@import "~antd/dist/antd.less";
```

And import the `less` file in `App.tsx`:

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import "styles/antd.less";

...
```

Then, execute `npm start` to start your application. Since `craco-less` is activated, you can load `less` files just like any other `css` file.

## Overriding Variables

All less variables are found [here](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less). Here are some of the major variables you can override:

```less
@primary-color: #1890ff; // primary color for all components
@link-color: #1890ff; // link color
@success-color: #52c41a; // success state color
@warning-color: #faad14; // warning state color
@error-color: #f5222d; // error state color
@font-size-base: 14px; // major text font size
@heading-color: rgba(0, 0, 0, 0.85); // heading text color
@text-color: rgba(0, 0, 0, 0.65); // major text color
@text-color-secondary: rgba(0, 0, 0, 0.45); // secondary text color
@disabled-color: rgba(0, 0, 0, 0.25); // disable state color
@border-radius-base: 2px; // major border radius
@border-color-base: #d9d9d9; // major border color
@box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05); // major shadow for layers
```

There are two approaches to override variables.

### Variable overrides in `less` files

You can just change variables values in `less` files. Add these contents to your `/styles/antd.less` file:

```less title="/styles/antd.less" {0-1, 7}
@import "~antd/lib/style/themes/default.less";
@import "~antd/dist/antd.less";

// There are some major variables below,
// all less variables could be found in
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

@primary-color: #1da57a;
```

### Variable overrides in `craco.config.js`

Or you can use `craco.config.js` to change variable values. To change the variable named `@primary-color`, you can use the `modifyVars` property of [`lessOptions`](https://github.com/DocSpring/craco-less#configuration):

```ts title="craco.config.js"
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // highlight-next-line
                        modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
```

All variable overrides configured in `lessOptions.modifyVars` always have higher precedence than the overrides in `less` files.

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/customization/customTheme/antd?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-theme-example"
></iframe>

[superplate]: https://github.com/pankod/superplate
[finefoods-client]: https://github.com/pankod/refine/tree/master/examples/fineFoods/client
[next-plugin-antd-less]: https://github.com/SolidZORO/next-plugin-antd-less
