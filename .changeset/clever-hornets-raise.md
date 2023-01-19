---
"@pankod/refine-nestjsx-crud": minor
---

Added ability to pass `join` parameter through `metaData` to queries.

**Example**

```ts
useList({
    metaData: {
        join: {
            select: ["id","name"],
            field: "categories",
        },
    }
});

useList({
    metaData: {
        join: ["categories", ["id", "name"]],
    }
});

useList({
    metaData: {
        join: [
            ["categories", ["id", "name"]],
            {
                select: ["id", "label"],
                field: "tags",
            }
        ],
    }
});
```
