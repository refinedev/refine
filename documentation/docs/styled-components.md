---
id: styled-components
title: styled-components
sidebar_label: styled-components
description: How to use styled-components with Next.js?
---

styled-components allows you to add styles to your application that are written with a mixture of JavaScript and CSS using a technique called CSS-in-JS.

Helps keep the concerns of styling and element architecture separated and make components more readable without worrying about class name collisions.

 Example implementation shown below.

```ts title="components/header/styled.ts"
import styled from 'styled-components'

const Container = styled.div<{isLarge: boolean}>`
  padding: "50px";
  font-size: ${({ isLarge }) => (isLarge ? "36px" : "18px")};
`;

const Title = styled.div`
  margin-right: 50px;
  color: ${({ theme }) => theme.colors.cancelRed};
`;

const Subtitle = styled(Title)`
  margin-right: 30px;
`;
```



```jsx title="components/header/index.tsx"
import React from "react";

import { Container, Title, Information } from "./styled";

export const Header: React.FC = () => {
  return (
    <Container isLarge>
      <Title />
      <Subtitle />
    </Container>
  );
};
```


### Adapting based on props
Props can be passed to styled components to customize a component dynamically.
When setting the isLarge prop to true, we are swapping out its font-size.
```jsx 
const Container = styled.div<{isLarge: boolean}>`
  padding: "50px";
  font-size: ${({ isLarge }) => (isLarge ? "36px" : "18px")};
`;
```
### Extending Styles
You can extend components with style if you want to create a similar one, styled slightly differently.
To easily make a new component that inherits the styling of another, just wrap it in the styled() constructor.
```jsx 
const Subtitle = styled(Title)`
  margin-right: 30px;
`;
```

### Theming

styled-components has full theming support by exporting a `<ThemeProvider>` wrapper component.
This component provides a theme to all components underneath itself via the context API. In the render tree all styled-components will have access to the provided theme.

A theme can also be passed down to a component using the `theme` prop.

```jsx 
const Title = styled.div`
  margin-right: 50px;
  color: ${({ theme }) => theme.colors.darkGrey};
`; 
```

`theme` prop gets values from `definitions/styled-components` folder. You can add any css properties theme files in order to use from all styled-components.



### Dark Mode

Dark mode feature serving as a ready to use in created project with styled-component plugin.

You customize colors at  `definitions/styled-components` folder:

The first is `common.ts`, which will contain our base styling, and the others are dark.ts and light.ts, which will include variables for our dark and light themes.



```jsx title="definitions/styled-components/dark.ts"
const dark: DefaultTheme = {
  colors: {
    ...common.colors,
    body: "#363537",
    toggleBorder: "#556678",
    gradient: "linear-gradient(#091236, #1E215D)",
    background: "#808080",
    textColor: "#FFFFFF",
  },
};
```

```jsx title="definitions/styled-components/light.ts"
const light: DefaultTheme = {
  colors: {
    ...common.colors,
    body: "#E2E2E2",
    toggleBorder: "#ABB7C4",
    gradient: "linear-gradient(#39598A, #79D7ED)",
    background: "#FFFFFF",
    textColor: "#000000",
  },
};
```


Set the colors with same key value at both file and then use with theme props in styled components. Defined colors changes when invoke toggle function from `definitions/styled-components/index.ts`. 

```jsx title="components/Header/styled.ts"
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.body};
`;
```

<br/>

:::note
All needed dark mode configurations and files adds by CLI if styled-component plugin selected as CSS Preprocessor during project creation phase.
:::




## Styled System



Styled System is a collection of utility functions that add style props to your components and allows you to control styles based on a global theme object with typographic scales, colors, and layout properties.

:::tip

We are serving [styled-system](https://styled-system.com/) as a optional plugin with styled-components. 

:::

Example usage:

```jsx title="styledSystemExample/styled.ts"
import styled from "styled-components";
import { border, color, layout, space, typography } from "styled-system";

export const Card = styled.div`
  ${border}
  ${color}
  ${layout}
  ${space}
`;
```

```jsx title="styledSystemExample/index.ts"
import React from "react";
import { Card } from "./styled";

export const StyledSystemExample: React.FC = () => {
  return (
    <Card bg="wheat" maxWidth="20rem" borderRadius={10} mx="auto" mt="32px">
  );
};
```
<br/>

## How to add styled-components to existing Next.js project?

We recommend to check official [Next.js example](https://github.com/vercel/next.js/tree/master/examples/with-styled-components) to integrate styled-component to your existing project.