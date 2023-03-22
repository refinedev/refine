---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

-   The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
-   The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.
