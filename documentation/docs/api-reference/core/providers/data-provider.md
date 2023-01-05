---
id: data-provider
title: Data Provider
sidebar_label: Data Provider
---


## Overview

A data provider is the place where a refine app communicates with an API.
Data providers also act as adapters for refine making it possible to consume different API's and data services conveniently.
A data provider makes **HTTP** requests and returns response data back using predefined methods.

A data provider must include following methods:

```tsx
const dataProvider = {
    create: ({ resource, variables, metaData }) => Promise,
    createMany: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, variables, metaData }) => Promise,
    deleteMany: ({ resource, ids, variables, metaData }) => Promise,
    getList: ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        metaData,
    }) => Promise,
    getMany: ({ resource, ids, metaData }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    updateMany: ({ resource, ids, variables, metaData }) => Promise,
    custom: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) => Promise,
    getApiUrl: () => "",
};
```

:::tip

**refine** includes many out-of-the-box data providers to use in your projects like

-   [Simple REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest)
-   [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql)
-   [NestJS CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud)
-   [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable)
-   [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql)
-   [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase)
-   [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura)
-   [Nhost](https://github.com/refinedev/refine/tree/master/packages/nhost)
-   [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite)
-   [Medusa](https://github.com/refinedev/refine/tree/master/packages/medusa)
-   [Altogic](https://github.com/refinedev/refine/tree/master/packages/altogic)

### Community ❤️

-   [Firebase](https://github.com/resulturan/refine-firebase) by [rturan29](https://github.com/resulturan)
-   [Directus](https://github.com/tspvivek/refine-directus) by [tspvivek](https://github.com/tspvivek)
-   [Elide](https://github.com/chirdeeptomar/refine-elide-rest) by [chirdeeptomar](https://github.com/chirdeeptomar)

:::

<br/>

:::caution
**refine** consumes these methods using [data hooks](/api-reference/core/hooks/data/useCreate.md).

Data hooks are used to operate CRUD actions like creating a new record, listing a resource or deleting a record, etc.

:::

:::note
Data hooks use [React Query](https://react-query.tanstack.com/) to manage data fetching. React Query handles important concerns like caching, invalidation, loading states, etc.

:::

<br/>
<br/>
<br/>

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/flow.png" />
</div>

<br/>
<br/>
<br/>

## Usage

To activate data provider in refine, we have to pass the `dataProvider` to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";

import dataProvider from "./dataProvider";

const App: React.FC = () => {
    return <Refine dataProvider={dataProvider} />;
};
```

:::tip

To activate multiple data provider in refine, we have to pass the default key with `dataProvider` for default data provider and we can pass other data provider with any key to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";

import defaultDataProvider from "./dataProvider";
import exampleDataProvider from "./dataProvider";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={{
                default: defaultDataProvider,
                example: exampleDataProvider,
            }}
        />
    );
};
```

:::

### Using Multiple Data Providers

**refine** gives you the ability to use multiple data providers in your app. All you need to do is to pass key, value pairs to the `dataProvider` prop of the `<Refine />` component in a form of value being the data provider and the key being the name of the data provider.

:::tip
`default` key is required for the default data provider and it will be used as the default data provider.
:::

```tsx title="App.tsx"
const App = () => {
    return (
        <Refine
            dataProvider={{
                default: defaultDataProvider,
                example: exampleDataProvider,
            }}
        />
    );
};
```

You can pick data providers in two ways:

**Using `dataProviderName` prop in the data hooks and all data related components/functions.**

```tsx title="posts/list.tsx"
const { tableProps } = useTable<IPost>({
    dataProviderName: "example",
});
```

**Using `options.dataProviderName` property in your resource config**

This will be the default data provider for the specified resource but you can still override it in the data hooks and components.

```tsx title="App.tsx"
const App = () => {
    return (
        <Refine
            dataProvider={{
                default: defaultDataProvider,
                example: exampleDataProvider,
            }}
        />
    );
};
```

**Example usage of multiple data providers**

```tsx live hideCode url=http://localhost:3000/posts previewHeight=420px
setRefineProps({ Sider: () => null });
// visible-block-start
import { Refine, useList } from "@pankod/refine-core";
import { Layout, Collapse, Tag } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const API_URL = "https://api.fake-rest.refine.dev";
const FINE_FOODS_API_URL = "https://api.finefoods.refine.dev";

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}

interface IProduct {
    id: number;
    name: string;
    price: number;
}

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            Layout={Layout}
            // highlight-start
            dataProvider={{
                default: dataProvider(API_URL),
                fineFoods: dataProvider(FINE_FOODS_API_URL),
            }}
            // highlight-end
            resources={[
                {
                    // highlight-next-line
                    // Refine will use the `default` data provider for this resource
                    name: "posts",
                    list: PostList,
                },
                {
                    name: "products",
                    options: {
                        // highlight-next-line
                        // Refine will use the `fineFoods` data provider for this resource
                        dataProviderName: "fineFoods",
                    }
                }
            ]}
        />
    )
}

const PostList: React.FC = () => {
    const { data: posts } = useList<IPost>({
        resource: "posts",
        // highlight-start
        // Data provider can be selected through props
        dataProviderName: "default"
        // highlight-end
    });
    // highlight-start
    // We've defined the data provider for this resource as "fineFoods" in its config so we don't need to pass it here
    const { data: products } = useList<IProduct>({ resource: "products" });
    // highlight-end

    console.log({
        posts, products
    })

    return (
        <Collapse defaultActiveKey={["products"]}>
            <Collapse.Panel header="Posts" key="posts">
                {posts?.data.map((post) => (
                    <div key={post.title} style={{ display: "flex", flexDirection: "row", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {post.title}
                        <Tag>{post.status}</Tag>
                    </div>
                ))}
            </Collapse.Panel>
            <Collapse.Panel header="Products" key="products">
                {products?.data.map((product) => (
                    <div key={product.name} style={{ display: "flex", flexDirection: "row", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {product.name}
                        <Tag>{product.price / 10}</Tag>
                    </div>
                ))}
            </Collapse.Panel>
        </Collapse>
    );
};
// visible-block-end

render(<App/>);
```

## Creating a data provider

We will build **"Simple REST Dataprovider"** of `@pankod/refine-simple-rest` from scratch to show the logic of how data provider methods interact with the API.

We will provide you a fully working, _fake REST API_ located at https://api.fake-rest.refine.dev. You may take a look at available [resources and routes of the API](https://api.fake-rest.refine.dev) before proceeding to the next step.
Our **"Simple REST Dataprovider"** will be consuming this _fake REST API_.

:::note
Fake REST API is based on [JSON Server Project](https://github.com/typicode/json-server). **Simple REST Dataprovider** is fully compatible with the REST rules and methods of the **JSON Server**.
:::

<br />

Let's build a method that returns our data provider:

```ts title="dataProvider.ts"
import axios, { AxiosInstance } from "axios";
import type { DataProvider } from "@pankod/refine-core";

const axiosInstance = axios.create();

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    create: ({ resource, variables, metaData }) => Promise,
    createMany?: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, variables, metaData }) => Promise,
    deleteMany?: ({ resource, ids, variables, metaData }) => Promise,
    getList: ({ resource, pagination, sort, filters, metaData }) => Promise,
    getMany?: ({ resource, ids, metaData }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    updateMany?: ({ resource, ids, variables, metaData }) => Promise,
    custom: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) => Promise,
    getApiUrl: () => "",
});
```

It will take the API URL as a parameter and an optional **HTTP** client. We will use **axios** as the default **HTTP** client.

:::note
    `getMany`, `createMany`, `updateMany` and `deleteMany` properties are optional. If you don't implement them, Refine will use `getOne`, `create`, `update` and `deleteOne` methods to handle multiple requests. If your API supports these methods, you can implement them to improve performance.
:::

<br/>

### `create`

This method allows us to create a single item in a resource.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, variables);

        return {
            data,
        };
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type         | Default |
| --------- | ------------ | ------- |
| resource  | `string`     |         |
| variables | `TVariables` | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useCreate`](../../core/hooks/data/useCreate.md#type-parameters) to type `variables`

<br/>

**refine** will consume this `create` method using the `useCreate` data hook.

```ts
import { useCreate } from "@pankod/refine-core";

const { mutate } = useCreate();

mutate({
    resource: "categories",
    values: {
        title: "New Category",
    },
});
```

> [Refer to the useCreate documentation for more information. &#8594](/api-reference/core/hooks/data/useCreate.md)

<br />

### `createMany`

This method allows us to create multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use `create` method to handle multiple requests.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    createMany: async ({ resource, variables }) => {
        const response = await httpClient.post(
            `${apiUrl}/${resource}/bulk`,
            { values: variables },
        );

        return response;
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type           | Default |
| --------- | -------------- | ------- |
| resource  | `string`       |         |
| variables | `TVariables[]` | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useCreateMany`](/api-reference/core/hooks/data/useCreateMany.md) to type `variables`

<br/>

**refine** will consume this `createMany` method using the `useCreateMany` data hook.

```ts
import { useCreateMany } from "@pankod/refine-core";

const { mutate } = useCreateMany();

mutate({
    resource: "categories",
    values: [
        {
            title: "New Category",
        },
        {
            title: "Another New Category",
        },
    ],
});
```

> [Refer to the useCreateMany documentation for more information. &#8594](/api-reference/core/hooks/data/useCreateMany.md)

<br />

### `deleteOne`

This method allows us to delete an item in a resource.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    deleteOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type               | Default |
| --------- | ------------------ | ------- |
| resource  | `string`           |         |
| id        | [BaseKey][basekey] |         |
| variables | `TVariables[]`     | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useDelete`](/api-reference/core/hooks/data/useDelete.md) to type `variables`

<br/>

**refine** will consume this `deleteOne` method using the `useDelete` data hook.

```ts
import { useDelete } from "@pankod/refine-core";

const { mutate } = useDelete();

mutate({ resource: "categories", id: "2" });
```

> [Refer to the useDelete documentation for more information. &#8594](/api-reference/core/hooks/data/useDelete.md)

<br />

### `deleteMany`

This method allows us to delete multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use `deleteOne` method to handle multiple requests.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    deleteMany: async ({ resource, ids }) => {
        const response = await httpClient.delete(
            `${apiUrl}/${resource}/bulk?ids=${ids.join(",")}`,
        );
        return response;
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type                 | Default |
| --------- | -------------------- | ------- |
| resource  | `string`             |         |
| ids       | [BaseKey[]][basekey] |         |
| variables | `TVariables[]`       | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useDeleteMany`](/api-reference/core/hooks/data/useDeleteMany.md) to type `variables`

<br/>

**refine** will consume this `deleteMany` method using the `useDeleteMany` data hook.

```ts
import { useDeleteMany } from "@pankod/refine-core";

const { mutate } = useDeleteMany();

mutate({
    resource: "categories",
    ids: ["2", "3"],
});
```

> [Refer to the useDeleteMany documentation for more information. &#8594](/api-reference/core/hooks/data/useDeleteMany.md)

<br />

### `update`

This method allows us to update an item in a resource.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, variables);

        return {
            data,
        };
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type               | Default |
| --------- | ------------------ | ------- |
| resource  | `string`           |         |
| id        | [BaseKey][basekey] |         |
| variables | `TVariables`       | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useUpdate`](../../core/hooks/data/useUpdate.md#type-parameters) to type `variables`

<br/>

**refine** will consume this `update` method using the `useUpdate` data hook.

```ts
import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate();

mutate({
    resource: "categories",
    id: "2",
    values: { title: "New Category Title" },
});
```

> [Refer to the useUpdate documentation for more information. &#8594](/api-reference/core/hooks/data/useUpdate.md)

<br />

### `updateMany`

This method allows us to update multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use `update` method to handle multiple requests.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    updateMany: async ({ resource, ids, variables }) => {
        const response = await httpClient.patch(
            `${apiUrl}/${resource}/bulk`,
            { ids, variables },
        );
        return response;
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name      | Type                 | Default |
| --------- | -------------------- | ------- |
| resource  | `string`             |         |
| ids       | [BaseKey[]][basekey] |         |
| variables | `TVariables`         | `{}`    |

> TVariables is a user defined type which can be passed to [`useUpdateMany`](../../core/hooks/data/useUpdateMany.md#type-parameters) to type `variables`

<br/>

**refine** will consume this `updateMany` method using the `useUpdateMany` data hook.

```ts
import { useUpdateMany } from "@pankod/refine-core";

const { mutate } = useUpdateMany();

mutate({
    resource: "posts",
    ids: ["1", "2"],
    values: { status: "draft" },
});
```

> [Refer to the useUpdateMany documentation for more information. &#8594](/api-reference/core/hooks/data/useUpdateMany.md)

<br />

### `getOne`

This method allows us to retrieve a single item in a resource.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },
// highlight-end
    ...
})
```

#### Parameter Types

| Name     | Type               | Default |
| -------- | ------------------ | ------- |
| resource | `string`           |         |
| id       | [BaseKey][basekey] |         |

<br/>

**refine** will consume this `getOne` method using the `useOne` data hook.

```ts
import { useOne } from "@pankod/refine-core";

const { data } = useOne<ICategory>({ resource: "categories", id: "1" });
```

> [Refer to the useOne documentation for more information. &#8594](/api-reference/core/hooks/data/useOne.md)

<br/>

### `getMany`

This method allows us to retrieve multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use `getOne` method to handle multiple requests.

```ts title="dataProvider.ts"
import { stringify } from "query-string";

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
// highlight-start
    getMany: async ({ resource, ids }) => {
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

        return {
            data,
        };
    },
// highlight-end
    ...
})
```

:::tip
We are using the [`query-string`](https://www.npmjs.com/package/query-string) package for `stringify`.
:::

#### Parameter Types

| Name     | Type                 | Default |
| -------- | -------------------- | ------- |
| resource | `string`             |         |
| ids      | [BaseKey[]][basekey] |         |

<br/>

**refine** will consume this `getMany` method using the `useMany` data hook.

```ts
import { useMany } from "@pankod/refine-core";

const { data } = useMany({ resource: "categories", ids: ["1", "2"] });
```

> [Refer to the useMany documentation for more information. &#8594](/api-reference/core/hooks/data/useMany.md)

<br />

### `getList`

This method allows us to retrieve a collection of items in a resource.

```tsx title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
// highlight-start
    getList: async ({ resource, hasPagination, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

        const { data, headers } = await httpClient.get(
            `${url}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },
// highlight-end
}
```

#### Parameter Types

| Name           | Type                                              |
| -------------- | ------------------------------------------------- |
| resource       | `string`                                          |
| hasPagination? | `boolean` _(defaults to `true`)_                  |
| pagination?    | [`Pagination`](/api-reference/core/interfaces.md#pagination);   |
| sort?          | [`CrudSorting`](/api-reference/core/interfaces.md#crudsorting); |
| filters?       | [`CrudFilters`](/api-reference/core/interfaces.md#crudfilters); |

<br/>

**refine** will consume this `getList` method using the `useList` data hook.

```ts
import { useList } from "@pankod/refine-core";

const { data } = useList({ resource: "posts" });
```

> [Refer to the useList documentation for more information. &#8594](/api-reference/core/hooks/data/useList.md)

<br />

**Adding pagination**

We will send start and end parameters to list a certain size of items.

```tsx title="dataProvider.ts"
// highlight-next-line
import { stringify } from "query-string";

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
// highlight-next-line
    getList: async ({ resource, hasPagination = true, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

// highlight-start
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;
// highlight-end

// highlight-start
        const query = hasPagination ? {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        } : {};
// highlight-end

        const { data, headers } = await httpClient.get(
// highlight-next-line
            `${url}?${stringify(query)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },
```

<br />

```ts
import { useList } from "@pankod/refine-core";

const { data } = useList({
    resource: "posts",
    config: {
        // highlight-next-line
        pagination: { current: 1, pageSize: 10 },
        // highlight-next-line
        hasPagination: true, // This can be omitted since it's default to `true` in the `getList` method of our data provider.
    },
});
```

> Listing will start from page 1 showing 10 records.

<br />

**Adding sorting**

We'll sort records by specified order and field.

> [CrudSorting](/api-reference/core/interfaces.md#crudoperators) ?

```tsx title="dataProvider.ts"
// highlight-start
const generateSort = (sort?: CrudSorting) => {
    let _sort = ["id"]; // default sorting field
    let _order = ["desc"]; // default sorting

    if (sort) {
        _sort = [];
        _order = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });
    }

    return {
        _sort,
        _order,
    };
};
// highlight-end

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async ({ resource, hasPagination = true, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

// highlight-next-line
        const { _sort, _order } = generateSort(sort);

        const query = {
            ...(hasPagination ? {
                _start: (current - 1) * pageSize,
                _end: current * pageSize,
            } : {}),
// highlight-start
            _sort: _sort.join(","),
            _order: _order.join(","),
// highlight-end
        };

        const { data, headers } = await httpClient.get(
// highlight-next-line
            `${url}?${stringify(query)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },
}
```

<br />

Since our API accepts only certain parameter formats like `_sort` and `_order` we may need to transform some of the parameters.

So we added the `generateSort` method to transform sort parameters.

<br />

```ts
import { useList } from "@pankod/refine-core";

const { data } = useList({
    resource: "posts",
    config: {
        pagination: { current: 1, pageSize: 10 },
        // highlight-next-line
        sort: [{ order: "asc", field: "title" }],
    },
});
```

> Listing starts from ascending alphabetical order on title field.

<br />

**Adding filtering**

Filters allow you to filter queries using [refine's filter operators](/api-reference/core/interfaces.md#crudoperators). It is configured via field, operator and value properties.

```tsx title="dataProvider.ts"
const generateSort = (sort?: CrudSorting) => {
    let _sort = ["id"]; // default sorting field
    let _order = ["desc"]; // default sorting

    if (sort) {
        _sort = [];
        _order = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });
    }

    return {
        _sort,
        _order,
    };
};

// highlight-start
const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
    }

    return ""; // default "eq"
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map(({ field, operator, value }) => {
            const mappedOperator = mapOperator(operator);
            queryFilters[`${field}${mappedOperator}`] = value;
        });
    }

    return queryFilters;
};
// highlight-end

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async ({ resource, hasPagination = true, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const { _sort, _order } = generateSort(sort);

// highlight-next-line
        const queryFilters = generateFilter(filters);

        const query = {
            ...(hasPagination ? {
                _start: (current - 1) * pageSize,
                _end: current * pageSize,
            } : {}),
            _sort: _sort.join(","),
            _order: _order.join(","),
        };

        const { data, headers } = await httpClient.get(
// highlight-next-line
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },
}
```

<br />

Since our API accepts only certain parameter formats to filter the data, we may need to transform some parameters.

So we added the `generateFilter` and `mapOperator` methods to the transform filter parameters.

[Refer to the list of all filter operators &#8594](/api-reference/core/interfaces.md#crudoperators)

```ts
import { useList } from "@pankod/refine-core";

const { data } = useList({
    resource: "posts",
    config: {
        // highlight-start
        pagination: { current: 1, pageSize: 10 },
        sort: [{ order: "asc", field: "title" }],
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "rejected",
            },
        ],
    },
    // highlight-end
});
```

> Only lists records whose status equals to "rejected".

<br />

### `custom`

An optional method named `custom` can be added to handle requests with custom parameters like URL, CRUD methods and configurations.
It's useful if you have non-standard REST API endpoints or want to make a connection with external resources.

```ts title="dataProvider.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
 custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const { _sort, _order } = generateSort(sort);
            const sortQuery = {
                _sort: _sort.join(","),
                _order: _order.join(","),
            };
            requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
        }

        if (query) {
            requestUrl = `${requestUrl}&${stringify(query)}`;
        }

        if (headers) {
            httpClient.defaults.headers = {
                ...httpClient.defaults.headers,
                ...headers,
            };
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = await httpClient[method](url, payload);
                break;
            case "delete":
                axiosResponse = await httpClient.delete(url, {
                    data: payload,
                });
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
 }
```

#### Parameter Types

| Name     | Type                                                       |
| -------- | ---------------------------------------------------------- |
| url      | `string`                                                   |
| method   | `get`, `delete`, `head`, `options`, `post`, `put`, `patch` |
| sort?    | [`CrudSorting`](/api-reference/core/interfaces.md#crudsorting);          |
| filters? | [`CrudFilters`](/api-reference/core/interfaces.md#crudfilters);          |
| payload? | `{}`                                                       |
| query?   | `{}`                                                       |
| headers? | `{}`                                                       |

<br/>

**refine** will consume this `custom` method using the `useCustom` data hook.

```ts
import { useCustom } from "@pankod/refine-core";

const { data, isLoading } = useCustom({
    url: `${apiURL}/posts-unique-check`,
    method: "get",
    config: {
        query: {
            title: "Foo bar",
        },
    },
});
```

> [Refer to the useCustom documentation for more information. &#8594](/api-reference/core/hooks/data/useCustom.md)

### Error Format

**refine** expects errors to be extended from [`HttpError`](/api-reference/core/interfaces.md#httperror).
Axios interceptor can be used to transform the error from response before Axios returns the response to your code. Interceptors are methods which are triggered before the main method.

```ts title="dataProvider.ts"
...
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);
...
```

[basekey]: /api-reference/core/interfaces.md#basekey
