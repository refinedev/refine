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

| Method       | Description                    | Parameters                                                                                                                                                                                               | Is Required |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `create`     | Create a single resource       | `{ resource: string; variables: {Object}; metaData?: MetaDataQuery; }`                                                                                                                                   | true        |
| `getOne`     | Read a single resource by id   | `{resource: string; id: BaseKey; metaData?: MetaDataQuery; }`                                                                                                                                            | true        |
| `update`     | Update a single resource by id | `{resource: string; id: BaseKey; variables: {Object}; metaData?: MetaDataQuery; }`                                                                                                                       | true        |
| `deleteOne`  | Delete a single resource by id | `resource: string; id: BaseKey; variables?: {Object}; metaData?: MetaDataQuery;`                                                                                                                         | true        |
| `getList`    | Get resources                  | `{resource: string; pagination?: Pagination; hasPagination?: boolean; sort?: CrudSorting; filters?: CrudFilters; metaData?: MetaDataQuery; dataProviderName?: string;}`                                  | true        |
| `getApiUrl`  | Return api url                 | `{}`                                                                                                                                                                                                     | true        |
| `custom`     | Custom request                 | `{ url: string; method: "get","delete","head","options","post","put","patch"; sort?: CrudSorting; filters?: CrudFilter[]; payload?: TPayload; query?: TQuery; headers?: {}; metaData?: MetaDataQuery; }` | false       |
| `getMany`    | Return api url                 | `{ resource: string; ids: BaseKey[]; metaData?: MetaDataQuery; dataProviderName?: string; }`                                                                                                             | false       |
| `createMany` | Return api url                 | `{ resource: string; variables: {Object}[]; metaData?: MetaDataQuery; }`                                                                                                                                 | false       |
| `updateMany` | Return api url                 | `{ resource: string; ids: BaseKey[]; variables: {Object}; metaData?: MetaDataQuery; }`                                                                                                                   | false       |
| `deleteMany` | Return api url                 | `{ resource: string; ids: BaseKey[]; variables?: {Object}; metaData?: MetaDataQuery;}`                                                                                                                   | false       |

:::tip Optional `metaData` Parameter
All methods accept an optional `metaData` parameter, **refine** does not. 
But it's a good way to pass custom arguments or metadata to an API call.
:::


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

**refine** expects errors to be extended from [HttpError](../../../../packages/core/src/interfaces/HttpError.ts). Axios interceptor can be used to transform the error from response before Axios returns the response to your code. Interceptors are methods which are triggered before the main method. 

*TODO: Should be example for `fetch`.*

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


## Example Rest API
## Example GraphQL API

