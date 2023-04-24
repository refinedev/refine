---
"@refinedev/antd": minor
"@refinedev/core": minor
"@refinedev/mui": minor
"@refinedev/react-table": minor
---

feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

-   **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
-   **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

-   **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
-   **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.
