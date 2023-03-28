---
"@refinedev/antd": patch
---

-   Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

    -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.
