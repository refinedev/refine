---
"@refinedev/supabase": patch
---

feat: added `meta.schema` parameter to supabase dataprovider.
From now on, users will be able to specify the schema for queries using data hooks, allowing them to override the default schema in the supabase client. #5551

```tsx title="src/pages/users/list.tsx"
const tableProps = useTable<IUser>({
  resource: "posts",
  //highlight-start
  meta: {
    schema: "private",
  },
  // highlight-end
});
```
