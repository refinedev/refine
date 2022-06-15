---
id: material-ui
title: Material UI Theme
---

import withoutTheme from '@site/static/img/guides-and-concepts/theme/mui/withoutTheme.png'
import withTheme from '@site/static/img/guides-and-concepts/theme/mui/withTheme.png'
import overridedTheme from '@site/static/img/guides-and-concepts/theme/mui/overridedTheme.png'
import customTheme from '@site/static/img/guides-and-concepts/theme/mui/customTheme.png'

Theme specifies the color of the components, the darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc. You can either create your own Theme or use Themes that provide from Refine. There are two types of Themes: [`LightTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L16) and [`DarkTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L46). [`LightTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L16) tend to have dark text on a light background, while [`DarkTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L46) have light text on a dark background. Theme provides a way to your app's design to meet them.

[Refer to the Material UI documentation for more information about Material UI Theming. &#8594](https://mui.com/material-ui/customization/theming/)

### Theme Provider

The [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) component is a simple wrapper around React's Context API that allows you to inject a Theme object into your application. By default, Material-UI components come with a default Theme. In addition, you can also use the ThemeProvider component to inject a custom theme that you have created yourself. This is a feature that allows for great flexibility in how you design your application.

```tsx title="src/App.tsx
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
            // highlight-next-line
        </ThemeProvider>
    );
};

export default App;
```

:::tip
We recommend [**superplate**][superplate] to initialize your Refine projects. It configures the project according to your needs including SSR and Theme with Next.js.
:::

### Passing the Theme to ThemeProvider

In order to use the theme in your app, you just have one choice: pass it on! Refine provide two types of themes [`LightTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L16) and [`DarkTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L46).

If you don't wrap your app with [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) and theme, it looks like this when using the Material UI default:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={withoutTheme} alt="App without ThemeProvider" />
</div>

<br/>

In our example we will be using LightTheme.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    // highlight-next-line
    LightTheme,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
```

The design has been changed to match the LightTheme, so you can enjoy these amazing interfaces without any hassle!

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={withTheme} alt="App with ThemeProvider" />
</div>

### Overriding Variables

The best way to customize your theme is by changing the configuration variables. These sections cover some of those most important options, like [`palette`](https://mui.com/material-ui/customization/palette/) and [`typography`](https://mui.com/material-ui/customization/typography/)!

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    LightTheme,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

// highlight-start
const overridedLightTheme = {
    ...LightTheme,
    palette: {
        ...LightTheme.palette,
        primary: {
            main: "#44d0c7",
        },
        secondary: {
            main: "#2f82f1",
        },
    },
};
// highlight-end

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={overridedLightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
```

When we easy-override our LightTheme, it's going to look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={overridedTheme} alt="Theme variable override" />
</div>

<br />

You can also change the Default Font Family. Refine uses the [`Montserrat`](https://fonts.google.com/specimen/Montserrat) font family by default and you can change it like this:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    LightTheme,
    // highlight-next-line
    TypographyVariantsOptions,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
// highlight-start

export const typography: TypographyVariantsOptions = {
    fontFamily: [
        "Montserrat",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
};
// highlight-end

// highlight-start
const overridedLightTheme = {
    ...LightTheme,
    ...typography,
};
// highlight-end

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={overridedLightTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
```

[Refer to the Material UI documentation for more information about Material UI Theme Configuration Variables. &#8594](https://mui.com/material-ui/customization/theming/)

### Create Custom Theme

With the help of Refine's themes, you can customize your site in a matter minutes. Alternatively there is also an option to create custom theme with the [`createTheme()`](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme) method so you can create a custom theme with the configuration variables and use it in the whole application.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LoginPage,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    // highlight-next-line
    createTheme,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
// highlight-start
const customTheme = createTheme({
    palette: {
        primary: {
            main: "#330f49",
        },
        secondary: {
            main: "#45d0c8",
        },
    },
});
// highlight-end

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
                LoginPage={LoginPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostsList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
};

export default App;
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={customTheme} alt="Custom Theme" />
</div>

[superplate]: https://github.com/pankod/superplate
