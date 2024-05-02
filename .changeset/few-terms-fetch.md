---
"@refinedev/mui": patch
---

feat: add ability to customize anchor origin from snackbar provider

Previously, `useNotificationProvider` used hardcoded `anchorOrigin` and `disableWindowBlurListener` values, preventing users to customize these values. This change moves these values to `<RefineSnackbarProvider />` as default props to allow users to customize them when needed.

Resolves [#5847](https://github.com/refinedev/refine/issues/5847)
