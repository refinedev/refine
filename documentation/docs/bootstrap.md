---
id: bootstrap
title: Bootstrap
sidebar_label: Bootstrap
description: How to use Bootstrap with Next.js?
---

Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.

### React Bootstrap

**superplate** uses `react-bootstrap` component library for bootstrap plugin. React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.  
[Refer to official documentation for detailed usage. &#8594](https://react-bootstrap.github.io/getting-started/introduction)

- Some stylesheet is required to use React Bootstrap components.

```tsx title="pages/_app.tsx"
import "bootstrap/dist/css/bootstrap.min.css";
```

### Using Components

- Import from `react-bootstrap`

```js
import { Button } from 'react-bootstrap';
```

- Or import individual components

```js
import Button from 'react-bootstrap/Button';
```

- Customize components with props

```tsx title="src/components/main/index.tsx"
<Button
    href="https://pankod.github.io/superplate/"
    target="_blank"
    variant="primary"
    size="lg">
    Docs
</Button>
```

- Bootstrap utility classes can also be used with components
```tsx title="src/components/cards/index.tsx"
<Container className="my-5 flex-grow-1">
    ...
</Container>
```

### Using Sass with Bootstrap
:::tip

If you also add `sass/scss` under CSS Preprocessors during creation phase, you can easily [customize Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/theming/#sass). Bootstrap’s source ***sass*** files are added under `src/styles` directory.  
[See Sass/SCSS doc &#8594](scss.md)

:::

If `sass/scss` plugin is not selected, Sass can be added later to customize Bootstrap,

- Add a custom scss file `app.scss` under `src/styles`

```js title="src/styles/app.scss"
@import "./_variables";
@import "./_bootstrap";
``` 

- Add scss files for overriding variables and Bootstrap source Sass file imports

```js  title="src/styles/_variables.scss"
// Override Default Variables
// https://getbootstrap.com/docs/4.6/getting-started/theming/#variable-defaults

$primary: #6610f2;
$secondary: #fd7e14;
```

```js title="src/styles/_bootstrap.scss"
// Option A: Include all of Bootstrap

// @import "~bootstrap/scss/bootstrap";

// Add custom code after this

// Option B: Include parts of Bootstrap

// Required
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Include custom variable default overrides here

// Optional
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/code";
@import "~bootstrap/scss/grid";
```

- import in `_app.tsx`

```diff title="pages/_app.tsx"
- import "bootstrap/dist/css/bootstrap.min.css";
+ import "src/styles/app.scss";
```

- install sass
```js
npm install sass
```

### Adding Bootstrap to your project later
If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `react-bootstrap` and `bootstrap` packages

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```bash
npm install react-bootstrap bootstrap
```
  </TabItem>
  <TabItem value="yarn">

```bash
yarn add react-bootstrap bootstrap
```          
  </TabItem>
</Tabs>

- [Follow instructions in React Bootstrap](#react-bootstrap)

[Refer to official documentation on installation for detailed usage. &#8594](https://react-bootstrap.github.io/getting-started/introduction#installation)
