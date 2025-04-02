---
"@refinedev/hasura": patch
---

'camelcase' utility imported twice from camelcase, with different capitalization. refactored to only import 'camelcase' since 'camelCase' is used by lodash, which is also in the dependency tree.
