---
"@pankod/refine-antd": minor
---

## `useTable` hook

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
-   To ensure backward compatibility, `hasPagination` prop will work as before.

    ```diff
    useTable({
    -    hasPagination,
    +    pagination: {
    +        mode: "off" | "server" | "client",
    +    },
    })
    ```

-   `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
-   To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

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
-   To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props will work as before.

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
-   To ensure backward compatibility, `sorter` and `setSorter` return values will work as before.

    ```diff
    const {
    -   sorter,
    +   sorters,
    -   setSorter,
    +   setSorters,
    } = useTable();
    ```

## `useSimpleList` hook

-   Now `useSimpleList` hook will not accept all of `<List>` component properties So, you can give their props to `<List>` component directly.

    ```diff
    import { useSimpleList } from "@refinedev/antd";
    import { List } from "antd";

    const { listProps } = useSimpleList({
        resource: "orders",
        pagination: {
            pageSize: 6,
    -       simple: true,
        },
    });

    <List
        {...listProps}
    +   pagination={{
    +     ...listProps.pagination,
    +     simple: true,
    +   }}
        ... // other props
    />
    ```

-   `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
-   To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

-   ```diff
    useSimpleList({
    -    initialCurrent,
    -    initialPageSize,
    +    pagination: {
    +        current,
    +        pageSize,
    +    },
    })
    ```
