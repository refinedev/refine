---
"@refinedev/core": minor
---

feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-update-many/#mutation-parameters) should be given as a prop to the `useUpdateMany` hook. #6115
From now on, you can pass mutation parameters to the `useUpdateMany` hook as a prop.

Old usage of `useUpdateMany` hook:

```tsx
import { useUpdateMany } from "@refinedev/core";

const { mutate } = useUpdateMany();

mutate(
  {
    resource: "products",
    values: {
      name: "New Product",
      material: "Wood",
    },
    ids: [1, 2, 3],
    mutationMode: "optimistic",
    successNotification: false,
  },
  {
    onSuccess: () => {
      /* do something after mutation success */
    },
  },
);
```

New usage of `useUpdateMany` hook:

```tsx
import { useUpdateMany } from "@refinedev/core";

const { mutate } = useUpdateMany({
  resource: "products",
  successNotification: false,
  mutationMode: "optimistic",
  mutationOptions: {
    onSuccess: () => {
      /* do something after mutation success */
    },
  },
});

mutate({
  ids: [1, 2, 3],
  values: {
    name: "New Product",
    material: "Wood",
  },
  // also you can override the parameters given to the hook
});
```

You can think of the parameters given to the `useUpdateMany` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

> 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.
