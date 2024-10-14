---
"@refinedev/graphql": major
---

feat: rewrite GraphQL data provider.

We've modernized GraphQL dataprovider to make it more flexible and strictly coupled into a specific API schema.
You can utilize `option` parameter to change the behaviour of the data provider. You can also do it individually for a single action.
We've removed `gql-query-builder` and `graphql-request` dependencies and now using `@urql/core` as a GraphQL client.
This means now it's required to pass either `gqlQuery` or `gqlMutation` to the hooks, `meta.fields` usage is removed.
`graphql-tag` package is also removed since `@urql/core` already has `gql` export to write queries & mutations.
We are no more re-exporting other packages, just our data provider, live provider and defaultOptions.

See the updated documentation for more details: https://refine.dev/docs/data/packages/graphql/

[Resolves #5942](https://github.com/refinedev/refine/issues/5942)
[Resolves #5943](https://github.com/refinedev/refine/issues/5943)
