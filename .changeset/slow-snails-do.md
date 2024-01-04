---
"@refinedev/hasura": minor
---

feat: add `gqlQuery` and `gqlMutation` support.

Previously, `@refinedev/hasura` package only supported GraphQL operations through `meta.fields`.

Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

See the updated documentation for more information: https://refine.dev/docs/data/packages/hasura/

Query Example:

```tsx
import { useList } from "@refinedev/core";
import gql from "graphql-tag";

const PRODUCTS_QUERY = gql`
  query ProductsList(
    $offset: Int!
    $limit: Int!
    $order_by: [products_order_by!]
    where: $where
  ) {
    products(offset: $paging, limit: $filter, order_by: $order_by, where: $where) {
      id
      name
    }
    categories_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const { data } = useList({
  resource: "products",
  meta: { gqlQuery: PRODUCTS_QUERY },
});
```

Mutation Example:

```tsx
import { useForm } from "@refinedev/core";
import gql from "graphql-tag";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($object: posts_insert_input!) {
    createOneProduct(object: $object) {
      id
      name
    }
  }
`;

const { formProps } = useForm({
  resource: "products",
  meta: { gqlMutation: CREATE_PRODUCT_MUTATION },
});
```
