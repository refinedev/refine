---
"@refinedev/hasura": patch
---

fix: issue with #4972

When using the Hasura provider with the 'graphql-default' naming convention, snake-case graphql operators (e.g. \_is_null) were not converted to the correct case, causing query errors.
This problem is now fixed. Now the snake_case operator is converted according to the given naming convention (e.g. hasura-default: \_is_null, graphql-default: \_isNull).
