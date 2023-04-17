---
"@refinedev/hasura": patch
---

fix: change enum from lowercase to UPPERCASE in api request for hasura camelCase naming convention

From the hasura documentation [here](https://hasura.io/docs/latest/schema/postgres/naming-convention/), for the graphql-default naming convention, the naming convention for enums is upper-cased. Currently the request are being made with the lowercase enum and not uppercase.

The change mainly
affects `sort`, desc gets changed to DESC and asc gets changed to ASC. the request from the refine client interface maintains the underscore and convertion to uppercase is only done at the API request layer.
