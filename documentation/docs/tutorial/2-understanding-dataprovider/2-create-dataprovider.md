---
id: create-dataprovider
title: 3. Create Your First Data Provider
tutorial:
    prev: tutorial/understanding-dataprovider/swizzle
    next: tutorial/understanding-resources/index
---

## Introduction

APIs usage and standards are very diverse, so [`data providers`](#) may not be suitable for you. 
In this case, you'll have to write your own Data Provider. 
However, data providers are prepared and ready for use very quickly.

## Request

| Method       | Description                    | Parameters                                                                                                                                                                     | Is Required |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `create`     | Create a single resource       | `{ resource: string; variables: {Object}; }`                                                                                                                                   | true        |
| `getOne`     | Read a single resource by id   | `{resource: string; id: BaseKey; }`                                                                                                                                            | true        |
| `update`     | Update a single resource by id | `{resource: string; id: BaseKey; variables: {Object}; }`                                                                                                                       | true        |
| `deleteOne`  | Delete a single resource by id | `resource: string; id: BaseKey; variables?: {Object};`                                                                                                                         | true        |
| `getList`    | Get resources                  | `{resource: string; pagination?: Pagination; hasPagination?: boolean; sort?: CrudSorting; filters?: CrudFilters; dataProviderName?: string;}`                                  | true        |
| `getApiUrl`  | Return api url                 | `{}`                                                                                                                                                                           | true        |
| `custom`     | Custom request                 | `{ url: string; method: "get","delete","head","options","post","put","patch"; sort?: CrudSorting; filters?: CrudFilter[]; payload?: TPayload; query?: TQuery; headers?: {}; }` | false       |
| `getMany`    | Return api url                 | `{ resource: string; ids: BaseKey[]; dataProviderName?: string; }`                                                                                                             | false       |
| `createMany` | Return api url                 | `{ resource: string; variables: {Object}[]; }`                                                                                                                                 | false       |
| `updateMany` | Return api url                 | `{ resource: string; ids: BaseKey[]; variables: {Object}; }`                                                                                                                   | false       |
| `deleteMany` | Return api url                 | `{ resource: string; ids: BaseKey[]; variables?: {Object};}`                                                                                                                   | false       |

:::tip Optional `metaData` Parameter
All methods accept an optional `metaData` parameter, **refine** does not. 
But it's a good way to pass custom arguments or metadata to an API call.
:::

:::tip Optional Methods
It is not require to define the `createMany`, `deleteMany`, `getMany` and `updateMany` methods. 
If not defined, **refine** will call the corresponding singular `create`, `delete`, `getOne` and `update` methods in a loop.
:::

## Response

Data Providers methods should return a Promise that resolves to an object with a `data` property.

| Method       | Response                             |
| ------------ | ------------------------------------ |
| `create`     | `{ data: {Record} }`                 |
| `getOne`     | `{ data: {Record} }`                 |
| `update`     | `{ data: {Record} }`                 |
| `deleteOne`  | `{ data: {Record} }`                 |
| `getList`    | `{ data: {Record[]}, total: {int} }` |
| `getApiUrl`  | `string`                             |
| `custom`     | `{ data: {any} }`                    |
| `getMany`    | `{ data: {Record[]} }`               |
| `createMany` | `{ data: {Record[]} }`               |
| `updateMany` | `{ data: {Record[]} }`               |
| `deleteMany` | `{ data: {Record[]} }`               |

A `{Record}` is an object with at least one id property (`{ id: 1, title: "Hello World" }`).

## Errors

When an error is returned from the API, **refine** must be extended from [HttpError](../../../../packages/core/src/interfaces/HttpError.ts) to handle it. 
This can be done in several different ways. Below are examples made with `axios` and `fetch`.

<Tabs
    defaultValue="fetch"
    values={[
        {label: 'fetch', value: 'fetch'},
        {label: 'axios', value: 'axios'}
    ]}>
<TabItem value="fetch">

```ts title=dataProvider.ts
import { DataProvider, HttpError } from "@pankod/refine-core";

const dataProvider: DataProvider = {
    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}ddd`;

        return fetch(url, {
            method: "POST",
            body: JSON.stringify(variables),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            const error: HttpError = {
                statusCode: response.status,
                message: response.statusText,
            };
            return Promise.reject(error);
        })
        .then((data) => {
            return Promise.resolve({ data });
        });
    },
}
```
</TabItem>
<TabItem value="axios">

Axios interceptor can be used to transform the error from response before Axios returns the response to your code. Interceptors are methods which are triggered before the main method. 

```ts title=dataProvider.ts
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
```
</TabItem>
</Tabs>

## Usage with Hooks

<details><summary>useList</summary>
<p>

```tsx
const { data } = useList({
    resource: "posts",
    config: {
        pagination: {
            current: 1,
            pageSize: 10,
        }
    }
});

console.log(data);
// { 
//     data: [
//         {
//             id: 1,
//             title: "Hello World",
//         },
//         {
//             id: 2,
//             title: "refine",
//         }
//     ], 
//     total: 50
// }
```
</p>
</details>

<details><summary>useMany</summary>
<p>

```tsx
const { data } = useMany({
  resource: "posts",
  ids: [1, 2],
});

console.log(data);
// { 
//   data: [
//     {
//       id: 1,
//       title: "Hello World",
//     },
//     {
//       id: 2,
//       title: "refine",
//     }
//   ], 
//   total: 50
// }
```
</p>
</details>

<details><summary>useCreate</summary>
<p>

```tsx
const { mutate } = useCreate();

  mutate(
    {
      resource: "posts",
      values: {
        title: "Hello World",
      },
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
      },
    }
  );

