---
"@refinedev/nestjsx-crud": patch
---

Add between operator

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
