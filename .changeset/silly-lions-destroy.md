---
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/antd": patch
"@refinedev/mui": patch
---

fix(date-field): falsy values should render empty string

Previously, `<DateField value={undefined} />` was rendering the current date. After this change, it will render empty string if a falsy value is provided.

[Resolves #6216](https://github.com/refinedev/refine/issues/6216)
