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

-   Now, `pagination` property of `getList` method has new `mode` property. It can be "off", "client", and "server". If it is "off" or "client", data provider will not send any pagination related query params to the API. If it is "server", data provider will send pagination related query params to the API.

-   `hasPagination` property of `getList` method is deprecated. Use `pagination.mode` instead. However, for backward compatibility, `hasPagination` property will be used if `pagination.mode` is not provided.
