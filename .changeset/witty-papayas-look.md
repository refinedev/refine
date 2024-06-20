---
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/antd": patch
"@refinedev/core": patch
"@refinedev/mui": patch
---

fix(auto-save-indicator): replace reserved `key` prop with `translationKey` in <Message /> components

`<AutoSaveIndicator />` components from UI libraries have been using a `<Message />` component internally that uses a `key` prop. Since `key` is a reserved prop in React, it was causing a warning in the console. This change replaces the `key` prop with `translationKey` to avoid the warning.
