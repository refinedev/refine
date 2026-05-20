---
title: Navigation
---

import {
  Sandpack,
  AddLinksToHeader,
  AddShowAndEditButtonsToListProducts,
} from "./sandpack.tsx";

<Sandpack>

With the resource definitions in place, navigation becomes mostly resource-driven.

We’ll use:

- `useNavigation` from `@refinedev/core` to generate action URLs
- TanStack Router’s `<Link />` component for semantic links in the UI

Example:

```tsx title="src/components/header.tsx"
const { listUrl, createUrl } = useNavigation();

<Link to={listUrl("protected-products")}>List Products</Link>
<Link to={createUrl("protected-products")}>Create Product</Link>
```

And on the list page:

```tsx title="src/pages/products/list.tsx"
const { showUrl, editUrl } = useNavigation();

<Link to={showUrl("protected-products", product.id)}>Show</Link>
<Link to={editUrl("protected-products", product.id)}>Edit</Link>
```

<AddLinksToHeader />

<AddShowAndEditButtonsToListProducts />

In the next step we’ll stop passing `resource`, `action`, and `id` manually and let Refine infer them from the current route.

</Sandpack>
