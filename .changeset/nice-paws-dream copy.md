---
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/antd": patch
"@refinedev/mui": patch
---

fix: UI buttons doesn't respect `hidden` prop.
From now on, `hidden` prop will work as expected on all [UI buttons](https://refine.dev/docs/guides-concepts/ui-libraries/#buttons).

UI Buttons:

- `CreateButton`
- `ShowButton`
- `ListButton`
- `EditButton`
- `DeleteButton`
- `CloneButton`

Resolves [#6513](https://github.com/refinedev/refine/issues/6513)
