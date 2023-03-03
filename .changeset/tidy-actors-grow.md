---
"@pankod/refine-mui": minor
---

`useDataGrid` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
-   To ensure backward compatibility, `initialCurrent` and `initialPageSize` props work as before.

    ```diff
    useDataGrid({
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
    useDataGrid({
    -    hasPagination,
    +    pagination: {
    +        mode: "off" | "server" | "client",
    +    },
    })
    ```

-   `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
-   To ensure backward compatibility, `initialSorter` and `permanentSorter` props work as before.

    ```diff
    useDataGrid({
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
    useDataGrid({
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
    } = useDataGrid();
    ```
