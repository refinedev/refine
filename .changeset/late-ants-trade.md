---
"@pankod/refine-hasura": minor
---

Add nested filter support to `Hasura` data provider.

Example usage:

```
filters: [
    {
        field: "category.id",
        operator: "eq",
        value: "8332c138-3231-406d-9655-1328ded9d5f2",
    },
],
```
