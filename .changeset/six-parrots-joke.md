---
"@refinedev/antd": patch
---

fix: when using [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/), `autoSave` parameters not passed to `@refinedev/core/useForm` hook.
From now on, you can use `autoSave` parameters in [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.

feat: add `invalidateOnUnmount` prop to [`useForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useForm/) hook.
feat: add `invalidateOnUnmount` and `invalidateOnClose` prop to [`useModalForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/) and [`useDrawerForm`](https://refine.dev/docs/api-reference/antd/hooks/form/useDrawerForm/) hooks.
From now on, you can use the use this props to invalidate queries upon unmount or close.
