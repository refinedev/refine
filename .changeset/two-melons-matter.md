---
"@refinedev/graphql": minor
---

feat: add `gqlQuery` and `gqlMutation` support.

Previously, `@refinedev/graphql` package only supported GraphQL operations through `meta.fields`.

Now we've added `gqlQuery` and `gqlMutation` fields in `meta` object.

You can utilize these fields along with `graphql-tag` package to build your queries/mutations.

See the updated documentation for more information: https://refine.dev/docs/packages/data-providers/graphql

Query Example:

```tsx
import { useList } from "@refinedev/core";
import gql from "graphql-tag";

const POSTS_LIST_QUERY = gql`
  query PostList($where: JSON, $sort: String) {
    posts(where: $where, sort: $sort) {
      id
      title
      content
      category {
        id
      }
    }
  }
`;

const { data } = useList({
  resource: "posts",
  meta: { gqlQuery: POSTS_QUERY },
});
```

Mutation Example:

```tsx
import { useForm } from "@refinedev/core";
import gql from "graphql-tag";

const POST_CREATE_MUTATION = gql`
  mutation createPost($input: createPostInput!) {
    createPost(input: $input) {
      id
      title
      content
      category {
        id
      }
    }
  }
`;

const { formProps } = useForm({
  resource: "posts",
  meta: { gqlMutation: CREATE_POST_MUTATION },
});
```
