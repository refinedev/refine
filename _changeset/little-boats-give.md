---
"@refinedev/hasura": minor
---

feat: support camelCase graphql naming convention for Hasura

Previously, our Hasura data provider only supported snake-case naming conventions for operations and type names.

Hasura recently released a setting allowing for camelCase support.

The following changes do the Hasura data provider now support the new setting.

All methods for the Hasura Data provider now support the camelCase `graphql-default` naming convention.

The data provider now accepts a `namingConvention` field in the options payload.

Ex:

```
const gqlDataProvider = dataProvider(client, {namingConvention: "graphql-default"});
```

If the `graphql-default` naming convention is provided, all field names and variables will be camel cased. Type names will be PascalCased.
