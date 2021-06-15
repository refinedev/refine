---
id: data-provider
title: Data Provider
sidebar_label: Data Provider
---

import dpFlow from '@site/static/img/guides-and-concepts/providers/data-provider/flow.png';


## Overview

A data provider is the place where a refine app communicates with an API.  
Data providers also act as adapters for refine making it possible to consume different API's and data services conveniently.  
A data provider makes HTTP requests and returns response data back using predefined methods.


A data provider must include following methods:

```tsx
const dataProvider = {
    create: (resource, params) => Promise,
    createMany: (resource, params) => Promise,
    deleteOne: (resource, id) => Promise,
    deleteMany: (resource, ids) => Promise,
    getList: (resource, params) => Promise,
    getMany: (resource, ids) => Promise,
    getOne: (resource, id) => Promise,
    update: (resource, id, params) => Promise,
    updateMany: (resource, ids, params) => Promise,
    custom: (url, method, params = {}) => Promise,
    getApiUrl: () => "",
}
```


<br/>

:::important
**refine** consumes this methods using [data hooks](#guides-and-concepts/hooks/data/useCreate).

Data hooks are used to operate CRUD actions like creating a new record, listing a resource or deleting a record etc..
:::

:::note
Data hooks uses [React Query](https://react-query.tanstack.com/) to manage data fetching. React Query handles important concerns like caching, invalidation, loading states etc..
:::



<br/>
<br/>

<div>
    <img src={dpFlow} />
</div>

<br/>
<br/>
<br/>

## Usage

To activate data provider in refine, we have to pass the `dataProvider` to `<Admin />` component.

```tsx title="src/App.tsx"
import { Admin } from "@pankod/refine";
import dataProvider from "./dataProvider";

const App: React.FC = () => {
    return (
        <Admin dataProvider={dataProvider}>
           ...
        </Admin>
    );
};
```


## Creating a data provider
We'll build **"Simple REST Dataprovider"** of `@pankod/refine-json-server` from scratch to show the logic of how data provider methods interact with the API.

We will provide you a fully working, *fake REST API* located at https://api.fake-rest.refine.dev . You may take a look at available [resources and routes of the API](https://api.fake-rest.refine.dev) before proceeding to the next step.  
Our **"Simple REST Dataprovider"** will be consuming this *Fake REST API*.


:::note
Fake REST API is based on [JSON Server Project](https://github.com/typicode/json-server). **Simple REST Dataprovider** is fully compatible with the REST rules and methods of the **JSON Server**.
:::

:::note
**refine** includes many out-of-the-box data providers to use in your projects like

* Simple REST API
* NestJS CRUD
* Strapi etc.
:::

<br />

First let's build a method that returns our data provider. 
```ts title="@pankod/refine-json-server/src/index.ts"
import axios, { AxiosInstance } from "axios";
import { DataProvider } from "./interfaces/dataProvider.ts";

const axiosInstance = axios.create();

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    create: (resource, params) => Promise,
    createMany: (resource, params) => Promise,
    deleteOne: (resource, id) => Promise,
    deleteMany: (resource, ids) => Promise,
    getList: (resource, params) => Promise,
    getMany: (resource, ids) => Promise,
    getOne: (resource, id) => Promise,
    update: (resource, id, params) => Promise,
    updateMany: (resource, ids, params) => Promise,
    custom: (url, method, params = {}) => Promise,
    getApiUrl: () => "",
})
```
> [Refer to types section for types used](#types)

It will take the API URL as a parameter and an optional HTTP client. We will use **axios** as default HTTP client.

<br/>

### `create`

Creates a single item in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
    
        const { data } = await httpClient.post(url, params);
    
        return {
            data,
        };
    },
    // highlight-end
    ...
})

```

<br/>

**refine** will consume this `create` method using `useCreate` data hook.

```ts
import { useCreate } from "@pankod/refine";

const { mutate } = useCreate();

mutate({
    resource: "categories",
    values: {
        title: "New Category",
    }
})
```
> [Refer to useCreate documentation for more information. &#8594](guides-and-concepts/hooks/data/useCreate.md)

### `createMany`

Creates multiple items in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    createMany: async (resource, params) => {
        const response = await Promise.all(
            params.map(async (param) => {
                const { data } = await httpClient.post(
                    `${apiUrl}/${resource}`,
                    param,
                );
                return data;
            }),
        );

        return { data: response };
    },
    // highlight-end
    ...
})

```


<br/>

**refine** will consume this `createMany` method using `useCreateMany` data hook.

```ts
import { useCreateMany } from "@pankod/refine";

const { mutate } = useCreateMany();

mutate({
    resource: "categories",
    values: [
        {
            title: "New Category",
        },
        {
            title: "Another New Category"
        }
    ]
})
```
> [Refer to useCreateMany documentation for more information. &#8594](guides-and-concepts/hooks/data/useCreateMany.md)

### `deleteOne`

Deletes an item in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    deleteOne: async (resource, id) => {
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


<br/>

**refine** will consume this `deleteOne` method using `useDelete` data hook.

```ts
import { useDelete } from "@pankod/refine";

const { mutate } = useDelete("categories");

mutate({ id: 2 })
```
> [Refer to useDelete documentation for more information. &#8594](guides-and-concepts/hooks/data/useDelete.md)

### `deleteMany`

Deletes multiple items in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    deleteMany: async (resource, ids) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
                );
                return data;
            }),
        );
        return { data: response };
    },
    // highlight-end
    ...
})

