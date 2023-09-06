---
"@refinedev/core": patch
---

feat: `autoSave` mutation not invalide when it mutation successful. Now `list`,`many` and `detail` queries will be invalidated by default. Also added [`invalidateOnUnmount`](https://refine.dev/docs/api-reference/core/hooks/useForm/#invalidateonunmount) prop to work when `unmount`. However, you can use the `invalidates` prop if you want to customize it.