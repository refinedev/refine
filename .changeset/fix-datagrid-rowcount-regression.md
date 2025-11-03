---
"@refinedev/mui": patch
---

fix: prevent DataGrid pagination reset during loading states

Fixed a regression in useDataGrid where rowCount could become undefined during loading, causing pagination to reset to page zero. The fix ensures rowCount is properly memoized and preserved during loading states, including when total is 0.

Resolves #7099