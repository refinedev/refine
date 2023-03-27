---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

-   Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

    -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

-   `<RefineThemes>` colors updated to match the new theme colors.
