---
"@refinedev/core": minor
---

feat: add `useLoadingOvertime` hook

if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

```tsx
const { elapsedTime } = useLoadingOvertime({
   isLoading,
   interval: 5000,
   onInterval(elapsedInterval, context) {
       console.log("loading overtime", elapsedInterval, context);
   },
});
```
