---
"@refinedev/antd": patch
---

fix: `defaultFormValues` prop of `useDrawerForm` is not working (#5727).

From now on, `useForm`, `useDrawerForm`, and `useModalForm` hooks accept the `defaultFormValues` prop to pre-populate the form with data that needs to be displayed.

```tsx
useForm({
  defaultFormValues: {
    title: "Hello World",
  },
});
```

Also, it can be provided as an async function to fetch the default values. The loading state can be tracked using the `defaultFormValuesLoading` state returned from the hook.

```tsx
const { defaultFormValuesLoading } = useForm({
  defaultFormValues: async () => {
    const response = await fetch("https://my-api.com/posts/1");
    const data = await response.json();
    return data;
  },
});
```

fix: [`useDrawerForm`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-drawer-form/) has unused props.

- `submit` prop is removed from `useDrawerForm` hook. Instead, you can use `onFinish` prop to handle the form submission.
  https://refine.dev/docs/guides-concepts/forms/#modifying-data-before-submission

- `form` prop is removed from `useDrawerForm` hook.
  The purpose of `useDrawerForm` is to create a `form` instance. Because of that `form` instance cannot be passed as a prop.
