---
"@refinedev/supabase": patch
---

feat: added `meta.schema` parameter to supabase dataprovider. #5551

From now on, users will be able to specify the schema for queries using data hooks, allowing them to override the default schema in the supabase client.

```tsx title="src/pages/users/list.tsx"
const tableProps = useTable<IUser>({
  resource: "posts",
  meta: {
    schema: "foo",
  },
});
```
