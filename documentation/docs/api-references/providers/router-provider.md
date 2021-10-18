---
id: router-provider
title: Router Provider
---

**refine** needs some router functions to create resource pages, navigate, etc. This provider allows you to use the router library you want.

A router provider must include following methods:

```tsx
const routerProvider = {
    useHistory: () => any,
    useLocation: <S = any>() => any,
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,
    Prompt: React.FC<PromptProps>,
    Link: any,
    RouterComponent?: React.FC,
};
```

:::info

**refine** includes many out-of-the-box router providers to use in your projects like

-   [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router)
-   [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router)

:::

:::tip

We do not recommend creating this provider unless you do not need any customization on the router. Instead, you can use [nextjs-router](https://github.com/pankod/refine/tree/alpha/packages/nextjs-router) for your [Next.js](https://nextjs.org/) app and [react-router](https://github.com/pankod/refine/tree/alpha/packages/react-router) for your [react](https://en.reactjs.org/) app.

:::
