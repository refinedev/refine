---
"@refinedev/core": patch
---

feat: `autoSave` mutation not invalide when it was successful. Now `list` and `many` queries will be invalidated by default. Also added [`invalidateOnUnmountDetailCache`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmountdetailcache) prop to work when `unmount`. This prop will invalidate the `detail` query when `true` is set.
