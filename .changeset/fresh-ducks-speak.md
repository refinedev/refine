---
"@refinedev/inferencer": patch
"@refinedev/mui": patch
---

fix: `@refinedev/mui` package gives following error:

```
Cannot find module '@mui/x-internals/forwardRef' from '/node_modules/@mui/x-data-grid/components/GridPagination.js'
```

To fix that, `@mui/x-data-grid` version is updated to `7.23.5`.

Issue from `@mui/x-data-grid` repo: https://github.com/mui/mui-x/issues/16007
