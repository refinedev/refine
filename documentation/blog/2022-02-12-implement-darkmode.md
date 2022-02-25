---
title: Implementing Dark Mode In Ant Design Using gulp
description: In this article, we’ll learn how to efficiently implement dark mode in a Refine/Ant Design app, using gulp library and leveraging some React features like hooks
slug: how-to-add-darkmode-in-ant-design
authors: vmalep
tags: [refine, darkmode, theme, ant-design]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import css from '@site/static/img/blog/2022-02-12-implement-darkmode/css.png';
import light from '@site/static/img/blog/2022-02-12-implement-darkmode/light.png';
import dark from '@site/static/img/blog/2022-02-12-implement-darkmode/dark.png';

In this article, we will provide an example on how to implement darkmode with **refine**. In order to switch between light and dark mode, we need 2 different styles and the possibility to switch between one and the other without restarting the application. Since the Less stylesheets with React doesn't allow variables to be modified without compilation and therefore a restart of the application. To solve this, we are going to use **gulp** that will compile the Less files into swappable CSS, directly accessible to the running application.

<!--truncate-->

The solution was presented in this [blog](https://jfelix.info/blog/dynamic-themes-in-ant-design-how-to-change-between-light-and-dark-theme) and lightly adapted to **Refine**.

## Initial setup
For this article, we started from a basic Refine app with Ant Design:
```tsx
npx superplate-cli -p refine-react tutorial
```
Select the following options to complete the CLI wizard:
```tsx
Cloned remote source successfully.
✔ What will be the name of your app · tutorial
✔ Package manager: · npm
✔ Do you want to use an UI Framework?: · antd
✔ Do you want to customize theme?: · less
✔ Data Provider: · custom-json-rest-data-provider
✔ Auth Provider: · none
✔ Do you want to add an example page? · example-resource
✔ Do you want to customize layout? · custom-layout
✔ i18n - Internationalization: · no
```
From there, install the following packages:
```tsx
npm install -s gulp gulp-less gulp-postcss gulp-debug gulp-csso autoprefixer less-plugin-npm-import
npm install -s react-redux react-css-theme-switcher
```

## Create the Less and then CSS files

### Copy the `antd.less` file
Make a copy of the `src/styles/antd.less` file into `antd.light-theme.less` and add the following lines inside (because this setting will be removed from the Header/index.tsx file later on):
```tsx
// Header
@layout-header-background:#fff;
```

### Create a Less file for the dark mode
Create the following file `src/styles/antd.dark-theme.less` with this content:
```tsx title="src/styles/antd.dark-theme.less"
// Run 'npx gulp less' after modifying this file

@import '~antd/lib/style/color/colorPalette.less';
@import '~antd/dist/antd.less';
@import '~antd/lib/style/themes/dark.less';

@primary-color: rgba(255, 255, 255, 0.75);
@border-radius-base: 4px;
@icon-color: rgba(255, 255, 255, 0.75);

@component-background: #303030;
@body-background: #303030;
@popover-background: #303030;
@border-color-base: #6f6c6c;
@border-color-split: #424242;
@table-header-sort-active-bg: #424242;
@card-skeleton-bg: #424242;
@skeleton-color: #424242;
@table-header-sort-active-bg: #424242;
@layout-header-background:#424242;
```

### Compile the CSS files with `gulp`

Create the following `gulpfile.js` in the root of the repo:
```tsx title="gulpfile.js"
const gulp = require('gulp')
const gulpless = require('gulp-less')
const postcss = require('gulp-postcss')
const debug = require('gulp-debug')
var csso = require('gulp-csso')
const autoprefixer = require('autoprefixer')
const NpmImportPlugin = require('less-plugin-npm-import')

gulp.task('less', function () {
  const plugins = [autoprefixer()]

  return gulp
    .src('src/styles/*-theme.less')
    .pipe(debug({title: 'Less files:'}))
    .pipe(
      gulpless({
        javascriptEnabled: true,
        plugins: [new NpmImportPlugin({prefix: '~'})],
      }),
    )
    .pipe(postcss(plugins))
    .pipe(
      csso({
        debug: true,
      }),
    )
    .pipe(gulp.dest('./public'))
})

exports.sync = gulp.series('less');
```
And run `npx gulp less`
```tsx
▶npx gulp less                       
[22:36:28] Using gulpfile ./gulpfile.js
[22:36:28] Starting 'less'...
[22:36:28] Less files: src/styles/antd.dark-theme.less
[22:36:28] Less files: src/styles/antd.light-theme.less
[22:36:28] Less files: 2 items
## parsing done in 165 ms

Compress block #1
[0.028s] init
[0.038s] clean
[0.068s] replace
[0.076s] prepare
[0.011s] mergeAtrule
[0.052s] initialMergeRuleset
[0.011s] disjoinRuleset
[0.068s] restructShorthand
[0.076s] restructBlock
[0.015s] mergeRuleset
[0.075s] restructRuleset
## compress done in 522 ms

## generate done in 44 ms

## parsing done in 114 ms

Compress block #1
[0.007s] init
[0.020s] clean
[0.057s] replace
[0.067s] prepare
[0.006s] mergeAtrule
[0.068s] initialMergeRuleset
[0.012s] disjoinRuleset
[0.045s] restructShorthand
[0.033s] restructBlock
[0.010s] mergeRuleset
[0.061s] restructRuleset
## compress done in 389 ms

## generate done in 15 ms

[22:36:33] Finished 'less' after 5 s
```
:::info
this command must be repeated each time the Less files are modified and the application restarted to see the changes)
:::

