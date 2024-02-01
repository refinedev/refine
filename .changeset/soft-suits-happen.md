---
"@refinedev/nestjsx-crud": patch
---

feat: `"nnull"` operator added for filters. #4805
From now on, data hooks can use `"nnull"` operator to filter null values.

```ts
import { useTable } from "@refinedev/core";

useTable({
  filters: {
    permanent: [
      {
        field: "title",
        operator: "nnull",
        value: true,
      },
    ],
  },
});
```
