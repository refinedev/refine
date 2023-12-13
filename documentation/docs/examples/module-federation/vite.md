---
id: vite
title: Module Federation
example-title: Module Federation
example-tags: [module-federation]
---

Module federation is concept which get different builds to come together to make one application. So in most cases one will be the host application which will bring all other remote components that are built to be shared.

This example demonstrates how to integrate Refine with Vite's module federation.

In this example, we have 3 apps:

- `host`: The host application which puts all other remote components and auth logic together.
- `blog-posts`: Application which exports pages related to blog posts.
- `categories`: Application which exports pages related to categories.

Usage:

```
npm create refine-app@latest -- --example monorepo-module-federation

cd monorepo-module-federation

npm i

cd host

npm run build && npm run preview

cd ../blog-posts

npm run build && npm run preview

cd ../categories

npm run build && npm run preview
```

:::caution

`dev` mode is only supported for `host` app, but not for sub apps. This is because Vite does not support module federation in dev mode yet.

So when you made changes in sub apps, you need to rebuild and restart the app(s).

https://github.com/originjs/vite-plugin-federation#vite-dev-mode

:::

If you are using a library which requires shared context (ie: ColorContextProvider for antd), make sure you are updating `vite.config.ts` by adding relevant package(s) to `shared` array.

You need to do this for both `host` and sub apps which will consume shared context.

https://github.com/refinedev/refine/blob/master/examples/monorepo-module-federation/apps/host/vite.config.ts#L36

<CodeSandboxExample path="monorepo-module-federation" hideSandbox />

References:

- https://originjs.org/en/guide/plugins/vite-plugin-federation/#installation
- https://nipunamarcus.medium.com/micro-frontend-module-federation-with-vite-for-react-d2a8edad7f14
