---
"@pankod/refine-react-table": minor
---

Add `hasPagination` property to `useTable` hook to enable/disable pagination.

**Implementation**

Updated the `useTable` hook accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

**Use Cases**

In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.
