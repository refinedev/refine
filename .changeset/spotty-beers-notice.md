---
"@refinedev/inferencer": patch
---

Even though `id` is required for Refine to work properly, in some list queries there may not be an `id` field. Material UI Datagrid requires an identifier for each row, if there's no `id` field, we're fallbacking to the first key of the row. Fixes the errors thrown for this case in Material UI List inferencers.
