---
"@pankod/refine-supabase": minor
---

Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

What we added to the [`getlist`](https://github.com/pankod/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

```tsx
...
sort?.map((item) => {
    const [foreignTable, field] = item.field.split(/\.(.*)/);

    if (foreignTable && field) {
        query
            .select(metaData?.select ?? `*, ${foreignTable}(${field})`)
            .order(field, {
                ascending: item.order === "asc",
                foreignTable: foreignTable,
            });
    } else {
        query.order(item.field, {
            ascending: item.order === "asc",
        });
    }
});
```
