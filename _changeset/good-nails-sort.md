---
"@refinedev/nestjsx-crud": patch
---

fix: `getList` without pagination response

Without the `limit` and `offset` parameters in the [`nestjsx/crud`](https://github.com/nestjsx/crud) library, the result is without paging. However, it was always expected to be paginated in the data provider. It now supports both situations.
