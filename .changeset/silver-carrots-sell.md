---
"@refinedev/antd": minor
---

fix: `useForm`'s `defaultFormValues` prop is not working (#5727).

From now on, `useForm`, `useDrawerForm`, and `useModalForm` hooks accept the `defaultFormValues` prop to pre-populate the form with data that needs to be displayed.

```tsx
useForm({
  defaultFormValues: {
    title: "Hello World",
  },
});
```

Also, it can be provided as an async function to fetch the default values. The loading state can be tracked using the `defaultFormValuesLoading` state returned from the hook.

> 🚨 When `action` is "edit" or "clone" a race condition with `async defaultFormValues` may occur. In this case, the form values will be the result of the last completed operation.

```tsx
const { defaultFormValuesLoading } = useForm({
  defaultFormValues: async () => {
    const response = await fetch("https://my-api.com/posts/1");
    const data = await response.json();
    return data;
  },
});
```
