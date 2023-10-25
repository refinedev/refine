```ts
import { DataProvider } from "@refinedev/core";

const dataProvider: DataProvider = {
    // required methods
     ({
        resource,
        pagination,
        sorters,
        filters,
        meta,
    }) => Promise,
    create: ({ resource, variables, meta }) => Promise,
    update: ({ resource, id, variables, meta }) => Promise,
    deleteOne: ({ resource, id, variables, meta }) => Promise,
    getOne: ({ resource, id, meta }) => Promise,
    getApiUrl: () => "",
    // optional methods
    getMany: ({ resource, ids, meta }) => Promise,
    createMany: ({ resource, variables, meta }) => Promise,
    deleteMany: ({ resource, ids, variables, meta }) => Promise,
    updateMany: ({ resource, ids, variables, meta }) => Promise,
    custom: ({
        url,
        method,
        filters,
        sorters,
        payload,
        query,
        headers,
        meta,
    }) => Promise,
};
```
