---
id: scss
title: Sass/SCSS
sidebar_label: Sass/SCSS
description: How to use Sass in Next.js?
---

Sass is a CSS preprocessor, which adds special features such as variables, nested rules and mixins (sometimes referred to as syntactic sugar) into regular CSS.

Next.js allows you to import Sass using both the `.scss` and `.sass` extensions. You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

To style your components using CSS Modules, name your stylesheet files with the `[name].module.scss`.


```css title="components/header/index.module.scss"
.header {
  background-color: #20232A;

  title {
    color: #96CBEF;
  }

  &:hover {
    background-color: #2C3946;
  }
}
```



```jsx title="components/header/index.tsx"
import React from "react";

import styles from "./index.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <title>Title<title>
    </div>
  );
};
```

<br/>

:::caution

Sass node package adds by CLI if chosen as CSS Preprocessor during project creating phase. Since Next.js doesn’t come with Sass, be sure to install with `npm install sass` if you want to add Sass afterwards.

:::

:::note

Next.js has built-in Sass support, no configuration required. Just install the Sass package if you haven't chosen from our CLI as a preprocessor then Next.js will see this dependency and enable built-in Sass loader.

:::

:::tip

You can [customize Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/theming/#sass) if UI framework chosen as Bootstrap along with Sass during creation phase.
Bootstrap’s source Sass files added to under `src/styles` folder directory.

:::


