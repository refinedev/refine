---
"@refinedev/core": minor
---

feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-update/#mutation-parameters) should be given as a prop to the `useUpdate` hook. #6102
From now on, you can pass mutation parameters to the `useUpdate` hook as a prop.

Old usage of `useUpdate` hook:

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate } = useUpdate();

mutate(
  {
    resource: "products",
    id: 1,
    mutationMode: "optimistic",
    successNotification: false,
    values: {
      name: "New Product",
      material: "Wood",
    },
  },
  {
    onSuccess: () => {
      /* do something after mutation success */
    },
  },
);
```

New usage of `useUpdate` hook:

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate } = useUpdate({
  resource: "products",
  id: 1,
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

You can think of the parameters given to the `useUpdate` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

> 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.
