---
"@refinedev/supabase": minor
---

fix: update custom id column name on meta params

BREAKING CHANGE: `meta.idColumnName` is used instead of `meta.id` when the primary key column name of your data table is different from `id`.

```diff
useMany({
    resource: "posts",
    ids: [1, 2],
    meta: {
-        id: "post_id",
+        idColumnName: "post_id",
    },
});
```