---
"@refinedev/core": minor
---

feat: [Mutation parameters](https://refine.dev/docs/data/hooks/use-create-many/#mutation-parameters) should be given as a prop to the `useCreateMany` hook. #6114
From now on, you can pass mutation parameters to the `useCreateMany` hook as a prop.

Old usage of `useCreateMany` hook:

```tsx
import { useCreateMany } from "@refinedev/core";

const { mutate } = useCreateMany();

mutate(
  {
    resource: "products",
    values: [
      {
        name: "Product 1",
        material: "Wood",
      },
      {
        name: "Product 2",
        material: "Metal",
      },
    ],
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

New usage of `useCreateMany` hook:

```tsx
import { useCreateMany } from "@refinedev/core";

const { mutate } = useCreateMany({
  resource: "products",
  values: [
    {
      name: "Product 1",
      material: "Wood",
    },
    {
      name: "Product 2",
      material: "Metal",
    },
  ],
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

You can think of the parameters given to the `useCreateMany` hook as default values, while the parameters given to the `mutate` function are the values used for that specific mutation or dynamic values.

> 🚨 If you pass these parameters to the `mutate` function, it will override the values given to the hook.
