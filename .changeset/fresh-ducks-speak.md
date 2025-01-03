---
"@refinedev/inferencer": patch
"@refinedev/mui": patch
---

fix: `@refinedev/mui` package gives following error: `Cannot find module '@mui/x-internals/forwardRef' from '/node_modules/@mui/x-data-grid/components/GridPagination.js'` #6615

To fix that, `@mui/x-data-grid` version is updated to `7.23.5`.

[Resolves #6615](https://github.com/refinedev/refine/issues/6615)
