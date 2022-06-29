---
"@pankod/refine-airtable": patch
"@pankod/refine-altogic": patch
"@pankod/refine-appwrite": patch
"@pankod/refine-graphql": patch
"@pankod/refine-hasura": patch
"@pankod/refine-nestjsx-crud": patch
"@pankod/refine-nhost": patch
"@pankod/refine-simple-rest": patch
"@pankod/refine-strapi": patch
"@pankod/refine-strapi-graphql": patch
"@pankod/refine-strapi-v4": patch
"@pankod/refine-supabase": patch
---

Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

**Implementation**

Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

**Use Cases**

For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.
