---
"@refinedev/antd": patch
---

fix: `onFinish` prop override on `useDrawerForm` and `useModalForm` hook 

When override `onFinish` prop using the `useDrawerForm` and `useModalForm` hooks, the modal not close after submit the form.
