---
"@pankod/refine-supabase": minor
---

Add `foreignTable` propery to the **supabase** order statement to access relational data. For more information, you can check the 🔗[documentation](https://supabase.com/docs/reference/javascript/order).

What we added to the [`getlist`](https://github.com/pankod/refine/blob/master/packages/supabase/src/index.ts) hook is the following:

💡 How use the `foreignTable` property?

```tsx
...
const { tableProps } = useTable({
    resource: "posts",
    initialSorter: [
        {
            field: "categories.title",
            order: "asc",
        },
    ],
});
```

📢 `field: "categories.title"` means in the `posts` table `categories` is the foreign table, `title` is the field in the foreign table, and `asc` is the order.

🚨 If you are using **Ant Design** don't forget to pass the `sorter` and `dataIndex` property to the your `Columm` component:

```tsx
...
<Table.Column
    dataIndex={["categories", "title"]}
    title="Categories"
    sorter
```

> **Warning**
> We have developed this feature due to an [issue here](https://github.com/pankod/refine/issues/2066) but currently, **supabase** doesn't support it. You can follow the progress here 👇

-   [https://github.com/supabase/supabase/discussions/4255](https://github.com/supabase/supabase/discussions/4255)
-   [https://github.com/supabase/postgrest-js/issues/198](https://github.com/supabase/postgrest-js/issues/198)
