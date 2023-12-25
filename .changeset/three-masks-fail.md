---
"@refinedev/core": patch
---

feat: add optional `gqlQuery` and `gqlMutation` fields to `MetaQuery` type to be used in `data hooks`.

We plan to utilize these fields on our GraphQL data providers in the future.

You can build your queries/mutations with `graphql-tag` package and pass it to the `gqlQuery`/`gqlMutation` fields.

For now, only `@refinedev/nestjs-query` package supports it.

```tsx
import { useList } from "@refinedev/core";
import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
  query ProductsList(
    $paging: OffsetPaging!
    $filter: BlogPostFilter
    $sorting: [BlogPostSort!]!
  ) {
    products(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        name
      }
      totalCount
    }
  }
`;

const { data } = useList({
  resource: "products",
  meta: { gqlQuery: PRODUCTS_QUERY },
});
```
