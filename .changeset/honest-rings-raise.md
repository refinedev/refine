---
"@refinedev/nextjs-router": major
---

With this version, the @refinedev/nextjs-router package now starts supporting Next.js@14 and App Router by default. You can upgrade your application by following the upgrade guide.

We recommend that projects using **Ant Design** refrain from upgrading at the moment due to the **incompatibility** between Ant Design and Next.js App Router. For more detailed information, you can refer to the Known Issues document in Ant Design [here](https://refine.dev/docs/ui-integrations/ant-design/introduction/#known-issues).

# Upgrade Guide

```bash
npm i next@14 @refinedev/nextjs-router@latest

Default export for `@refinedev/nextjs-router` is now `App Router` instead of `Pages`.

If you are using `Pages`, update your imports as follows:

```diff
- import routerProvider from "@refinedev/nextjs-router"
+ import routerProvider from "@refinedev/nextjs-router/pages"
```

If you are using `App Router`, update your imports as follows:

```diff
- import routerProvider from "@refinedev/nextjs-router/app"
+ import routerProvider from "@refinedev/nextjs-router"
```

### Dropped Refine v3 router provider legacy support

Now, `@refinedev/nextjs-router` only supports Refine v4 router provider.

The following exports are removed:

```diff
- @refinedev/nextjs-router/legacy
- @refinedev/nextjs-router/legacy-app
- @refinedev/nextjs-router/legacy-pages
```
