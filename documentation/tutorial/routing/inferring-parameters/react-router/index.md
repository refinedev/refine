---
title: Inferring Parameters
---

import { Sandpack, AddInferenceToEditProduct, AddInferenceToCreateProduct, AddInferenceToShowProduct, AddInferenceToListProducts } from "./sandpack.tsx";

<Sandpack>

Now we've set up our routes and resources, we'll be updating components to benefit from the parameter inference of Refine.

Refine when integrated with a router provider, infers the parameters from the route definitions and uses them in its hooks and components. This way, you don't need to pass the `resource`, `id` and `action` parameters to the hooks and components manually.

:::tip

You can always pass the parameters manually if you want to override the inferred parameters.

:::

## Updating the `ListProducts` Component

Let's update our `<ListProducts />` component and omit the `resource` parameter from the `useTable` hook.

Try to update your `src/list-products.tsx` file with the following lines:

```tsx title="src/list-products.tsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // removed-line
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  /* ... */
};
```

<AddInferenceToListProducts />

## Updating the `ShowProduct` Component

Let's update our `<ShowProduct />` component and omit the `resource` and `id` parameters. Remember that previously we've hard-coded the `id` parameter. Now we'll be letting Refine to infer the `id` parameter from the route definition and dynamically fetch the product.

We'll also switch from `useOne` hook to `useShow` hook. The `useShow` hook is a wrapper around the `useOne` hook and provides inference abilities unlike the `useOne` hook which requires the `resource` and `id` parameters to be passed explicitly.

Try to update your `src/show-product.tsx` file with the following lines:

```tsx title="src/show-product.tsx"
// highlight-next-line
import { useShow } from "@refinedev/core";

export const ShowProduct = () => {
  // removed-line
  const { data, isLoading } = useOne({ resource: "products", id: 123 });
  // added-line
  const { queryResult } = useShow();

  /* ... */
};
```

<AddInferenceToShowProduct />

## Updating the `EditProduct` Component

Let's update our `<EditProduct />` component and omit the `resource`, `action` and `id` parameters from the `useForm` hook. Just like the `<ShowProduct />` component, we'll be letting Refine to infer the `id` parameter from the route definition. Since we've defined the `edit` action in our resource definition, Refine will also infer the `action` parameter as `edit`.

Try to update your `src/edit-product.tsx` file with the following lines:

```tsx title="src/edit-product.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  // removed-line
  const { onFinish, mutationResult, queryResult } = useForm({
    // removed-line
    action: "edit",
    // removed-line
    resource: "products",
    // removed-line
    id: "123",
    // removed-line
  });
  // added-line
  const { onFinish, mutationResult, queryResult } = useForm();

  /* ... */
};
```

<AddInferenceToEditProduct />

## Updating the `CreateProduct` Component

Let's update our `<CreateProduct />` component and omit the `resource` and `action` parameters from the `useForm` hook. Since we've defined the `create` action in our resource definition, Refine will also infer the `action` parameter as `create`.

Try to update your `src/create-product.tsx` file with the following lines:

```tsx title="src/create-product.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  // removed-line
  const { onFinish, mutationResult } = useForm({
    // removed-line
    action: "create",
    // removed-line
    resource: "products",
    // removed-line
  });
  // added-line
  const { onFinish, mutationResult } = useForm();

  /* ... */
};
```

<AddInferenceToCreateProduct />

Now you should be able to see that our components are working as expected. We've successfully updated our components to benefit from the parameter inference of Refine.

In the next step, we'll be learning about the navigation helpers of Refine and how to use them.

</Sandpack>
