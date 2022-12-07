---
"@pankod/refine-nextjs-router": minor
---

- Bumped Next.js to 13
- Added support for experimental `appDir` option in `next.config.js` to allow for the latest Next.js features.


## `pages` directory

Current support for `pages` directory has not changed and will continue to work as before. It will be supported as long as `Next.js` continues to support and prompts it as the stable way of working with `Next.js`.

## `appDir` option

`appDir` option is a new experimental feature in `Next.js` that introduces a bunch of new features. It is currently in beta and is not stable. It is not recommended to use it in production. But can be used alongside the current `pages` directory support.

To use `appDir` option, you need to add it to your `next.config.js` file.

```js
// next.config.js
module.exports = {
    /* ... */
    experimental: {
        appDir: true,
    },
};
```

## Using `appDir` with **refine**

We've needed to make some changes to the `@pankod/refine-nextjs-router` to make it work with the current structure of the `app` directory feature. To make sure these do not break the current support for `pages` directory, we've added a new exports at the sub path `@pankod/refine-nextjs-router/app` that can be used with the `appDir` option.

**Note**

To make optional catch-all routes to work with the `app` directory, you need to define them as directories unlike the option of defining them as files with `pages` directory.

You need to use `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `NextRouteComponent` from `@pankod/refine-nextjs-router` when using `appDir` option.

Inside your `layout` file, you need to bind `params` to `routerProvider` to make sure `@pankod/refine-nextjs-router` can work properly with the new structure.

```tsx
// app/[[...refine]]/layout.tsx
"use client";

import routerProvider from "@pankod/refine-nextjs-router/app";

const Layout = ({ children, params }) => {
    return (
        <Refine
            routerProvider={routerProvider.apply({ params })}
            /* ... */
        >
            {children}
        </Refine>
    );
};
```

**Warning**

Please note that, unlike the `routerProvider` from the `@pankod/refine-nextjs-router`, `routerProvider` from `@pankod/refine-nextjs-router/app` is a function and you need to bind `params` to make it work properly.

```tsx
// app/[[...refine]]/page.tsx

"use client";

import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

export default NextRouteComponent;

```

**Warning**

You need to add `"use client";` directive to both `layout.tsx` and `page.tsx` inside `app/[[...refine]]` directory.

**Warning**

`checkAuthentication` does not work with `appDir`. We're aiming to release a substitute for it using middleware but for now its not included in this release.