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
"@pankod/refine-medusa": minor
---

-   `metaData` props is deprecated for all data provider methods. Use `meta` prop instead.

    If you provide `metaData` with **refine** hooks or components, the `meta` value will be same as your provided `metaData` value.

    ```diff
    create: async ({
    -    metaData
    +    meta
    }) => {
        ...
    },
    ```

-   `sort`, `hasPagination`, and `metaData` paramaters of `getList` method is deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

    If you provide `sort`, `hasPagination` or `metaData` with **refine** hooks or components, the `sorters`, `pagination.mode` or `meta` value will be same as your provided prop value.

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
