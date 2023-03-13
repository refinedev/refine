---
"@refinedev/airtable": major
"@refinedev/altogic": major
"@refinedev/appwrite": major
"@refinedev/graphql": major
"@refinedev/hasura": major
"@refinedev/nestjsx-crud": major
"@refinedev/nhost": major
"@refinedev/simple-rest": major
"@refinedev/strapi": major
"@refinedev/strapi-graphql": major
"@refinedev/strapi-v4": major
"@refinedev/supabase": major
"@refinedev/medusa": major
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
