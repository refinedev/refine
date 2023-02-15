---
"@pankod/refine-core": minor
---

-   `initialCurrent` and `initialPagesize` properties of `useTable` hook are deprecated. Use `pagination.current` and `pagination.pageSize` instead. However, for backward compatibility, `initialCurrent` and `initialPagesize` properties will be used if `pagination.current` and `pagination.pageSize` are not provided.

-   `sorter` and `setSorter` return values of `useTable` hook are deprecated. Use `sorters` and `setSorters` instead. However, for backward compatibility, `sorter` and `setSorter` are safe to use.

-   Added `pagination.mode` property to `useTable` hook.

    -   When `pagination.mode` is "off", all records will be fetched from the API.
    -   When `pagination.mode` is "client", all records will be fetched from the API and pagination will be handled by the `useTable` hook.
    -   When `pagination.mode` is "server", pagination will be handled by the API using `current` and `pageSize` properties of `pagination` object.

- `sorter` property of `stringifyTableParams` method is deprecated. Use `sorters` instead.