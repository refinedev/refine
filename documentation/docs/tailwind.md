---
id: tailwind
title: Tailwind CSS
sidebar_label: Tailwind CSS
description: How to use Tailwind CSS in Next.js?
---

A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.  
[Go to Docs &#8594](https://tailwindcss.com/docs)

## Configuration files

Tailwind plugin produces the two [necessary config files:](https://tailwindcss.com/docs/guides/nextjs#create-your-configuration-files) `tailwind.config.js` and `postcss.config.js`  
[See Tailwind configuration docs &#8594](https://tailwindcss.com/docs/configuration)

## Include Tailwind in your CSS

Tailwind is imported directly in `_app.tsx`

```js title="pages/_app.tsx"
import "tailwindcss/tailwind.css";
```
[You can also include tailwind in your custom css &#8594](https://tailwindcss.com/docs/guides/nextjs#include-tailwind-in-your-css)

## Purging unused styles

`tailwind.config.js` is configured to purge unused styles in pages and components.

```js title="tailwind.config.js"
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"]
}
```
[See guide on optimizing for production on Tailwind docs &#8594](https://tailwindcss.com/docs/optimizing-for-production)

## Configuring PostCSS

Finally, we need to create a `postcss.config.js` file to set up Tailwind with Next.js properly.

```js title="postcss.config.js"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Adding Tailwind CSS to your project later

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
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
```
  </TabItem>

</Tabs>

[Refer to official documentation for detailed installation. &#8594](https://tailwindcss.com/docs/installation)