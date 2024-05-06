---
"@refinedev/core": patch
---

refactor: prevented early accessing `signal` from `useQuery` of `@tanstack/react-query`

In query hooks, `signal` was accessed directly by destructuring which was causing issues in development mode with duplicated requests. This change accesses `queryContext` instead of destructured `signal` properly to prevent `@tanstack/react-query` from setting `abortSignalConsumed` flag unexpectedly.

Resolves [#5843](https://github.com/refinedev/refine/issues/5843)
