---
"@refinedev/mui": major
"@refinedev/inferencer": patch
---

feat: upgrade `@mui/x-data-grid` from v7 to v8

Updated the `@mui/x-data-grid` peer dependency from `^7.23.5` to `^8.24.0`.

This is a major version bump as MUI X v8 includes breaking changes that users should be aware of:

- Minimum TypeScript version is now v5
- Package structure updated to use Node.js `exports` field
- Some removed props: `rowPositionsDebounceMs`, `resetPageOnSortFilter`
- `showToolbar` prop is now required to display the toolbar

The `useDataGrid` hook and all DataGrid-related types remain fully compatible with v8.

Here is the updated version alignment:

| @refinedev/mui | @mui/x-data-grid | @mui/material |
| -------------- | ---------------- | ------------- |
| 6.x.x          | 7.x.x            | 6.x.x         |
| 7.x.x          | 7.x.x            | 6.x.x         |
| 8.x.x          | 8.x.x            | 6.x.x         |

For the full MUI X v8 migration guide, see: https://mui.com/x/migration/migration-data-grid-v7/
