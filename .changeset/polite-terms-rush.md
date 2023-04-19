---
"@refinedev/antd": minor
"@refinedev/core": minor
"@refinedev/mui": minor
"@refinedev/react-table": minor
---

feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

-   **"off"**: Sorting is disabled. All records will be fetched.
-   **"server"**: Sorting is done on the server side. Records will be fetched by using the sorters value.

feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

-   **"off"**: Filtering is disabled. All records will be fetched.
-   **"server"**: Filtering is done on the server side. Records will be fetched by using the filters value.
