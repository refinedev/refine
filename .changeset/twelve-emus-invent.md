---
"@refinedev/core": patch
---

feat: The parameter types of data provider methods have been exported.
From now on, you can use the parameter types of Data Provider methods.

```ts
import type {
    DataProvider,
    GetListResponse
    // mew exported types
    GetListParams,
    GetManyParams,
    GetOneParams,
    CreateParams,
    CreateManyParams,
    UpdateParams,
    UpdateManyParams,
    DeleteOneParams,
    DeleteManyParams,
    CustomParams,
} from "@refinedev/core";

const myDataProvider: DataProvider = {
    getList: async (params: GetListParams): Promise<GetListResponse<any>> => {
        return { data: [], total: 0 };
    },
};
```
