---
"@refinedev/core": minor
---

feat: add `useLoadingOvertime` hook

if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook. It returns the elapsed time in milliseconds.

```tsx
const { elapsedTime } = useLoadingOvertime({
   isLoading,
   interval: 1000,
   onInterval(elapsedInterval, context) {
       console.log("loading overtime", elapsedInterval, context);
   },
});
```

`interval` and `onInterval` are optional. It can be controlled globally from `<Refine />` options.

```tsx
<Refine
    //...
    options={{
        //...
        overtime: {
            interval: 2000, // default 1000
            onInterval(elapsedInterval, context) {
                console.log(
                    "loading overtime",
                    elapsedInterval,
                    context,
                );
            },
        },
    }}
>
```