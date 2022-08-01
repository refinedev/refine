---
id: mui-custom-theme
title: Custom Theme
---

import withoutTheme from '@site/static/img/guides-and-concepts/theme/mui/withoutTheme.png'
import withTheme from '@site/static/img/guides-and-concepts/theme/mui/withTheme.png'
import overridedTheme from '@site/static/img/guides-and-concepts/theme/mui/overridedTheme.png'
import customTheme from '@site/static/img/guides-and-concepts/theme/mui/customTheme.png'
import toggleDarkMode from '@site/static/img/guides-and-concepts/theme/mui/toggleDarkMode.gif'
import notistackTheme from '@site/static/img/guides-and-concepts/theme/mui/notistackTheme.gif'

Theme specifies the color of the components, the darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc. You can either create your own Theme or use Themes that provide from Refine. There are two types of Themes: [`LightTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L16) and [`DarkTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L46). [`LightTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L16) tend to have dark text on a light background, while [`DarkTheme`](https://github.com/pankod/refine/blob/next/packages/mui/src/theme/index.ts#L46) have light text on a dark background. Theme provides a way to your app's design to meet them.

[Refer to the Material UI documentation for more information about Material UI Theming. &#8594](https://mui.com/material-ui/customization/theming/)

## Theme Provider

The [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) component is a simple wrapper around React's Context API that allows you to inject a Theme object into your application. By default, Material-UI components come with a default Theme. In addition, you can also use the ThemeProvider component to inject a custom theme that you have created yourself. This is a feature that allows for great flexibility in how you design your application.

```tsx title="src/App.tsx
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    // highlight-next-line
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={YOUR_THEME_OBJECT}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

## Passing the Theme to ThemeProvider

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

In our example, we will be using LightTheme.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
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
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

## Overriding Variables

The best way to customize your theme is by changing the configuration variables. These sections cover some of those most important options, like [`palette`](https://mui.com/material-ui/customization/palette/) and [`typography`](https://mui.com/material-ui/customization/typography/)!

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
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
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

:::tip
Get a designer's opinion anyway - you'll be happy with the end result!
:::

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
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    LightTheme,
    GlobalStyles,
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
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

:::info
If you are overriding the `fontFamily` in typography, you can add the `<link>` tags  in your `index.html` like the following:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        // highlight-start
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />
        // highlight-end
        <title>refine adding font family example</title>
    </head>

    <body>
        ...
    </body>
</html>
```

:::

## Create Custom Theme

With the help of Refine's themes, you can customize your site in a matter of minutes. Alternatively, there is also an option to create a custom theme with the [`createTheme()`](https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme) method so you can create a custom theme with the configuration variables and use it in the whole application.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
    // highlight-next-line
    createTheme,
    // highlight-next-line
    responsiveFontSizes,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
// highlight-start
let customTheme = createTheme({
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

// highlight-start
customTheme = responsiveFontSizes(customTheme);
// highlight-end

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

:::tip
You can use the responsiveFontSizes() helper to make Typography font sizes in your theme automated.
For more information, you can review [`responsiveFontSizes()`](https://mui.com/material-ui/customization/typography/#responsive-font-sizes) in the mui document.
:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={customTheme} alt="Custom Theme" />
</div>

### Create Theme with Custom Variables

Creating a theme with default variables is easy and we can see it in the example above. You can also create your theme with custom variables, you can check it out our example

```tsx title="src/App.tsx"
const customTheme = createTheme({
    customVariable: {
        custom: "#330f49",
    },
});
```

You need to use [`module augmentation`](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) for the theme to accept your custom values.

```ts title="src/interfaces/theme.d.ts"
import "@pankod/refine-mui";

export interface CustomTheme {
    customVariable: {
        custom: string;
    };
}

declare module "@pankod/refine-mui" {
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    interface ThemeOptions
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
```

You can see an example of how to [`create your own theme with custom variables`](https://github.com/pankod/refine/blob/next/examples/fineFoods/admin/mui/src/theme.ts) and its [`interface`](https://github.com/pankod/refine/blob/next/examples/fineFoods/admin/mui/src/interfaces/theme.d.ts) by accessing the links.

## Dark Mode

You might prefer to use dark mode in your applications. If you want to add dark mode to your application, you can easily use [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) to set your color mode or dynamic toggle to switch your mode by using a context. This will help you maintain a consistent look and feel throughout your app.

### System Preference

With the [`useMediaQuery`](https://mui.com/material-ui/react-use-media-query/) hook, you can query a user's preference for light or dark mode and then adjust your site accordingly. This will make things easier on those who prefer darker colors as it simplifies their experience by eliminating any confusion about what browser they are using!
For example:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
    // highlight-next-line
    useMediaQuery,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
// highlight-next-line
const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

const App: React.FC = () => {
    return (
        // highlight-next-line
        <ThemeProvider theme={prefersDarkMode ? DarkTheme : LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                ReadyPage={ReadyPage}
                Layout={Layout}
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

### Dark Mode Toggle

Control the Dark Mode with just one click! We prepared an example that shows how you can manage to toggle Dark Mode with help of a context in your Header component, which is given as a prop to Refine.

<details>
  <summary>Dark Mode Toggle Code Example</summary>
  <div>
    <details>
      <summary>
       ColorModeContext
      </summary>
           <p>

```tsx title="src/contexts/index.tsx"
import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@pankod/refine-mui";
import { DarkTheme, LightTheme } from "@pankod/refine-mui";

type ColorModeContextType = {
    mode: string;
    setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
    {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const colorModeFromLocalStorage = localStorage.getItem("colorMode");
    const isSystemPreferenceDark = window?.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    const systemPreference = isSystemPreferenceDark ? "dark" : "light";
    const [mode, setMode] = useState(
        colorModeFromLocalStorage || systemPreference,
    );

    useEffect(() => {
        window.localStorage.setItem("colorMode", mode);
    }, [mode]);

    const setColorMode = () => {
        if (mode === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    };

    return (
        <ColorModeContext.Provider
            value={{
                setMode: setColorMode,
                mode,
            }}
        >
            <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
```

</p>
    </details>
    <details>
      <summary>
       App.tsx
      </summary>
     <p>

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    CssBaseline,
    RefineSnackbarProvider,
    notificationProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";
import { ColorModeContextProvider, ColorModeContext } from "./contexts";

const Header = () => {
    const { mode, setMode } = useContext(ColorModeContext);
    return (
        <AppBar color="default" position="sticky">
            <Stack width="100%" direction="row" justifyContent="end">
                <Box marginRight="20px">
                    <IconButton
                        onClick={() => {
                            setMode();
                        }}
                    >
                        {mode === "dark" ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined />
                        )}
                    </IconButton>
                </Box>
            </Stack>
        </AppBar>
    );
};

const App: React.FC = () => {
    return (
        <ColorModeContextProvider>
            <CssBaseline />
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    Header={Header}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
};

export default App;
```

</p>
    </details>
  </div>
</details>

[You can use this StackBlitz link to access this example. &#8594](https://stackblitz.com/github/pankod/refine/tree/master/examples/customization/customTheme/mui/?preset=node)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={toggleDarkMode} alt="Dark Mode" />
</div>

## Notification Snackbars compatible with Theme

We use the [`notistack`](https://iamhosseindhv.com/notistack) library for notifications in our Material UI package provides an elegant way to engage with your users.
The main motivation for us to use the Notistack was that while the Notistack provider ( `<SnackbarProvider>` ) is a child of our ThemeProvider, it works in harmony with the theme.

We provide [`<RefineSnackbarProvider>`](https://github.com/pankod/refine/blob/next/packages/mui/src/providers/refineSnackbarProvider/index.tsx) that extended `<SnackbarProvider>` with theme style. You have to wrap Refine with [`<RefineSnackbarProvider>`](https://github.com/pankod/refine/blob/next/packages/mui/src/providers/refineSnackbarProvider/index.tsx) and also pass the `notificationProvider` as props.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    LightTheme
    ErrorComponent,
    ReadyPage,
    ThemeProvider,
    CssBaseline,
    GlobalStyles,
    // highlight-next-line
    RefineSnackbarProvider,
    // highlight-next-line
    notificationProvider
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            // highlight-next-line
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
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
            <RefineSnackbarProvider />
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
    <img src={notistackTheme} alt="Notistack Snackbars with Theme" />
</div>

<br />

:::tip
If you want to use notistack snackbars with the default style, simply wrap Refine in `<SnackbarProvider>`.
:::

[superplate]: https://github.com/pankod/superplate
