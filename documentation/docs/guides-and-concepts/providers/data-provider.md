---
id: data-provider
title: Data Provider
sidebar_label: Data Provider
---

import dpFlow from '@site/static/img/guides-and-concepts/providers/data-provider/flow.png';


## Overwiew

A data provider is the place where a refine app communicates with an API.  
Data providers can also be defined as adapters for refine making it possible to consume different API's and data services conveniently.  
It makes HTTP requests and returns response data back using predefined methods.


Data provider must include following methods:

```tsx
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
```


<br/>

**refine** consumes this methods using [data hooks](#guides-and-concepts/hooks/data/useCreate).

Data hooks are used to operate CRUD actions like creating a new record, listing a resource or deleting a record etc..


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
import dataProvider from "@pankod/refine-json-server";

const API_URL = "https://refine-fake-rest.pankod.com";

const App: React.FC = () => {
    return (
        <Admin dataProvider={dataProvider(API_URL)}>
           ...
        </Admin>
    );
};
```



We'll build `@pankod/refine-json-server` data provider from scratch to show the logic of how data provider methods interact with the API.

 
Let's start by create `getList` method.

### `getList`

It's used to get collection of resource.

```tsx title="@pankod/refine-json-server/src/index.ts"
const JsonServer = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
   
        const { data, headers } = await httpClient.get(
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    ...
)
```

```ts
dataProvider.getList('posts', {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'title', order: 'ASC' },
    filter: { author_id: 12 },
});

```

```ts
 {
     data: [
         { id: 126, title: "allo?", author_id: 12 },
         { id: 127, title: "bien le bonjour", author_id: 12 },
         { id: 124, title: "good day sunshine", author_id: 12 },
         { id: 123, title: "hello, world", author_id: 12 },
         { id: 125, title: "howdy partner", author_id: 12 },
     ],
     total: 27
 }
```

```ts
GET http://path.to.my.api/posts?sort=["title","ASC"]&range=[0, 4]&filter={"author_id":12}

HTTP/1.1 200 OK
Content-Type: application/json
Content-Range: posts 0-4/27
[
    { "id": 126, "title": "allo?", "author_id": 12 },
    { "id": 127, "title": "bien le bonjour", "author_id": 12 },
    { "id": 124, "title": "good day sunshine", "author_id": 12 },
    { "id": 123, "title": "hello, world", "author_id": 12 },
    { "id": 125, "title": "howdy partner", "author_id": 12 }
]
```
























