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

<details><summary>TODO: Show useList Example</summary>
<p>

```ts
// TODO: Examples of using these methods with hooks:

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


## Example Rest API

Now, let's write data provider step by step to the API that takes parameters as follows.


**getList**

```bash
curl -i https://api.fake-rest.refine.dev/posts?title_like=Arch&_sort=id&_order=desc&_limit=10&_page=2

HTTP/2 200
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


```ts title=dataProvider.ts
import { stringify } from "query-string";
import {
  CrudFilters,
  CrudOperators,
  DataProvider,
  HttpError,
} from "@pankod/refine-core";

const client = (url: string, method: string = "GET", variables?: any) => {
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
    // and and or operators support is not implemented yet
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

    if (sort && sort.length > 0) {
      query._sort = sort[0].field;
      query._order = sort[0].order;
    }

    const queryFilters = generateFilters(filters);

    const { data, headers } = await client(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    return {
      data,
      total: +(headers.get("x-total-count") || 10),
    };
  },

  getMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}?${stringify({ id: ids })}`;
    const { data } = await client(url);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await client(url, "POST", variables);
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await client(url, "PATCH", variables);
    return { data };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await client(url, "GET", { id });
    return { data };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await client(url, "DELETE", variables);
    return { data };
  },

  getApiUrl: () => {
    return apiUrl;
  },
});
```

## Example GraphQL API

