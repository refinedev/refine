---
"@refinedev/nextjs-router": major
---

Now Refine v4 uses App Dir by default!

# Upgrade Guide

See [Next.js 14 Upgrade Guide](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14) and [Next.js 14 Codemods](https://nextjs.org/docs/pages/building-your-application/upgrading/codemods#nextjs-codemods) for more information.

```bash
npm i next@14 @refinedev/nextjs-router@latest
```

### Changes to default export

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
