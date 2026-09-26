---
"@refinedev/hasura": patch
---

fix(hasura): sorting by a relation field no longer crashes `getList` with `graphql-default` naming

With `namingConvention: "graphql-default"`, `getList` upper-cases the sort orders. A sorter on a relation field such as `category.title` gives a nested object (`{ category: { title: "asc" } }`), and `upperCaseValues` called `toUpperCase` on that object, so the request threw `TypeError: v.toUpperCase is not a function`. Nested sort orders are now upper-cased too (`{ category: { title: "ASC" } }`).

Fixes #7616
