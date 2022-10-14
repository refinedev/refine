---
"@pankod/refine-airtable": minor
"@pankod/refine-altogic": minor
"@pankod/refine-antd": minor
"@pankod/refine-appwrite": minor
"@pankod/refine-core": minor
"@pankod/refine-graphql": minor
"@pankod/refine-hasura": minor
"@pankod/refine-medusa": minor
"@pankod/refine-nestjsx-crud": minor
"@pankod/refine-nhost": minor
"@pankod/refine-react-table": minor
"@pankod/refine-simple-rest": minor
"@pankod/refine-strapi": minor
"@pankod/refine-strapi-graphql": minor
"@pankod/refine-strapi-v4": minor
"@pankod/refine-supabase": minor
---

Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

```
{
  operator: "or",
  value: [
    {
      operator: "and",
      value: [
        {
          field: "name",
          operator: "eq",
          value: "John Doe",
        },
        {
          field: "age",
          operator: "eq",
          value: 30,
        },
      ],
    },
    {
      operator: "and",
      value: [
        {
          field: "name",
          operator: "eq",
          value: "JR Doe",
        },
        {
          field: "age",
          operator: "eq",
          value: 1,
        },
      ],
    },
  ],
}
```
