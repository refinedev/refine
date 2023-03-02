---
"@pankod/refine-react-table": minor
---

`useTable` return values and properties are updated.

-   `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
-   To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

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
-   To ensure backward compatibility, `hasPagination` prop will works as before.

    ```diff
    useTable({
        refineCoreProps: {
    -      hasPagination,
    +       pagination: {
    +           mode: "off" | "server" | "client",
    +       },
        },
    })
    ```

-   `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
-   To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

    ```diff
    useTable({
        refineCoreProps: {
    -      initialSorter,
    -      permanentSorter,
    +      sorters: {
    +          initial,
    +          permanent,
    +      },
        },
    })
    ```

-   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
-   To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props work as before.

    ```diff
    useTable({
        refineCoreProps: {
    -      initialFilter,
    -      permanentFilter,
    -      defaultSetFilterBehavior,
    +      filters: {
    +          initial,
    +          permanent,
    +          defaultBehavior,
    +      },
        },
    })
    ```

-   `sorter` and `setSorter` return values are deprecated. Use `sorters` and `setSorters` instead.
-   To ensure backward compatibility, `sorter` and `setSorter` return values work as before.

    ```diff
    const {
        refineCore: {
    -        sorter,
    -        setSorter,
    +        sorters,
    +        setSorters,
        },
    } = useTable();
    ```
