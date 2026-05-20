---
title: Defining Resources
---

import { Sandpack, AddRoutesToApp, AddResourcesToApp } from "./sandpack.tsx";

<Sandpack>

Now we can define the route tree for our product pages and tell Refine which resource actions those routes represent.

## Creating Routes

The TanStack Router route tree mirrors the screens we already have:

- `/products`
- `/products/$id`
- `/products/$id/edit`
- `/products/create`

We also keep a root redirect from `/` to the product list and a separate `/login` route.

<AddRoutesToApp />

## Registering Resources

After the route tree exists, add the `resources` prop to `<Refine />`:

```tsx title="src/App.tsx"
resources={[
  {
    name: "protected-products",
    list: "/products",
    show: "/products/:id",
    edit: "/products/:id/edit",
    create: "/products/create",
    meta: { label: "Products" },
  },
]}
```

This mapping enables:

- automatic navigation with `useNavigation`, `useGo`, and `NavigateToResource`
- resource/action inference from the current location
- action-aware redirects after form mutations and auth checks

For the root redirect we also switch to `NavigateToResource`, which is Refine’s resource-aware redirect helper.

<AddResourcesToApp />

With routes and resources aligned, Refine can now infer the current resource and action directly from the TanStack Router URL.

</Sandpack>
