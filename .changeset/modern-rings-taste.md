---
"@refinedev/hasura": patch
---

fix: [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type.

All fields in the [`CrudOperators`](https://github.com/refinedev/refine/blob/master/packages/core/src/contexts/data/types.ts#L218) interface must be used in the [`hasuraFilters`](https://github.com/refinedev/refine/blob/master/packages/hasura/src/utils/generateFilters.ts) object type, but some fields may not be supported by Hasura. To resolve this, the object type has been changed to partial.