// { 
//   id: 4,
//   title: "Hello World",
// }
```
</p>
</details>

<details><summary>useUpdate</summary>
<p>

```tsx
const { mutate } = useUpdate();

  mutate(
    {
      id: 4,
      resource: "posts",
      values: {
        title: "World Hello",
      },
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
      },
    }
  );

// { 
//   id: 4,
//   title: "World Hello",
// }
```
</p>
</details>

<details><summary>useDelete</summary>
<p>

```tsx
const { mutate } = useDelete();

  mutate(
    {
      id: 4,
      resource: "posts",
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
      },
    }
  );
```
</p>
</details>

<details><summary>useOne</summary>
<p>

```tsx
const { data } = useOne({
  resource: "posts",
  id: 1,
});

console.log(data);
// { 
//   data: {
//     id: 1,
//     title: "Hello World",
//   },
// }
```
</p>
</details>

## Example Rest API

Now, let's write data provider step by step to the API that takes parameters as follows.


**getList**

```bash
[GET] https://api.fake-rest.refine.dev/posts?title_like=Arch&_sort=id&_order=desc&_limit=10&_page=2

HTTP/2 200
Content-Type: application/json
x-total-count: 22
access-control-expose-headers: X-Total-Count

[
  {
    "id": 930,
    "title": "Rerum id laborum architecto et rerum earum.",
    "slug": "et-voluptas-corporis",
    "category": {
      "id": 4
    }
    "status": "draft",
  },
  {
    "id": 892,
    "title": "Architecto officiis sint voluptatem modi.",
    "slug": "iusto-est-corrupti",
    "category": {
      "id": 1
    },
    "status": "rejected",
  }
]             
```

**getMany**

```bash
[GET] https://api.fake-rest.refine.dev/posts?id=100&id=101

HTTP/2 200
Content-Type: application/json

[
  {
    "id": 100,
    "title": "Vitae maiores autem ut officia nam et.",
    "slug": "consequatur-qui-nobis",
    "category": {
      "id": 33
    },
    "user": {
      "id": 14
    },
    "status": "draft",
  },
  {
    "id": 101,
    "title": "Qui in sequi harum nemo doloremque quaerat quasi quia.",
    "slug": "maiores-delectus-consequatur",
    "category": {
      "id": 8
    },
    "status": "rejected",
  }
]
```

**create**

```bash
[POST] https://api.fake-rest.refine.dev/posts
{
  title: "Hello",
  status: "draft",
  category: {
    id: 1
  }
}

HTTP/2 201
Content-Type: application/json

{
  "id": 1000,
  "title": "Hello",
  "slug": "hello",
  "category": {
    "id": 1
  },
  "status": "draft",
}
```

**update**

```bash
[PUT] https://api.fake-rest.refine.dev/posts/1000
{
  status: "published",
}

HTTP/2 200
Content-Type: application/json

{
  "id": 1000,
  "title": "Hello World",
  "slug": "hello-world",
  "category": {
    "id": 1
  },
  "status": "published",
}
```

**deleteOne**

```bash
[DELETE] https://api.fake-rest.refine.dev/posts/1000

HTTP/2 200
```

**getOne**

```bash
[GET] https://api.fake-rest.refine.dev/posts/1000

HTTP/2 200

{
  "id": 1000,
  "title": "Hello World",
  "slug": "hello-world",
  "category": {
    "id": 1
  },
  "status": "published",
}
```
With this API, basically the data provider can be like this.

```ts title=dataProvider.ts
import { stringify } from "query-string";
import {
  CrudFilters,
  CrudOperators,
  DataProvider,
  HttpError,
} from "@pankod/refine-core";

const httpClient = (url: string, method: string = "GET", variables?: any) => {
  return fetch(url, {
    method,
    body: JSON.stringify(variables),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        return { data, headers: response.headers };
      }
      const error: HttpError = {
        statusCode: response.status,
        message: response.statusText,
      };
      return Promise.reject(error);
    })
    .then(({ data, headers }) => {
      return Promise.resolve({ data, headers });
    });
};

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

const generateFilters = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  filters?.map((filter): void => {
    /**
     * It supports the refine `and` and `or` operators, but it is not implemented because it does not support this API.
     * You can refer to the nestjsx-crud data provider for details.
    */
    if ("field" in filter) {
      const { field, operator, value } = filter;
      const mappedOperator = mapOperator(operator);
      queryFilters[`${field}${mappedOperator}`] = value;
    }
  });

  return queryFilters;
};

export const dataProvider = (
  apiUrl: string
) => ({
  getList: async ({
    resource,
    pagination = { current: 1, pageSize: 10 },
    filters,
    sort,
  }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10 } = pagination ?? {};

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
    };

    /*
     * refine supports multiple sorting, but it is not implemented because it does not support this API.
     * You can refer to the nestjsx-crud data provider for details.
    */
    if (sort && sort.length > 0) {
      query._sort = sort[0].field;
      query._order = sort[0].order;
    }

    const queryFilters = generateFilters(filters);

    const { data, headers } = await httpClient(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    return {
      data,
      total: +(headers.get("x-total-count") || 10),
    };
  },

  getMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}?${stringify({ id: ids })}`;
    const { data } = await httpClient(url);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await httpClient(url, "POST", variables);
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient(url, "PATCH", variables);
    return { data };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient(url, "GET", { id });
    return { data };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient(url, "DELETE", variables);
    return { data };
  },

  getApiUrl: () => {
    return apiUrl;
  },
});
```

## Example GraphQL API

