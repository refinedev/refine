---
slug: /theming
id: theming
title: Theming With Less
---

Ant Design allows you to customize many of its design variables. You should configure a less loader for customization. After that, you can change these variables values to fit Ant Design to your branding:

[/components/style/themes/default.less](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

In this example, we'll be demonstrating theming with `less` using [Create React App Configuration Override](https://github.com/gsoft-inc/craco) as our customization layer for [Create-React-App](https://github.com/facebook/create-react-app).

If you're using Create React App, you can easily enable CRACO.

## Enabling CRACO

First you should install CRACO:

```bash
npm install @craco/craco --save
```

And in your `package.json` file, update the calls from `react-scripts` to `craco`:

```json title="src/pages/users/create.tsx"
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "craco eject"
  },
```

You can then configure your application with many community maintained CRACO plugins.

You should install [`craco-less`](https://github.com/DocSpring/craco-less) and add it to `craco.config.js` to enable `less` support. 

```bash
npm install craco-less --save
```

Then create the `craco.config.js` file: 

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

Create a less file and import antd styles from `~@pankod/refine/node_modules/antd`:

```less title="/styles/antd.less"
@import '~@pankod/refine/node_modules/antd/lib/style/themes/default.less';
@import '~@pankod/refine/node_modules/antd/dist/antd.less';
```

And import the `less` file in `App.tsx`:

```tsx title="App.tsx"
import { Admin, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

//highlight-next-line
import "styles/antd.less";

...
```

Then, execute `npm start` to start your application. Since `craco-less` is activated, you can load `less` files just like any other `css` file.

There are two approaches to override variables.

### Variable overrides in `less` files

You can just change variables values in `less` files. Add these contents to your `/styles/antd.less` file:

```less title="/styles/antd.less"
@import '~@pankod/refine/node_modules/antd/lib/style/themes/default.less';
@import '~@pankod/refine/node_modules/antd/dist/antd.less';
// There are some major variables below, 
// all less variables could be found in 
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

//highlight-next-line
@primary-color: #1DA57A;
```

### Variable overrides in `craco.config.js`

Or you can use `craco.config.js` to change variable values. To change the variable named `@primary-color`, you can use `modifyVars` property of [`lessOptions`](https://github.com/DocSpring/craco-less#configuration):

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

All variable overrides configured in `lessOptions.modifyVars` always have higher precedence than overrides in `less` files.