You should now have 2 CSS files inside the public folder: `antd.dark-theme.css`and `antd.light-theme.css`
<div class="img-container">
    <img src={css} alt="signin" />
</div>

## Adapt the Refine application to be able to switch between the 2 styles

### App.tsx file
// highlight-start
// highlight-end
In App.tsx, adapt the file so it looks like this :
```tsx
import { Refine, } from '@pankod/refine-core';
import { notificationProvider } from '@pankod/refine-antd';
import routerProvider from "@pankod/refine-react-router";
import "styles/antd.less";
import dataProvider from "@pankod/refine-simple-rest";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Title, Header, Sider, Footer, Layout, OffLayoutArea } from "components/layout"
// highlight-start
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
// highlight-end

function App() {
// highlight-start
    const currThemes = {
        dark: `${process.env.PUBLIC_URL}/antd.dark-theme.css`,
        light: `${process.env.PUBLIC_URL}/antd.light-theme.css`,
    };
// highlight-end

    return (
// highlight-start
        <ThemeSwitcherProvider themeMap={currThemes} defaultTheme="light">
// highlight-end
            <Refine routerProvider={routerProvider} notificationProvider={notificationProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                ]}
                Title={Title}
                Header={Header}
                Sider={Sider}
                Footer={Footer}
                Layout={Layout}
                OffLayoutArea={OffLayoutArea} />
// highlight-start
        </ThemeSwitcherProvider>
// highlight-end
    );
};

export default App;
```

### Header

Add a theme switcher in the Header (`src/components/layout/header/index.tsx`) with the added lines so it looks like this (the Header has been simplified for the sake of clarity and the switch can be installed somewhere else in the application obviously):

```tsx
import { useState } from "react";
// highlight-start
import { useThemeSwitcher } from "react-css-theme-switcher";
// highlight-end
import {
    AntdLayout,
// highlight-start
    Switch,
// highlight-end
} from "@pankod/refine-antd";

export const Header: React.FC = () => {
// highlight-start
    const [isDarkMode, setIsDarkMode] = useState<boolean>();
    const { switcher, themes } = useThemeSwitcher();

    function toggleTheme(isChecked: boolean) { // added
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };
// highlight-end

    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
// highlight-start
                //backgroundColor: "#FFF", // commented out, otherwise the header remains white in dark mode
// highlight-end
            }}

        >
// highlight-start
            <div className="main fade-in"> // added
                <Switch
                    checkedChildren="🌜"
                    unCheckedChildren="🌞"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
            </div>
// highlight-end
        </AntdLayout.Header>
    );
};
```
You should now have a light/dark mode switcher in the header:
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={light} alt="signin" />
</div>
<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={dark} alt="signin" />
</div>
<br />