```


<br/>

**refine** will consume this `deleteMany` method using `useDeleteMany` data hook.

```ts
import { useDeleteMany } from "@pankod/refine";

const { mutate } = useDeleteMany("categories");

mutate({ ids: [ 2, 3 ] })
```
> [Refer to useDeleteMany documentation for more information. &#8594](guides-and-concepts/hooks/data/useDeleteMany.md)

### `update`

Updates an item in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, params);

        return {
            data,
        };
    },
    // highlight-end
    ...
})

```


<br/>

**refine** will consume this `update` method using `useUpdate` data hook.

```ts
import { useUpdate } from "@pankod/refine";

const { mutate } = useUpdate("categories");

mutate({ id: 2, values: { title: "New Category Title" } })
```
> [Refer to useUpdate documentation for more information. &#8594](guides-and-concepts/hooks/data/useUpdate.md)

### `updateMany`

Updates multiple items in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`,
                    params,
                );
                return data;
            }),
        );

        return { data: response };
    },
    // highlight-end
    ...
})

```


<br/>

**refine** will consume this `updateMany` method using `useUpdateMany` data hook.

```ts
import { useUpdateMany } from "@pankod/refine";

cconst { mutate } = useUpdateMany("posts");

mutate({ ids: [ 1, 2 ], values: { status: "draft" } })
```
> [Refer to useUpdateMany documentation for more information. &#8594](guides-and-concepts/hooks/data/useUpdateMany.md)

### `getOne`

Retrieves a single item in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    getOne: async (resource, id) => {
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


<br/>

**refine** will consume this `getOne` method using `useOne` data hook.

```ts
import { useOne } from "@pankod/refine";

const { data } = useOne<ICategory>("categories", 1);
```
> [Refer to useOne documentation for more information. &#8594](guides-and-concepts/hooks/data/useOne.md)

### `getMany`

Retrieves multiple items in a resource.

```ts title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    ...
    // highlight-start
    getMany: async (resource, ids) => {
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


<br/>

**refine** will consume this `getMany` method using `useMany` data hook.

```ts
import { useMany } from "@pankod/refine";

const { data } = useMany("categories", [ 1, 2 ]);
```
> [Refer to useMany documentation for more information. &#8594](guides-and-concepts/hooks/data/useMany.md)



### `getList`

Retrieves a collection of items in a resource.

```tsx title="@pankod/refine-json-server/src/index.ts"
const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
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
```
<br />

**refine** will consume this `getList` method using `useList` data hook.

```ts
import { useList } from "@pankod/refine";

const { data } = useList("posts");
```
> [Refer to useList documentation for more information. &#8594](guides-and-concepts/hooks/data/useList.md)


<br />

**Adding pagination**

We'll send start and end parameters to list a certain size of items.

```tsx title="@pankod/refine-json-server/src/index.ts"
 //highlight-next-line
import { stringify } from "query-string";

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        
        //highlight-start
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;
        //highlight-end

         //highlight-start
        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        };
         //highlight-end

        const { data, headers } = await httpClient.get(
             //highlight-next-line
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
const { data } = useList("posts", { 
    //highlight-next-line
    pagination: { current: 1, pageSize: 10 } );
```

>Listing will start from page 1 showing 10 records.


<br />

**Adding sorting**

We'll sort records by speficified order and field.

```tsx title="@pankod/refine-json-server/src/index.ts"
 //highlight-start
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
//highlight-end

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        //highlight-next-line
        const { _sort, _order } = generateSort(params.sort);
         
        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
            //highlight-start
            _sort: _sort.join(","),
            _order: _order.join(","),
            //highlight-end
        };

        const { data, headers } = await httpClient.get(
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

Since our API accepts a certain parameter format like  `_sort` and `_order` we need to transform parameters.

So we added `generateSort` method to transform sort parameters.

<br />


```ts
const { data } = useList("posts", { 
    pagination: { current: 1, pageSize: 10 },
    //highlight-next-line
    sort: [{ order: "asc", field: "title" }] );
```
>Listing starts from ascending alphabetical order on title field.

<br />

**Adding filtering**

Allows you to filter queries using refine's filter operators. It is configured via field, operator and value properites.

```tsx title="@pankod/refine-json-server/src/index.ts"
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

//highlight-start
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
//highlight-end

 //highlight-start
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
//highlight-end

const SimpleRestDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;
       
        const { _sort, _order } = generateSort(params.sort);

         //highlight-next-line
        const queryFilters = generateFilter(params.filters);

        const query = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
            _sort: _sort.join(","),
            _order: _order.join(","),
        };

        const { data, headers } = await httpClient.get(
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },
```
<br />

Since our API accepts a certain parameter format to filter the data, we need to transform parameters.

So we added `generateFilter` and `mapOperator` methods to transform filter parameters.


```ts
const { data } = useList("posts", { 
    pagination: { current: 1, pageSize: 10 },
    sort: [{ order: "asc", field: "title" }],
    //highlight-start
    filters: [
        {
            field: "status",
            operator: "eq",
            value: "rejected",
        },
    ],
    //highlight-end
    );
```
>Only lists records which status equal to "rejected".

Refer to [useList filter docs](/docs/guides-and-concepts/hooks/data/useList#filters) to see list of filter operators 

























