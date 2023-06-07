---
"@refinedev/mui": major
---

Updated the `@mui/x-data-grid` dependency to the latest version (`v6`). This update introduces some changes to the existing codebases which are addressed in Material UI's migration guide for `@mui/x-data-grid` from `v5` to `v6`. We've created a simple migration guide to navigate refine users through the changes that might be required in their codebases. While this guide does not cover all the changes, it will help you get started with the migration process.

**Breaking Changes**

`useDataGrid` no longer returns `page`, `pageSize`, `onPageChange` and `onPageSizeChange`. According to the changes in the `DataGrid` API, `useDataGrid` now returns `paginationModel` and `onPaginationModelChange` props which are used to control the pagination state of the `DataGrid` and contains the previous logic of `page`, `pageSize`, `onPageChange` and `onPageSizeChange`.

With this release, the peer dependency of `@mui/x-data-grid` is updated to `^6.6.0`.
