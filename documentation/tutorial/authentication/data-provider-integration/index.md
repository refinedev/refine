---
title: Data Provider Integration
---

import { Sandpack, AddAuthenticationToDataProvider, AddProtectedProductsResourceToListProducts, AddOnErrorMethodToAuthProvider, AddTokenExpirationToAuthProviderLoginMethod } from "./sandpack.tsx";

<Sandpack>

Now that we've implemented the authentication logic, we'll be integrating it with our data provider to protect our resources from unauthenticated users.

We've obtained the `token` from our API and stored it in the `localStorage` in the previous steps. Now, we'll be adding the `Authorization` header to our requests to our API.

We'll also be learning about the `onError` method of the auth provider to handle the errors thrown from the data providers related to authentication.

## Adding the `Authorization` Header

Our fake REST API has some resources that require authentication to access them. Authentication will be done by sending the `token` in the `Authorization` header.

Let's replace our data provider's `fetch` with a custom wrapper that adds the `Authorization` header to the requests. This way, we'll be able to protect our resources from unauthenticated users and handle this step in a single place.

Try to add the following lines to your `src/data-provider.ts` file:

```ts title="src/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const fetcher = async (url: string, options?: RequestInit) => {
    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: localStorage.getItem("my_access_token"),
        },
    });
};
// highlight-end

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    // highlight-next-line
    const response = await fetcher(\`\${API_URL}/\${resource}?\${params.toString()}\`);

    if (response.status !== 200) throw response;

    const data = await response.json();

    const total = Number(response.headers.get("x-total-count"));

    return {
        data,
        total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    // highlight-next-line
    const response = await fetcher(
      \`\${API_URL}/\${resource}?\${params.toString()}\`,
    );

    if (response.status !== 200) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    // highlight-next-line
    const response = await fetcher(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status !== 200) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    // highlight-next-line
    const response = await fetcher(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    // highlight-next-line
    const response = await fetcher(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) throw response;

    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

<AddAuthenticationToDataProvider />

## Using a Restricted Resource

Our fake REST API also has a resource called `protected-products` that is same as the `products` resource, but requires authentication to access it for demonstration purposes.

Let's switch to using `protected-resources` in our `<ListProducts />` component.

Try to add the following lines to your `src/list-products.tsx` file:

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
    // highlight-next-line
    resource: "protected-products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    /* ... */
  };
  const onNext = () => {
    /* ... */
  };
  const onPage = (page: number) => {
    /* ... */
  };
  const getSorter = (field: string) => {
    /* ... */
  };
  const onSort = (field: string) => {
    /* ... */
  };

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return <div>{/* ... */}</div>;
};
```

<AddProtectedProductsResourceToListProducts />

## Handling Authentication Errors

When we try to access a protected resource without authentication, our API will return a `401 Unauthorized` error. We'll be handling this error in our auth provider's `onError` method.

`onError` will be called by the Refine's data hooks automatically when an error is thrown from the data provider. This method does not need to handle all errors, only the ones related to authentication.

By using `onError` method, we'll be able to handle cases such as expired and invalid tokens and trigger a logout operation.

Let's add the `onError` method to our auth provider and handle the `401 Unauthorized` error.

Try to add the following lines to your `src/auth-provider.ts` file:

```ts title="src/auth-provider.ts"
// TODO: change this
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  onError: async (error) => {
    if (error?.statusCode === 401) {
      return {
        logout: true,
        error: { message: "Unauthorized" },
      };
    }

    return {};
  },
  // highlight-end
  getIdentity: async () => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  // ...
};
```

<AddOnErrorMethodToAuthProvider />

## Handling Token Expiration

Now we're handling the 401 errors, for demonstration purposes, we'll be setting a short period of time for the token expiration.

Our fake REST API allows us to send a query parameter called `expires` to `/auth/login` endpoint to set the expiration time of the token in seconds.

Let's update our `login` method and set the expiration time to 15 seconds. This will allow us to demonstrate the `onError` method in action. After 15 seconds, the token will expire and any requests to the data provider will throw a 401 error.

:::info

This step is only for demonstration purposes of a real-world scenario. In a real-world scenario, the expiration time probably won't be determined by the client.

:::

Try to add the following lines to your `src/auth-provider.ts` file:

```ts title="src/auth-provider.ts"
// TODO: change this
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  onError: async (error) => {
    /* ... */
  },
  getIdentity: async () => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    const response = await fetch(
      // highlight-next-line
      "https://api.fake-rest.refine.dev/auth/login?expires=15",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true };
    }

    return { success: false };
  },
  check: async () => {
    /* ... */
  },
  // ...
};
```

<AddTokenExpirationToAuthProviderLoginMethod />

Now, after we log in, we should be able to see the products list. After 15 seconds, the token will expire and we'll be logged out automatically.

In the next step, we'll be learning about the `<AuthPage />` components and how to use them.

</Sandpack>
