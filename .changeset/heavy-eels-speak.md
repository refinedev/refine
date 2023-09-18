---
"@refinedev/antd": major
---

feat: [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdate/#optimisticupdatemap) prop added to `useForm` hook. This prop allows you to update the data in the cache.

```tsx
useForm({
    mutationMode: "optimistic",
    optimisticUpdateMap: {
        list: true,
        many: true,
        detail: (previous, values, id) => {
            if (!previous) {
                return null;
            }

            const data = {
                id,
                ...previous.data,
                ...values,
                foo: "bar",
            };

            return {
                ...previous,
                data,
            };
        },
    },
});
```
