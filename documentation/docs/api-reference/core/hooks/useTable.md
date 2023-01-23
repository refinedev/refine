---
id: useTable
title: useTable
---

`useTable` allows us to fetch data according to sorter, filter, and pagination states. Under the hood it uses [`useList`](/docs/api-reference/core/hooks/data/useList/) for the fetch.

:::info
If you're looking for a complete table library, Refine supports two table libraries out-of-the-box.

-   [React Table](https://react-table.tanstack.com/) (for Headless users) - [Documentation](/packages/documentation/react-table.md) - [Example](/examples/table/react-table/basic.md)
-   [Ant Design Table](https://ant.design/components/table/#header) (for Ant Design users) - [Documentation](/api-reference/antd/hooks/table/useTable.md) - [Example](/examples/table/antd/useTable.md)
-   [Material UI Table](https://mui.com/x/react-data-grid/) (for Material UI users) - [Documentation](/api-reference/mui/hooks/useDataGrid.md) - [Example](/examples/table/mui/useDataGrid.md)

:::

## Basic Usage

Here is an example of how to use `useTable` with sorting, filtering, and pagination. We will explain in detail in the following sections.

```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import {
    IResourceComponentsProps,
    useMany,
    useTable,
    HttpError,
} from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
    category: {
        id: number;
    };
}

const PostList: React.FC<IResourceComponentsProps> = () => {
    const {
        tableQueryResult,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        pageCount,
        setFilters,
        sorter,
        setSorter,
    } = useTable<IPost, HttpError>({
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
    });

    // Fetches the posts for the current page
    const posts = tableQueryResult?.data?.data ?? [];
    // Checks if there is a next page available
    const hasNext = current < pageCount;
    // Checks if there is a previous page available
    const hasPrev = current > 1;
    // Gets the current sort order for the "createdAt" column
    const currentDateSortOrder =
        sorter.find((item) => item.field === "createdAt")?.order || "desc";

    // This code displays the category of each post. It uses the useMany hook to fetch the category data from the API.
    // The posts array is used to create the array of ids for the useMany hook.
    // The queryOptions.enabled property is set to true only if the posts array is not empty.
    const { data: categoryData, isLoading: categoryIsLoading } = useMany<
        ICategory,
        HttpError
    >({
        resource: "categories",
        ids: posts.map((item) => item?.category?.id),
        queryOptions: {
            enabled: !!posts.length,
        },
    });

    const setSearchFilter = (value: string) => {
        setFilters([
            {
                field: "title",
                operator: "contains",
                value,
            },
        ]);
    };

    const toggleDateSort = () => {
        setSorter([
            {
                field: "createdAt",
                order: currentDateSortOrder === "asc" ? "desc" : "asc",
            },
        ]);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <input
                    placeholder="Search by title"
                    onChange={(e) => {
                        setSearchFilter(e.currentTarget.value);
                    }}
                />
                <button onClick={toggleDateSort}>
                    Sort date by{" "}
                    {currentDateSortOrder === "asc" ? "desc" : "asc"}
                </button>
            </div>
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{new Date(post.createdAt).toDateString()}</td>
                            <td>
                                {categoryIsLoading
                                    ? "loading..."
                                    : // This code gets the title of the category from the categoryData object, which is the result of the useMany hook.
                                      categoryData?.data.find(
                                          (item) =>
                                              item.id === post.category.id,
                                      )?.title || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <div>
                    <button onClick={() => setCurrent(1)} disabled={!hasPrev}>
                        First
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev - 1)}
                        disabled={!hasPrev}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => prev + 1)}
                        disabled={!hasNext}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => setCurrent(pageCount)}
                        disabled={!hasNext}
                    >
                        Last
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {current} of {pageCount}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={current + 1}
                        onChange={(e) => {
                            const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                            setCurrent(value);
                        }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        const value = e.target.value
                            ? Number(e.target.value)
                            : 10;
                        setPageSize(value);
                    }}
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

<br/>

In basic usage `useTable` returns the data as it comes from the endpoint.

```tsx
import { useTable, HttpError } from "@pankod/refine-core";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}

const { tableQueryResult } = useTable<IPost, HttpError>({
    resource: "posts",
});
```

We will use this data in the following examples.

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published",
        "createdAt": "2021-04-18T00:09:11.607Z"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

## Pagination

`useTable` has a pagination feature. The pagination is done by using the `current` and `pageSize` props. The `current` is the current page and the `pageSize` is the number of records per page.

By default, the `current` is 1 and the `pageSize` is 10. You can change default values by passing the `initialCurrent` and `initialPageSize` props to the `useTable` hook.

You can also change the `current` and `pageSize` values by using the `setCurrent` and `setPageSize` functions that are returned by the `useTable` hook. Every change will trigger a new fetch.

If you want to disable pagination, you can use `hasPagination` property in `useTable` config and set it to `false`

:::info
If `hasPagination` is set to `false`, `current`, `setCurrent`, `pageSize`, `setPageSize` and `pageCount` will return `undefined`
:::

```tsx
import { useTable } from "@pankod/core";

const { pageSize, setPageSize, current, setCurrent } = useTable({
    resource: "posts",
    initialCurrent: 1,
    initialPageSize: 10,
});

console.log(pageSize); // 10
console.log(current); // 1

setPageSize(20);
console.log(pageSize); // 20

setCurrent(2);
console.log(current); // 2
```

## Sorting

`useTable` has a sorter feature. The sorter is done by using the `sorter` state. The `sorter` state is a [`CrudSorting`][crudsorting] type that contains the field and the order of the sort. You can change the sorter state by using the `setSorter` function. Every change will trigger a new fetch.

Also you can add initial sorter state by passing the `initialSorter` prop and permanent sorter state by passing the `permanentSorter` prop to the `useTable` hook. Even if you change the sorter state, the `permanentSorter` will be used together with the sorter state.

```tsx
import { useTable } from "@pankod/core";

const { sorter, setSorter } = useTable({
    resource: "posts",
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    permanentSorter: [
        {
            field: "id",
            order: "desc",
        },
    ],
});

console.log(sorter); // [{ field: "id", order: "desc" }, { field: "title", order: "asc" }]

setSorter([
    {
        field: "createdAt",
        order: "desc",
    },
]);

console.log(sorter); // [{ field: "createdAt", order: "desc" }, { field: "id", order: "desc" }]
```

## Filtering

`useTable` has a filter feature. The filter is done by using the `filters` state. The `filters` state is a [`CrudFilters`][crudfilters] type that contains the field, the operator and the value of the filter. You can change the filter state by using the `setFilters` function. Every change will trigger a new fetch.

Also you can add initial filter state by passing the `initialFilter` prop and permanent filter state by passing the `permanentFilter` prop to the `useTable` hook. Even if you change the filter state, the `permanentFilter` will be used together with the filter state.

`setFilters` function can work in two different behaviors; `merge` (default) and `replace`. You can set the behavior by passing it as the 2nd parameter.

You can also call `setFilters` with a setter function.

:::info
If you are using `merge` behavior and want to remove one of the filters; you should set the `value` to `undefined` or `null`. For `or` filters, you should set the `value` to an empty array `[]` to remove the filter.
:::

```tsx
import { useTable } from "@pankod/core";

const { filters, setFilters } = useTable({
    resource: "posts",
    initialFilter: [
        {
            field: "title",
            operator: "contains",
            value: "rerum",
        },
    ],
    permanentFilter: [
        {
            field: "status",
            operator: "equals",
            value: "published",
        },
    ],
});

console.log(filters); // [{ field: "title", operator: "contains", value: "rerum" }, { field: "status", operator: "equals", value: "published" }]

setFilters([
    {
        field: "title",
        operator: "contains",
        value: "F",
    },
]);

console.log(filters); // [{ field: "title", operator: "contains", value: "F" }, { field: "status", operator: "equals", value: "published" }]

setFilters([
    {
        field: "author",
        operator: "contains",
        value: "Foo",
    },
    "merge", // default
]);

console.log(filters);
/*
[
    { field: "title", operator: "contains", value: "F" },
    { field: "author", operator: "contains", value: "Foo" },
    { field: "status", operator: "equals", value: "published" }
]
*/

setFilters([
    {
        field: "author",
        operator: "ne",
        value: "Foo",
    },
    "replace",
]);

console.log(filters);
/*
[
    { field: "author", operator: "ne", value: "Foo" },
    { field: "status", operator: "equals", value: "published" }
]
*/

setFilters((prev) => prev.filter((filter) => filter.field !== "author"));

console.log(filters);
/*
[
    { field: "status", operator: "equals", value: "published" }
]
*/
```

## Properties

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/api-reference/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

The `resource` value is determined from the active route where the component or the hook is used. It can be overridden by passing the `resource` prop.

Use case for overriding the `resource` prop:

-   We can list a `category` from the `<PostList>` page.

```tsx
import React from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useTable,
} from "@pankod/refine-core";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

interface ICategory {
    id: number;
    name: string;
}

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableQueryResult: postsQueryResult } = useTable<IPost, HttpError>();

    const { tableQueryResult: categoriesQueryResult } = useTable<
        ICategory,
        HttpError
    >({
        resource: "categories",
    });

    return <div>{/* ... */}</div>;
};
```

Also you can give URL path to the `resource` prop.

```tsx
const table = useTable({
    resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
It is useful when you want to use a different `dataProvider` for a specific resource.

:::tip
If you want to use a different `dataProvider` on all resource pages, you can use the [`dataProvider` prop ](docs/api-reference/core/components/refine-config/#dataprovidername) of the `<Refine>` component.
:::

```tsx
const table = useTable({
    dataProviderName: "second-data-provider",
});
```

### `initialCurrent`

> Default: `1`

Sets the initial value of the page index.

```tsx
const table = useTable({
    initialCurrent: 2, // This will cause the table to initially display the data for page 2, rather than the default of page 1
});
```

### `initialPageSize`

> Default: `10`

Sets the initial value of the page size.

```tsx
const table = useTable({
    initialPageSize: 20, // This will cause the table to initially display 20 rows per page, rather than the default of 10
});
```

### `initialSorter`

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

```tsx
const table = useTable({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

### `permanentSorter`

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

```tsx
const table = useTable({
    permanentSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

### `initialFilter`

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

```tsx
const table = useTable({
    initialFilter: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### `permanentFilter`

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

```tsx
const table = useTable({
    permanentFilter: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### `defaultSetFilterBehavior`

> Default: `merge`

The filter behavior can be set to either `"merge"` or `"merge"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"merge"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

```tsx
const table = useTable({
    defaultSetFilterBehavior: "replace",
});
```

### `hasPagination`

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
const table = useTable({
    // highlight-start
    hasPagination: false,
    // highlight-end
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

Also you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
const table = useTable({
    // highlight-start
    syncWithLocation: true,
    // highlight-end
});
```

### `queryOptions`

`useTable` uses [`useList`](/docs/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
const table = useTable({
    // highlight-start
    queryOptions: {
        retry: 3,
    },
    // highlight-end
});
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/docs/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const table = useTable({
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        // highlight-next-line
        metaData,
    }) => {
        // highlight-next-line
        const headers = metaData?.headers ?? {};
        const url = `${apiUrl}/${resource}`;

        //...
        //...

        // highlight-next-line
        const { data, headers } = await httpClient.get(`${url}`, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `successNotification`

> [`NotificationProvider`][notification-provider] is required.

After data is fetched successfully, `useTable` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
const table = useTable({
    // highlight-start
    successNotification: (data, values, resource) => {
        return {
            message: `${data.title} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
        };
    },
    // highlight-end
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show a error notification. With this prop, you can customize the error notification.

```tsx
const table = useTable({
    // highlight-start
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when getting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
    // highlight-end
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
const table = useTable({
    // highlight-start
    liveMode: "auto",
    // highlight-end
});
```

### `onLiveEvent`

The callback function that is executed when new events from a subscription are arrived.

```tsx
const table = useTable({
    // highlight-start
    onLiveEvent: (event) => {
        console.log(event);
    },
    // highlight-end
});
```

### `liveParams`

Params to pass to [liveProvider's](/docs/api-reference/core/providers/live-provider/#subscribe) subscribe method.

## `Return Values`

### `tableQueryResult`

Returned values from [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

### `sorter`

Current [sorter state][crudsorting].

### `setSorter`

A function to set current [sorter state][crudsorting].

### `filters`

Current [filters state][crudfilters].

### `setFilters`

A function to set current [filters state][crudfilters].

### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

### `setCurrent`

A function to set current page index state. If pagination is disabled, it will be `undefined`.

### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

### `setPageSize`

A function to set current page size state. If pagination is disabled, it will be `undefined`.

### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

### `createLinkForSyncWithLocation`

A function create accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

## API

### Properties

<PropsTable module="@pankod/refine-core/useTable"
successNotification-default='"Successfully created `resource`" or "Successfully updated `resource`"'
errorNotification-default='"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code:statusCode)"'      />

### Type Parameters

| Property | Desription                                                   | Type                       | Default                    |
| -------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData    | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError   | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |

### Return values

| Property                      | Description                                                                           | Type                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tableQueryResult              | Result of the `react-query`'s `useQuery`                                              | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`][usequery]                                                       |
| current                       | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                                 |
| pageCount                     | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                                 |
| setCurrent                    | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                           |
| pageSize                      | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                                 |
| setPageSize                   | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                           |
| sorter                        | Current sorting state s                                                               | [`CrudSorting`][crudsorting]                                                                                                                            |
| setSorter                     | A function that accepts a new sorter state.                                           | `(sorter: CrudSorting) => void`                                                                                                                         |
| filters                       | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                            |
| setFilters                    | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` <br/> - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| createLinkForSyncWithLocation | A function create accessible links for syncWithLocation                               | `(params: `[SyncWithLocationParams][syncwithlocationparams]`) => string;`                                                                               |

<br />

[table]: https://ant.design/components/table/#API
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /api-reference/core/interfaces.md#baserecord
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[httperror]: /api-reference/core/interfaces.md#httperror
[table search]: /advanced-tutorials/search/table-search.md
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
[live mode]: /api-reference/core/providers/live-provider.md#usage-in-a-hook
[live mod props]: /api-reference/core/interfaces.md#livemodeprops
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[notification-provider]: /api-reference/core/providers/notification-provider.md
