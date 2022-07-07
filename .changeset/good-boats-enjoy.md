---
"@pankod/refine-graphql": major
"@pankod/refine-hasura": major
"@pankod/refine-strapi-graphql": major
---

Upgraded `grapql-request` version in graphql data provider packages.

Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

```diff
- import dataProvider from "@pankod/refine-strapi-graphql";
- import { GraphQLClient } from "graphql-request";
- import * as qqlQueryBuilder from "gql-query-builder";
+ import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
```
