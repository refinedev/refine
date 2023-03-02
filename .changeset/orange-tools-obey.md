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

-   `sort`, `hasPagination`, and `metaData` parameters of `getList` method are deprecated. Use `sorters`, `pagination`, and `meta` parameters instead.

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
