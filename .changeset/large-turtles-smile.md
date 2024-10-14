---
"@refinedev/nestjsx-crud": patch
---

feat: add `between` filter operator

Add between operator support to `CrudFilters`

```ts
import { useTable } from "@refinedev/core";

useTable({
  filters: {
    initial: [
      {
        field: "createdAt",
        operator: "between",
        value: [new Date().toISOString(), new Date().toISOString()],
      },
    ],
  },
});
```

[Resolves #6334](https://github.com/refinedev/refine/issues/6334)
