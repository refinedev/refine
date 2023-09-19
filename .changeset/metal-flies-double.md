---
"@refinedev/core": minor
---

feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useUpdate` and `useUpdateMany` hooks

`list`, `many` and `detail` are the keys of the `optimisticUpdateMap` object. To automatically update the cache, you should pass `true`. If you don't want to update the cache, you should pass `false`.

If you wish to customize the cache update, you have the option to provide functions for the `list`, `many`, and `detail` keys. These functions will be invoked with the `previous` data, `values`, and `id` parameters. Your responsibility is to return the updated data within these functions.

```tsx
const { mutate } = useUpdateMany();

mutate({
    //...
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

feat: add [`optimisticUpdateMap`](https://refine.dev/docs/api-reference/core/hooks/data/useUpdateMany/#optimisticupdatemap) prop to the `useForm` hook

```tsx
const { formProps, saveButtonProps } = useForm({
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
