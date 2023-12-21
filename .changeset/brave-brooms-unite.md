---
"@refinedev/nestjs-query": minor
---

feat: add `gqlQuery` and `gqlMutation` support.

Previously, `@refinedev/nestjs-query` package only supported GraphQL operations through `meta.fields`.

Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

See the updated documentation for more information: https://refine.dev/docs/packages/data-providers/nestjs-query

Query Example:

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

const { data } = useList({ resource: "products", meta: gqlQuery: PRODUCTS_QUERY });
```

Mutation Example:

```tsx
import {useForm} from '@refinedev/core';
import gql from 'graphql-tag';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createOneProduct(input: $input) {
      id
      name
    }
  }
`;

const { formProps } = useForm({ resource: "products", meta: gqlMutation: CREATE_PRODUCT_MUTATION });
```
