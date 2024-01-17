---
title: Listing Records
---

import { Sandpack, AddGetListMethod, CreateListProductsFile, AddUseListToListProducts, AddListProductsToAppTsx, AddPaginationToGetList, AddPaginationToListProducts, AddSortingToGetList, AddSortingToListProducts, AddFiltersToGetList, AddFiltersToListProducts } from "./sandpack.tsx";

<Sandpack>

In this chapter, we'll be learning about the Refine's `useList` hook to fetch a list of records from our API. We'll also learn about pagination, sorting and filtering through the `useList` hook.

## Implementing the `getList` Method

To list records using Refine's hooks, first we need to implement the `getList` method in our data provider. This method will be called when we use the `useList` hook or its extensions in our components.

The `getList` method will receive `resource`, `pagination`, `sorters`, `filters` and `meta` properties. `resource` will be the name of the entity we're listing. `pagination` will be an object containing the `current` and `pageSize` properties. `sorters` will be an array containing the sorters we're using. `filters` will be an array containing the filters we're using. `meta` will be an object containing any additional data we're passing to the hook.

Our fake API has `products` entity and expects us to list records using the `/products` endpoint. So, we'll be using the `resource`, `pagination`, `sorters` and `filters` properties to make our request.

To make the implementation process easier, first we'll be implementing the `getList` method without pagination, sorting and filtering. Then, we'll be adding pagination, sorting and filtering to our implementation.

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-start
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(`${API_URL}/${resource}`);
    const data = await response.json();

    return { data };
  },
  // highlight-end
  /* ... */
};
```

If you're having hard time updating file, <AddGetListMethod>Click to update the file</AddGetListMethod>.

## Using the `useList` Hook

After implementing the `getList` method, we'll be able to call `useList` hook and fetch a list of records from our API. Let's create a component called `ListProducts` and mount it inside our `<Refine />` component. Then, we'll use the `useList` hook inside our `ListProducts` to fetch a list of records of `products` entity from our API.

<CreateListProductsFile>

Create `/list-products.tsx`

</CreateListProductsFile>

Try to add the following lines to your `src/list-products.tsx` file:

```tsx title="src/list-products.tsx"
// highlight-next-line
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({ resource: "products" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

If you're having hard time updating file, <AddUseListToListProducts>Click to update the file</AddUseListToListProducts>.

Finally, we'll mount our `ListProducts` component inside our `<Refine />` component.

Try to add the following lines to your `src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./data-provider";

import { ShowProduct } from "./show-product";
import { EditProduct } from "./edit-product";
// highlight-next-line
import { ListProducts } from "./list-products";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* highlight-next-line */}
      <ListProducts />
    </Refine>
  );
}
```

If you're having hard time updating file, <AddListProductsToAppTsx>Click to update the file</AddListProductsToAppTsx>.

We should be able to see the list of products on our screen now.

## Adding Pagination

Now we've listed all the products in our API. But, we're not able to paginate the list. Let's add pagination logic to our `getList` method.

Our fake API supports pagination through the `_start` and `_end` query parameters. `_start` is the index of the first record we want to fetch and `_end` is the index of the last record we want to fetch. So, we'll be using the `pagination` property to calculate the `_start` and `_end` query parameters.

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // highlight-start
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    // highlight-end
    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

If you're having hard time updating file, <AddPaginationToGetList>Click to update the file</AddPaginationToGetList>.

Now, we'll be able to paginate the list of products. Let's add pagination to our `ListProducts` component.

Try to add the following lines to your `src/list-products.tsx` file:

```tsx title="src/list-products.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    // highlight-next-line
    pagination: { current: 1, pageSize: 10 },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

If you're having hard time updating file, <AddPaginationToListProducts>Click to update the file</AddPaginationToListProducts>.

We should be able to see the first 10 products on our screen now.

## Adding Sorting

We've added pagination to our `getList` method. But, we're not able to sort the list. Let's add sorting logic to our `getList` method.

Our fake API supports sorting through the `_sort` and `_order` query parameters. `_sort` is the name of the field we want to sort and `_order` is the order we want to sort. So, we'll be using the `sorters` property to calculate the `_sort` and `_order` query parameters.

:::simple Implementation Details

Even though Refine and our fake API supports sorting through multiple fields, we'll be implementing sorting through a single field for simplicity.

:::

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    // highlight-start
    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters[0].field);
      params.append("_order", sorters[0].order);
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

If you're having hard time updating file, <AddSortingToGetList>Click to update the file</AddSortingToGetList>.

Now, we'll be able to sort the list of products. Let's add sorting to our `ListProducts` component.

Try to add the following lines to your `src/list-products.tsx` file:

```tsx title="src/list-products.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    // highlight-next-line
    sorters: [{ field: "name", order: "asc" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

If you're having hard time updating file, <AddSortingToListProducts>Click to update the file</AddSortingToListProducts>.

We should be able to see the first 10 products sorted by name on our screen now.

## Adding Filtering

We've added sorting to our `getList` method. But, we're not able to filter the list. Let's add filtering logic to our `getList` method.

`useList`'s `filters` property implements the [`CrudFilters`](#) interface which accepts various operators for fields. To learn more about the operators, you can check the [Filters](#) section of the Data Fetching guide.

Our fake API supports filtering multiple fields with various operators but for sake of simplicity, we'll be implementing filtering through a single field with `"eq"` operator.

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters[0].field);
      params.append("_order", sorters[0].order);
    }

    // highlight-start
    if (filters && filters.length > 0) {
      if (filters[0].operator === "eq") {
        // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
        params.append(filters[0].field, filters[0].value);
      }
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

If you're having hard time updating file, <AddFiltersToGetList>Click to update the file</AddFiltersToGetList>.

Now, we'll be able to filter the list of products. Let's add filtering to our `ListProducts` component.

Try to add the following lines to your `src/list-products.tsx` file:

```tsx title="src/list-products.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    // highlight-next-line
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

If you're having hard time updating file, <AddFiltersToListProducts>Click to update the file</AddFiltersToListProducts>.

## Summary

In this chapter, we've learned about the Refine's `useList` hook to fetch a list of records from our API. We've also learned about pagination, sorting and filtering through the `useList` hook.

Refine also offers `useInfiniteList` hook to fetch a list of records with infinite scrolling and `useTable` hook to fetch a list of records with additional features on top of `useList` hook. You can check the [Hooks](#) section of the Data Fetching guide and [Tables](#) guide to learn more about these hooks and their usages.

In the next chapters, we'll learn about how to handle forms and tables with Refine.

</Sandpack>
