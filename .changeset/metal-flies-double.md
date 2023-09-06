---
"@refinedev/core": minor
---

feat: add [`queryCacheUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop on `useUpdate` and `useUpdateMany` hooks

`list`, `many` and `detail` are the keys of the `queryCacheUpdateMap` object. For automatically updating the cache, you should pass the `true`. If you want not update the cache, you should pass the `false`. Also you can pass the function for updating the cache manually.

```tsx
const { mutate } = useUpdateMany();

mutate({
    //...
    mutationMode: "optimistic",
    queryCacheUpdateMap: {
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

feat: add [`queryCacheUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop on `useForm`hook

```tsx
const { formProps, saveButtonProps } = useForm({
        mutationMode: "optimistic",
        queryCacheUpdateMap: {
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