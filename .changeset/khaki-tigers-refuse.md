---
"@refinedev/mui": patch
---

fix: Prevent DataGrid Pagination reset. #7099

Fixed an issue in useDataGrid in which the sortModel sent in response was constantly receiving a new Object, even though the content of it was not changing

Fixes #7099
