---
id: antd
title: Ant Design
sidebar_label: Ant Design
description: Setting up Ant design for Typescript Next.js apps 
---

A design system for enterprise-level products. Create an efficient and enjoyable work experience.

Ant Design provides a React UI library `antd` that contains a set of high quality components and demos for building rich, interactive user interfaces.  
[Go to docs &#8594](https://ant.design/docs/react/introduce)

### Less Support
`antd` uses `less` as its preprocessor.

:::caution

Due to its incompatibility with `storybook`, `less` is not included in superplate.

:::

To use `less` with `antd` in your project  
- Add its dependencies,

```js title="package.json"
{
    "dependencies": {
        "less": "^4.1.0",
        "@zeit/next-less": "^1.0.1"
    }
} 
```

- Configure in `next.config.js`

```js title="next.config.js"
const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');

module.exports = withPlugins([
    [withLess, {
        lessLoaderOptions: {
            javascriptEnabled: true,
        }
    }]
]);
```

:::caution

When you add any of the css related plugins, including less/sass, it disables built-in support for CSS loading in Next.js

:::