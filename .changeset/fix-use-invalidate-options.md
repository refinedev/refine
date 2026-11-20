---
"@refinedev/core": patch
---

fix(`useInvalidate`): pass `invalidationOptions` as options argument to `queryClient.invalidateQueries`

Fixes an issue where `invalidationOptions` was merged into the query filters object instead of being passed as the second (`options`) argument to TanStack Query's `invalidateQueries`. This caused `cancelRefetch` configuration (including the default `cancelRefetch: false`) to be ignored by TanStack Query.
