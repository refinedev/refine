---
id: router-provider
title: Router Provider
---

**refine** needs some router functions to create resource pages, navigate, etc. This provider allows you to use the router library you want.

A router provider must include following methods:

```tsx
const routerProvider = {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBach: (...args) => any,
    },
    useLocation: () => {
        pathname: string,
        search: string,
    },
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps*>,
    Link: React.FC<any>,
    RouterComponent?: React.FC<any>,
};
```

> `*`: Too see &#8594 [`<PromptProps>`](/api-references/interfaces.md#promptprops)

:::info

**refine** includes many out-of-the-box router providers to use in your projects like

-   [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router)
-   [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router)

:::

:::tip

We do not recommend creating this provider unless you do not need any customization on the router. Instead, you can use [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router) for your [Next.js](https://nextjs.org/) app and [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router) for your [react](https://en.reactjs.org/) app.

:::

## Usage

To activate router provider in **refine**, we have to pass the `routerProvider` to the `<Refine />` component.

### `react-router`

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```

### `nextjs-router`

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";

const App: React.FC = () => {
    return <Refine routerProvider={routerProvider} />;
};
```
