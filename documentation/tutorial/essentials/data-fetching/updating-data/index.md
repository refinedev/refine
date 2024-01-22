---
title: Updating a Record
---

import { Sandpack, AddUpdateMethod, CreateEditProductFile, AddUseUpdateToEditProduct, AddEditProductToAppTsx } from "./sandpack.tsx";

<Sandpack>

In this chapter, we'll be learning about the Refine's `useUpdate` hook to update a record from our API and implement the `update` method in our data provider.

## Implementing the `update` Method

To update a record using Refine's hooks, first we need to implement the `update` method in our data provider. This method will be called when we use the `useUpdate` hook or its extensions in our components.

The `update` method will receive `resource`, `id`, `variables` and `meta` properties. `resource` will be the name of the entity we're updating. `id` will be the id of the record we're updating. `variables` will be an object containing the data we're sending to the API. `meta` will be an object containing any additional data we're passing to the hook.

`products` entity of our fake API expects us to update a record using the `/products/:id` endpoint with a `PATCH` request. So, we'll be using the `resource`, `id` and `variables` properties to make our request.

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    const data = await response.json();

    return { data };
  },
  // highlight-start
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data };
  },
  // highlight-end
  getList: () => {
    throw new Error("Not implemented");
  },
  /* ... */
};
```

<AddUpdateMethod />

## Using the `useUpdate` Hook

After implementing the `update` method, we'll be able to call `useUpdate` hook and fetch a single record from our API. Let's create a component called `EditProduct` and mount it inside our `<Refine />` component. Then, we'll use the `useUpdate` hook inside our `EditProduct` to update a single record of `products` entity from our API.

<CreateEditProductFile />

Initially, we'll include a `useOne` hook call in our `EditProduct` component to fetch the record we want to update. Then, we'll use the `useUpdate` hook to update the record.

Try to add the following lines to your `src/edit-product.tsx` file:

```tsx title="src/edit-product.tsx"
// highlight-next-line
import { useOne, useUpdate } from "@refinedev/core";

export const EditProduct = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 123 });
  // highlight-next-line
  const { mutate, isLoading: isUpdating } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    // highlight-start
    await mutate({
      resource: "products",
      id: 123,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
    // highlight-end
  };

  return (
    <div>
      <div>Product name: {data?.data.name}</div>
      <div>Product price: ${data?.data.price}</div>
      <button onClick={updatePrice}>Update Price</button>
    </div>
  );
};
```

<AddUseUpdateToEditProduct />

Finally, we'll mount our `EditProduct` component inside our `<Refine />` component.

Try to add the following lines to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

import { ShowProduct } from "./show-product";
// highlight-next-line
import { EditProduct } from "./edit-product";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* highlight-next-line */}
      <EditProduct />
    </Refine>
  );
}
```

<AddEditProductToAppTsx />

We should be able to see the product name and price on our screen now. When we click the `Update Price` button, we'll be able to see the price of the product is updated.

:::tip Smart Invalidations

Notice that when we update the price using `useUpdate`, the `useOne` hook we called before is automatically invalidated. This is because Refine will invalidate all the queries that are using the same resource and id when we update a record. This will ensure that we'll always see the latest data on our screen and we won't need to manually invalidate the queries.

:::

In the next chapter, we'll be learning about the Refine's `useList` hook to fetch a list of records from our API and implement the `getList` method in our data provider.

</Sandpack>
