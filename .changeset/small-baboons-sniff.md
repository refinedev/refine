---
"@refinedev/mui": patch
---

fix: prevent server-side filter input from dropping characters in `useDataGrid`

When typing in the DataGrid filter panel with server mode, the input could lose
recent characters because the server update resets the filter model mid-typing.
We now debounce the `setFilters` call inside `useDataGrid` and disable the
DataGrid's own debounce to keep the input state stable while still triggering
server queries.

Resolves #7216
