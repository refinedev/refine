---
"@pankod/refine-airtable": minor
"@pankod/refine-altogic": minor
"@pankod/refine-appwrite": minor
"@pankod/refine-graphql": minor
"@pankod/refine-hasura": minor
"@pankod/refine-nestjsx-crud": minor
"@pankod/refine-nhost": minor
"@pankod/refine-simple-rest": minor
"@pankod/refine-strapi": minor
"@pankod/refine-strapi-graphql": minor
"@pankod/refine-strapi-v4": minor
"@pankod/refine-supabase": minor
---

`sort` paramater of `getList` method is deprecated. Added `sorters` parameter instead. To provide backward compatibility, `sort` parameter is still supported. But it will be removed in the next major version.

```diff
getList: async ({
-    sort
+    sorters
}) => {
    ...
},
```
