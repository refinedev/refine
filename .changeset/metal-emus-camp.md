---
"@refinedev/codemod": patch
---

fix: Fix useOne hook transformation in codemod to correctly handle query fields

Fixed the `use-query-and-result-fields-in-useOne-hook` transformation to properly move all query-related fields (`isLoading`, `refetch`, `error`, `status`, `isSuccess`, `isStale`, `fetchStatus`, `failureCount`) into the `query` object when transforming from v4 to v5 format.
