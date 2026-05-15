---
"@refinedev/mui": patch
---

fix(mui): clear stale filter value when a DataGrid filter row's field is swapped

In `useDataGrid`, when the user changes the column on an existing row in the MUI X DataGrid filter panel, MUI keeps the previously entered `value`. That value is meaningless under the new field (enums, foreign-key references, booleans, etc.) and was forwarded to the data provider as a `CrudFilter`, producing invalid queries.

`onFilterModelChange` now compares the incoming filter model against the previous one position-for-position when the item count is unchanged. If a row's `field` changed but its `value` was carried over, the value is cleared before the model is translated to a `CrudFilter`. Add/remove row paths are untouched.
