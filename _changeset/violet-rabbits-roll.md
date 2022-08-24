---
"@pankod/refine-nhost": minor
---

Add nested filter support to `Nhost` data provider.

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
