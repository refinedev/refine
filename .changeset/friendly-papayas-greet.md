---
"@refinedev/antd": minor
---

fix: [`useDrawerForm`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-drawer-form/)'s `submit` and `form` props are not working (#6082).

- `submit` prop is removed from `useDrawerForm` hook. Instead, you can use `onFinish` prop to handle the form submission.
  https://refine.dev/docs/guides-concepts/forms/#modifying-data-before-submission

- `form` prop is removed from `useDrawerForm` hook.
  The purpose of `useDrawerForm` is to create a `form` instance. Because of that `form` instance cannot be passed as a prop.
