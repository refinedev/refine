---
"@refinedev/core": minor
---

feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-create/#mutation-parameters) should be given as a prop to the `useCreate` hook. #6113
From now on, you can pass mutation parameters to the `useCreate` hook as a prop.

Old usage of `useCreate` hook:

```tsx
import { useCreate } from "@refinedev/core";

const { mutate } = useCreate();

mutate(
  {
    resource: "products",
    values: {
      name: "New Product",
      material: "Wood",
    },
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

New usage of `useCreate` hook:

```tsx
import { useCreate } from "@refinedev/core";

const { mutate } = useCreate({
  resource: "products",
  values: {
    name: "New Product",
    material: "Wood",
  },
  successNotification: false,
  mutationMode: "optimistic",
  mutationOptions: {
    onSuccess: () => {
      /* do something after mutation success */
    },
  },
});

mutate({
  // also you can override the parameters given to the hook
});
```

You can think of the parameters given to the `useCreate` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

> 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.
