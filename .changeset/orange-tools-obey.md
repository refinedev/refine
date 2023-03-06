---
"@refinedev/airtable": minor
"@refinedev/altogic": minor
"@refinedev/appwrite": minor
"@refinedev/graphql": minor
"@refinedev/hasura": minor
"@refinedev/nestjsx-crud": minor
"@refinedev/nhost": minor
"@refinedev/simple-rest": minor
"@refinedev/strapi": minor
"@refinedev/strapi-graphql": minor
"@refinedev/strapi-v4": minor
"@refinedev/supabase": minor
"@refinedev/medusa": minor
---

-   `metaData` prop is now deprecated for all data provider methods. Use `meta` prop instead.

    > For backward compatibility, we still support `metaData` prop with refine v4.

    ```diff
    create: async ({
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

-   `sort`, `hasPagination`, and `metaData` parameters of `getList` method are now deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

    > For backward compatibility, we still support `sort`, `hasPagination` and `metaData` props with refine v4.

    ```diff
    getList: async ({
    -    sort
    +    sorters
    -    hasPagination
    +    pagination: { mode: "off" | "server | "client" }
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```
