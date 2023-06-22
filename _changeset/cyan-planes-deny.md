---
"@refinedev/core": minor
---

feat: add `useLoadingOvertime` hook and implement primitive  hooks

If you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.


```tsx
const { elapsedTime } = useLoadingOvertime({
   isLoading,
   interval: 1000,
   onInterval(elapsedInterval) {
       console.log("loading overtime", elapsedInterval);
   },
});

console.log(elapsedTime) // 1000, 2000, 3000, ...
```

This hook implements the primitive data hooks: 

- [`useCreate`](https://refine.dev/docs/api-reference/core/hooks/data/useCreate/#overtimeoptions)
- [`useCreateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useCreateMany/#overtimeoptions)
- [`useCustom`](https://refine.dev/docs/api-reference/core/hooks/data/useCustom/#overtimeoptions)
- [`useCustomMutation`](https://refine.dev/docs/api-reference/core/hooks/data/useCustomMutation/#overtimeoptions)
- [`useDelete`](https://refine.dev/docs/api-reference/core/hooks/data/useDelete/#overtimeoptions)
- [`useDeleteMany`](https://refine.dev/docs/api-reference/core/hooks/data/useDeleteMany/#overtimeoptions)
- [`useList`](https://refine.dev/docs/api-reference/core/hooks/data/useList/#overtimeoptions)
- [`useInfiniteList`](https://refine.dev/docs/api-reference/core/hooks/data/useInfiniteList/#overtimeoptions)
- [`useMany`](https://refine.dev/docs/api-reference/core/hooks/data/useMany/#overtimeoptions)
- [`useOne`](https://refine.dev/docs/api-reference/core/hooks/data/useOne/#overtimeoptions)
- [`useUpdate`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#overtimeoptions)
- [`useUpdateMany`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#overtimeoptions)
