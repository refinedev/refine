---
"@refinedev/nextjs-router": major
---

With this version, the `@refinedev/nextjs-router` package now starts supporting Next.js@14 and App Router by default. You can upgrade your application by following the upgrade guide.

We recommend that projects using **Ant Design** refrain from upgrading at the moment due to the **incompatibility** between Ant Design and **Next.js 14 Pages Router**. For more detailed information, you can refer to the Known Issues document in Ant Design [here](https://refine.dev/docs/ui-integrations/ant-design/introduction/#known-issues).

# Upgrade Guide

```bash
npm i next@14 @refinedev/nextjs-router@latest
```

See [Next.js 14 Upgrade Guide](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14) and [Next.js 14 Codemods](https://nextjs.org/docs/pages/building-your-application/upgrading/codemods#nextjs-codemods) for more information.

### Changes to default export

Default export for `@refinedev/nextjs-router` is now `App Router` instead of `Pages`.

If you are using `Pages`, update your imports as follows:

```diff
- import routerProvider from "@refinedev/nextjs-router";
+ import routerProvider from "@refinedev/nextjs-router/pages";
```

If you are using `App Router`, update your imports as follows:

```diff
- import routerProvider from "@refinedev/nextjs-router/app";
+ import routerProvider from "@refinedev/nextjs-router";
```

### Changes to `parseTableParams` import

If you will use `parseTableParams` on **client side** for **App Router**, you can use the following import:

```tsx
import { parseTableParams } from "@refinedev/nextjs-router";
```

`parseTableParams` from `@refinedev/nextjs-router` has `"use client"` directive.

If you want to use `parseTableParams` on **server side** for **App Router**, you can use the following import:

```tsx
import parseTableParams from "@refinedev/nextjs-router/parse-table-params";
```

`parseTableParams` from `@refinedev/nextjs-router/parse-table-params` doesn't have `"use client"` directive.

### Dropped Refine v3 router provider legacy support

Now, `@refinedev/nextjs-router` only supports Refine v4 router provider.

The following exports are removed:

```diff
- @refinedev/nextjs-router/legacy
- @refinedev/nextjs-router/legacy-app
- @refinedev/nextjs-router/legacy-pages
```
