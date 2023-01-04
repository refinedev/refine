---
id: create-dataprovider
title: 3. Create Data Provider From Scratch
tutorial:
    prev: tutorial/understanding-dataprovider/swizzle
    next: tutorial/understanding-resources/index
---

## Introduction

API usage and standards are very different, so data providers may not be suitable for you. 
In this case, you will need to write your own Data Provider.

Data providers work with adapter system infrastructure. So they can communicate with REST, GraphQL, RPC and SOAP based APIs. You can use `fetch`, `axios`, `apollo-client` or any library for this communication.

Now let's prepare a data provider that communicates with a REST API. We preferred `axios` as a client.

Let's start by creating a file like the one below. We will add other methods step by step.

```ts title="src/data-provider.ts"
import { DataProvider } from "@pankod/refine-core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  // Methods
});
```

## Methods
### getList

`getList` method is used to sort, filter and paginate to get a list of resources.
It takes a `resource`, `sort`, `pagination` and `filters` as parameters should return `data` and `total`.

Let's assume the API we want to implement is as follows: 

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
1. `resource` params implements the resource name. In our case, it is `posts`.

  ```ts title="src/data-provider.ts"
  getList: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;

    const { data, headers } = await axios.get(url);

    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  },
  ```

2. **refine** uses the `pagination` parameter for pagination. 
In this parameter, `current` for which page number and `pageSize` for the number of records in each page.

  ```ts title="src/data-provider.ts"
  getList: async ({ resource, pagination }) => {
    const url = `${apiUrl}/${resource}`;

    // highlight-start
    const { current = 1, pageSize = 10 } = pagination ?? {};

    const query: {
      _start?: number;
      _end?: number;
    } = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
    };

    const { data, headers } = await axios.get(`${url}?${stringify(query)}`);
    // highlight-end

    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  },
  ```

3. **refine** uses the `sort` parameter for sorting. This parameter includes `field` and `order`. 
  Supports multiple field sorting. [CrudSort[]](/docs/api-reference/core/interfaceReferences/#crudsorting) type, it comes in the data provider as follows.

  ```bash
  [
    {
      field: "id",
      order: "desc",
    },
  ]
  ```
  
  Multiple field sorting is not implemented because it doesn't support this API.

  ```ts title="src/data-provider.ts"
  getList: async ({ resource, pagination, sort }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10 } = pagination ?? {};

    const query: {
      _start?: number;
      _end?: number;
      // highlight-start
      _sort?: string;
      _order?: string;
      // highlight-end
    } = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
    };

    // highlight-start
    if (sort && sort.length > 0) {
      query._sort = sort[0].field;
      query._order = sort[0].order;
    }
    // highlight-end

    // highlight-next-line
    const { data, headers } = await axios.get(`${url}?${stringify(query)}`);

    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  }
  ```

4. **refine** uses the `filters` parameter for filtering. This parameter contains `field`, `operator` and `value` with type [CrudFilters[]](/docs/api-reference/core/interfaceReferences/#crudfilters).

 ```bash
  [
    {
      field: "status"
      operator: "eq"
      value: "published"
    },
    {
      field: "title"
      operator: "contain"
      value: "Hello"
    },
  ]
  ```

  The `operator` data comes with the [CrudOperators](/docs/api-reference/core/interfaceReferences/#crudoperators) type and needs to be mapped to the API. For this, the following `mapOperator` function is written.

  ```ts
  // Map refine operators to API operators
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
  ```

  Supports detailed filtering with **refine**. But the API must support it.

  ```ts title="src/data-provider.ts"
  // highlight-start
  const generateFilters = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};

    filters?.map((filter): void => {
      /**
       * It supports the refine `and` and `or` operators, but it is not implemented because it does not support this API.
       */
      if ("field" in filter) {
        const { field, operator, value } = filter;
        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });

    return queryFilters;
  };
  // highlight-end

  getList: async ({ resource, pagination, sort, filters }) => {
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

    // it is not implemented because it does not support this API.
    if (sort && sort.length > 0) {
      query._sort = sort[0].field;
      query._order = sort[0].order;
    }

    // highlight-next-line
    const queryFilters = generateFilters(filters);

    // highlight-next-line
    const { data, headers } = await axios.get(`${url}?${stringify(query)}&${stringify(queryFilters)}`);

    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  },
  ```

### create
The `create` method creates a new record with the `resource` and `variables` methods.

```ts title="src/data-provider.ts"
create: async ({ resource, variables }) => {
  const url = `${apiUrl}/${resource}`;

  const { data } = await axios.post(url, variables);

  return {
    data,
  };
},
```

### update
The `update` method updates the record with the `resource`, `id` and `variables` methods.

```ts title="src/data-provider.ts"
update: async ({ resource, id, variables }) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data } = await axios.patch(url, variables);

  return {
    data,
  };
}
```

### deleteOne
The `deleteOne` method delete the record with the `resource` and `id` methods.

```ts title="src/data-provider.ts"
deleteOne: async ({ resource, id, variables }) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data } = await axios.delete(url, {
    data: variables,
  });

  return {
    data,
  };
}
```

### getOne
The `getOne` method gets the record with the `resource` and `id` methods.

```ts title="src/data-provider.ts"
getOne: async ({ resource, id }) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data } = await axios.get(url);

  return {
    data,
  };
}
```

### getMany
The `getMany` method gets the records with the `resource` and `ids` methods.

```ts title="src/data-provider.ts"
getMany: async ({ resource, ids }) => {
  const { data } = await axios.get(
    `${apiUrl}/${resource}?${stringify({ id: ids })}`
  );

  return {
    data,
  };
}
```

### getApiUrl

The `getApiUrl` method returns the `apiUrl` value.

```ts title="src/data-provider.ts"
getApiUrl: () => apiUrl,
```

## Errors

When an error is returned from the API, **refine** must be extended from [HttpError](../../../../packages/core/src/interfaces/HttpError.ts) to handle it. 
Axios interceptor can be used to transform the error from response before Axios returns the response to your code. 
Interceptors are methods which are triggered before the main method. 

We create an `axiosInstance`, define an `interceptors` to handle an error and export it. Write this in a `utility` file.

```ts title=utility.ts
import axios from "axios";
import { HttpError } from "@pankod/refine-core";

const axiosInstance = axios.create();

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
  }
);

export { axiosInstance };
```

We import this utility file in the data provider and use `axiosInstance` instead of `axios`.

```diff title="src/data-provider.ts"
- import axios from "axios";
import { CrudFilters, CrudOperators, DataProvider } from "@pankod/refine-core";
import { stringify } from "query-string";

+ import { axiosInstance } from "./utils";

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, sort, filters }) => {
-    const { data, headers } = await axios.get(
+    const { data, headers } = await axiosInstance.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );
  },
}
```