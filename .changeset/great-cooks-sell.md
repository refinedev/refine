---
"@pankod/refine-core": minor
---

## `useList` hook

-   Added default value for `pagination.current` property. It is set to **1**.
-   Added default value for `pagination.pageSize` property. It is set to **10**.
-   Added `pagination.mode` property. By default, it is "server".
    -   When it is "off", all records will be fetched from the API.
    -   When it is "client", all records will be fetched from the API and pagination will be handled by the `useList` hook.
    -   When it is "server", pagination will be handled by the API using `current` and `pageSize` properties of your `pagination` object.

## `useTable` hook

`useTable` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
-   To ensure backward compatibility, `initialCurrent` and `initialPageSize` props work as before.

    ```diff
    useTable({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```

-   `hasPagination` prop is now deprecated. Use `pagination.mode` instead.
-   To ensure backward compatibility, `hasPagination` prop works as before.

    ```diff
    useTable({
    -    hasPagination,
    +    pagination: {
    +        mode: "off" | "server" | "client",
    +    },
    })
    ```

-   `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
-   To ensure backward compatibility, `initialSorter` and `permanentSorter` props work as before.

    ```diff
    useTable({
    -    initialSorter,
    -    permanentSorter,
    +    sorters: {
    +        initial,
    +        permanent,
    +    },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are now deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
-   To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props work as before.

    ```diff
    useTable({
    -    initialFilter,
    -    permanentFilter,
    -    defaultSetFilterBehavior,
    +    filters: {
    +        initial,
    +        permanent,
    +        defaultBehavior,
    +    },
    })
    ```

-   `sorter` and `setSorter` return values are now deprecated. Use `sorters` and `setSorters` instead.
-   To ensure backward compatibility, `sorter` and `setSorter` return values work as before.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useTable();
    ```
