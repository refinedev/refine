---
id: chakra-ui
title: Chakra UI
sidebar_label: Chakra UI
description: How to use Chakra UI in Next.js?
---

Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.  
[Refer to official documentation for detailed usage. &#8594](https://chakra-ui.com/docs/getting-started)

## Setup Provider

- For Chakra UI to work correctly, you need to setup the ChakraProvider at the root of your application. If you need to customize the default chakra theme, you can extend the theme from `@chakra-ui/react` and pass your extended theme to the provider.

```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "@definitions/chakra/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
```

## Customize Theme

[Refer to official documentation on theme customization for detailed usage. &#8594](https://chakra-ui.com/docs/theming/customize-theme)

- Extend the default theme with seperate overriden style files.

```ts title="src/definitions/chakra/theme/index.ts"
import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

import colors from "./foundations/colors";

import fontSizes from "./foundations/fontSizes";

const overrides = {
  ...styles,
  colors,
  fontSizes,
};

const theme = extendTheme(overrides);

export default theme;
```

- Override global styles.

```ts title="src/definitions/chakra/theme/styles.ts"
import { ThemeOverride } from "@chakra-ui/react";

type GlobalStyles = Pick<ThemeOverride, "styles">;

export default {
  styles: {
    global: {
      h1: {
        fontWeight: 500,
        marginBottom: "0.5em",
      },
      p: {
        marginBottom: "1em",
      },
    },
  },
} as GlobalStyles;
```

- Override other parts of the style(*fontSize, colors...*).

```js title="src/definitions/chakra/theme/foundations/fontSizes.js"
export default {
  lg: "18px",
  "5xl": "46px",
};
```

```js title="src/definitions/chakra/theme/foundations/colors.js"
export default {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  header: {
    100: "#20232a",
  },
  main: {
    100: "#282c34",
  },
};
```

:::info
If you're curious as to what theme styles you can override, please reference the [default theme foundation style files](https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations).
:::

:::tip
All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **Chakra UI** plugin during the project creation phase.
:::

### Component Style
Chakra UI also provides a way to write component styles that is easy to maintain over the life of a growing and changing project  
[Refer to official documentation on component style for detailed usage. &#8594](https://chakra-ui.com/docs/theming/component-style)

### Color Mode (Dark Mode)
Chakra UI comes with built-in support for managing color mode in your apps.  
[Refer to official documentation on color mode for detailed usage. &#8594](https://chakra-ui.com/docs/features/color-mode)

## Usage

### Style Props

```tsx title="src/components/main/index.tsx"
import React from "react";
import { Box } from "@chakra-ui/react";

export const Main: React.FC = () => {
  return (
    <Box color="white" textAlign="center" py={10}>
      ...
    </Box>
  );
};
```

[Refer to official documentation on style props for detailed usage. &#8594](https://chakra-ui.com/docs/features/style-props)

### Customized Tokens

```tsx title="src/components/header/index.tsx"
<Center bg="header.100">
  <Logo />
</Center>
```

### useTheme

```tsx title="src/components/main/index.tsx"
import React from "react";
import { useTheme } from "@chakra-ui/react";

export const Main: React.FC = () => {
  const theme = useTheme();
  return (
    <h1 style={{ fontSize: theme.fontSizes["5xl"] }}>superplate</h1>
  );
};
```
### Responsive Styles
Chakra UI supports responsive styles out of the box. Instead of manually adding @media queries and adding nested styles throughout your code, Chakra UI allows you provide object and array values to add mobile-first responsive styles.

```js
<Text fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
  This is responsive text
</Text>
```

:::note
Chakra UI uses the min-width media query for responsive design.  
:::

[Refer to official documentation on responsive styles for detailed usage. &#8594](https://chakra-ui.com/docs/features/responsive-styles)


## Adding Chakra UI to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- Install `@chakra-ui/react` and its dependencies.

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
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```
  </TabItem>
  <TabItem value="yarn">

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```          
  </TabItem>
</Tabs>

- [Follow instructions beginning in Setup Provider](#setup-provider)

[Refer to official documentation on installation for detailed usage. &#8594](https://chakra-ui.com/docs/getting-started#installation)