---
id: useTable
title: useTable
source: packages/antd/src/hooks/table/useTable
---

import BasicUsageLivePreview from "./\_partial-use-table-basic-usage-live-preview.md";
import SorterLivePreview from "./\_partial-use-table-sorter-live-preview.md";
import FilteringPreview from "./\_partial-use-table-filtering-live-preview.md";
import SearchPreview from "./\_partial-use-table-search-live-preview.md";
import RelationalLivePreview from "./\_partial-use-table-relational-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

By using `useTable`, you can get properties that are compatible with Ant Design [`<Table>`][table] component. All features such as sorting, filtering, and pagination come out of the box. Under the hood it uses [`useList`](/docs/api-reference/core/hooks/data/useList/) for the fetch.

For all the other features, you can refer to the Ant Design [`<Table>`][table] documentation.

:::info
`useTable` hook is extended from [`useTable`][use-table-core] hook from the [`@refinedev/core`](https://github.com/refinedev/refine/tree/master/packages/core) package. This means that you can use all the features of [`useTable`][use-table-core] hook.
:::

## Basic usage

In basic usage, `useTable` returns the data as it comes from the endpoint. By default, it reads [`resource`](#resource) from the URL.

<BasicUsageLivePreview />

## Pagination

This feature comes out of the box with the `tableProps.pagination`. It generates the pagination links for the `<Table>` component instead of react state and overrides `<Table>`'s `pagination.itemRender` value. It also syncs the pagination state with the URL.

It also syncs the pagination state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

If you want to make a change in the pagination of the `<Table>`. You should pass the pagination object of the `tableProps` to the pagination property of the `<Table>` as below. You can override the values of the pagination object as your need.

```tsx
const { tableProps } = useTable<IPost>();

<Table
    {...tableProps}
    rowKey="id"
    // highlight-start
    pagination={{
        ...tableProps.pagination,
        position: ["bottomCenter"],
        size: "small",
    }}
    // highlight-end
>
    // ---
</Table>;
```

:::info
By default, pagination happens on the server side. If you want to do pagination handling on the client side, you can pass the pagination.mode property and set it to "client". Also, you can disable the pagination by setting the "off".
:::

## Sorting

If we want to give a column the sorting property, the corresponding [`<Table.Column>`][table-column] component must be given the [sorter](https://ant.design/components/table/#components-table-demo-head) property.

It also syncs the sorting state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<SorterLivePreview/>

:::caution

During the sorting process, the `key` property of your `<Column />` component is used as the property name in the API request. If your Column component does not have a `key` value, the `dataIndex` property is used.
It can be used when your DataIndex and your sorting key are different.

:::

:::tip
When using multiple sorting, `multiple` value is required for `sorter` property. Which specifies the priority of the column in sorting.
:::

## Filtering

We can use the `filterDropdown` property from [`<Table.Column>`][table-column] to make filtering based on the column values. In order to do this, we need to put the filtering form inside the [`<FilterDropdown>`][filter-dropdown] component and pass the properties coming to the function to these component's properties.

It also syncs the filtering state with the URL if you enable the [`syncWithLocation`](#syncwithlocation).

<FilteringPreview />

## Initial Filter and Sorter

:::caution
If you're using the `initial`, don't forget to add `getDefaultSortOrder` or `defaultFilteredValue` to your `<Table.Column>` component. Otherwise, hook states may not sync with the table.

```tsx
// ---
const { tableProps, sorters, filters } = useTable({
    sorters: {
        initial: [
            {
                field: "title",
                order: "asc",
            },
        ],
    }
    filters: {
        initial: [
            {
                field: "status",
                operator: "eq",
                value: "published",
            },
        ],
    },
});

// ---
<Table.Column
    dataIndex="title"
    title="Title"
    // highlight-next-line
     defaultSortOrder={getDefaultSortOrder("title", sorters)}
/>
<Table.Column
    dataIndex="status"
    title="Status"
    render={(value) => <TagField value={value} />}
    // highlight-next-line
    defaultFilteredValue={getDefaultFilter("status", filters)}
    filterDropdown={(props) => (
        <FilterDropdown {...props}>
            <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
                <Radio value="rejected">Rejected</Radio>
            </Radio.Group>
        </FilterDropdown>
    )}
/>
// ---
```

:::

## Search

We can use [`onSearch`](#onsearch) and [`searchFormProps`](#searchformprops) properties to make custom filter form. `onSearch` is a function that is called when the form is submitted. `searchFormProps` is a property that is passed to the [`<Form>`](https://ant.design/components/form) component.

<SearchPreview/>

## Realtime Updates

> This feature is only available if you use a [Live Provider](/docs/api-reference/core/providers/live-provider).

When the `useTable` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/docs/api-reference/core/providers/live-provider)

## Properties

### `resource`

<PropResource
hook={{
    name:"useList",
    URL:"/docs/api-reference/core/hooks/data/useList/"
}}
method={{
    name:"getList",
    URL:"/docs/api-reference/core/providers/data-provider/#getlist"
}}
/>

```tsx
useTable({
    resource: "categories",
});
```

### `onSearch`

When [`searchFormProps.onFinish`](#searchformprops) is called, the `onSearch` function is called with the values of the form. The `onSearch` function should return [`CrudFilters | Promise<CrudFilters>`][crudfilters].
Also, `onSearch` will set the current page to 1.

It's useful when you want to filter the data with any query.

```tsx
const { searchFormProps, tableProps } = useTable({
    onSearch: (values) => {
        return [
            {
                field: "title",
                operator: "contains",
                value: values.title,
            },
        ];
    },
});

// --
<List>
    <Form {...searchFormProps}>
        <Space>
            <Form.Item name="title">
                <Input placeholder="Search by title" />
            </Form.Item>
            <SaveButton onClick={searchFormProps.form?.submit} />
        </Space>
    </Form>
    <Table {...tableProps} rowKey="id">
        <Table.Column title="Title" dataIndex="title" />
    </Table>
</List>;
// ---
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use. It is useful when you want to use a different `dataProvider` for a specific resource.

```tsx
useTable({
    dataProviderName: "second-data-provider",
});
```

### `pagination.current`

> Default: `1`

Sets the initial value of the page index.

```tsx
useTable({
    pagination: {
        current: 2,
    },
});
```

### `pagination.pageSize`

> Default: `10`

Sets the initial value of the page size.

```tsx
useTable({
    pagination: {
        pageSize: 20,
    },
});
```

### `pagination.mode`

> Default: `"server"`

It can be `"off"`, `"server"` or `"client"`.

-   **"off":** Pagination is disabled. All records will be fetched.
-   **"client":** Pagination is done on the client side. All records will be fetched and then the records will be paginated on the client side.
-   **"server":**: Pagination is done on the server side. Records will be fetched by using the `current` and `pageSize` values.

```tsx
useTable({
    pagination: {
        mode: "client",
    },
});
```

### `sorters.initial`

Sets the initial value of the sorter. The `initial` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `sorters.permanent` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useTable({
    sorters: {
        initial: [
            {
                field: "name",
                order: "asc",
            },
        ],
    },
});
```

### `sorters.permanent`

Sets the permanent value of the sorter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `sorters.initial` prop.

[Refer to the `CrudSorting` interface for more information &#8594](docs/api-reference/core/interfaceReferences#crudsorting)

```tsx
useTable({
    sorters: {
        permanent: [
            {
                field: "name",
                order: "asc",
            },
        ],
    },
});
```

### `sorters.mode`

> Default: `"server"`

It can be `"off"`, or `"server"`.

-   **"off":** `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
-   **"server":**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

```tsx
useTable({
    sorters: {
        mode: "server",
    },
});
```

### `filters.initial`

Sets the initial value of the filter. The `initial` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `filters.permanent` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useTable({
    filters: {
        initial: [
            {
                field: "name",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `filters.permanent`

Sets the permanent value of the filter. The `permanent` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `filters.initial` prop.

[Refer to the `CrudFilters` interface for more information &#8594](/docs/api-reference/core/interfaceReferences#crudfilters)

```tsx
useTable({
    filters: {
        permanent: [
            {
                field: "name",
                operator: "contains",
                value: "Foo",
            },
        ],
    },
});
```

### `filters.defaultBehavior`

> Default: `merge`

The filtering behavior can be set to either `"merge"` or `"replace"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useTable({
    filters: {
        defaultBehavior: "replace",
    },
});
```

### `filters.mode`

> Default: `"server"`

It can be `"off"` or `"server"`.

-   **"off":** `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
-   **"server":**: Filters are done on the server side. Records will be fetched by using the `filters` value.

```tsx
useTable({
    filters: {
        mode: "off",
    },
});
```

### `syncWithLocation`

> Default: `false`

When you use the syncWithLocation feature, the `useTable`'s state (e.g. sort order, filters, pagination) is automatically encoded in the query parameters of the URL, and when the URL changes, the `useTable` state is automatically updated to match. This makes it easy to share table state across different routes or pages, and to allow users to bookmark or share links to specific table views.

Also, you can set this value globally on [`<Refine>`][refine swl] component.

```tsx
useTable({
    syncWithLocation: true,
});
```

### `queryOptions`

`useTable` uses [`useList`](/docs/api-reference/core/hooks/data/useList/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery).

```tsx
useTable({
    queryOptions: {
        retry: 3,
    },
});
```

### `meta`

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

-   Customizing the data provider methods for specific use cases.
-   Generating GraphQL queries using plain JavaScript Objects (JSON).

[Refer to the `meta` section of the General Concepts documentation for more information &#8594](/docs/api-reference/general-concepts/#meta)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useTable({
    // highlight-start
    meta: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    getList: async ({
        resource,
        pagination,
        sorters,
        filters,
        // highlight-next-line
        meta,
    }) => {
        // highlight-next-line
        const headers = meta?.headers ?? {};
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

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data is fetched successfully, `useTable` can call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx
useTable({
    successNotification: (data, values, resource) => {
        return {
            message: `${data.title} Successfully fetched.`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required for this prop to work.

After data fetching is failed, `useTable` will call `open` function from [`NotificationProvider`][notification-provider] to show an error notification. With this prop, you can customize the error notification.

```tsx
useTable({
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when getting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
});
```

### `liveMode`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useTable({
    liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useTable({
    onLiveEvent: (event) => {
        console.log(event);
    },
});
```

### `liveParams`

> [`LiveProvider`](/docs/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/docs/api-reference/core/providers/live-provider/#subscribe) method.

### ~~`initialCurrent`~~

:::caution Deprecated
Use `pagination.current` instead.
:::

> Default: `1`

Sets the initial value of the page index.

```tsx
useTable({
    initialCurrent: 2,
});
```

### ~~`initialPageSize`~~

:::caution Deprecated
Use `pagination.pageSize` instead.
:::

> Default: `10`

Sets the initial value of the page size.

```tsx
useTable({
    initialPageSize: 20,
});
```

### ~~`hasPagination`~~

:::caution Deprecated
Use `pagination.mode` instead.
:::

> Default: `true`

Determines whether to use server-side pagination or not.

```tsx
useTable({
    hasPagination: false,
});
```

### ~~`initialSorter`~~

:::caution Deprecated
Use `sorters.initial` instead.
:::

Sets the initial value of the sorter. The `initialSorter` is not permanent. It will be cleared when the user changes the sorter. If you want to set a permanent value, use the `permanentSorter` prop.

```tsx
useTable({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

### ~~`permanentSorter`~~

:::caution Deprecated
Use `sorters.permanent` instead.
:::

Sets the permanent value of the sorter. The `permanentSorter` is permanent and unchangeable. It will not be cleared when the user changes the sorter. If you want to set a temporary value, use the `initialSorter` prop.

```tsx
useTable({
    permanentSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
});
```

### ~~`initialFilter`~~

:::caution Deprecated
Use `filters.initial` instead.
:::

Sets the initial value of the filter. The `initialFilter` is not permanent. It will be cleared when the user changes the filter. If you want to set a permanent value, use the `permanentFilter` prop.

```tsx
useTable({
    initialFilter: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### ~~`permanentFilter`~~

:::caution Deprecated
Use `filters.permanent` instead.
:::

Sets the permanent value of the filter. The `permanentFilter` is permanent and unchangeable. It will not be cleared when the user changes the filter. If you want to set a temporary value, use the `initialFilter` prop.

```tsx
useTable({
    permanentFilter: [
        {
            field: "title",
            operator: "contains",
            value: "Foo",
        },
    ],
});
```

### ~~`defaultSetFilterBehavior`~~

:::caution Deprecated
Use `filters.defaultBehavior` instead.
:::

> Default: `merge`

The filtering behavior can be set to either `"merge"` or `"replace"`.

-   When the filter behavior is set to `"merge"`, it will merge the new filter with the existing filters. This means that if the new filter has the same column as an existing filter, the new filter will replace the existing filter for that column. If the new filter has a different column than the existing filters, it will be added to the existing filters.

-   When the filter behavior is set to `"replace"`, it will replace all existing filters with the new filter. This means that any existing filters will be removed and only the new filter will be applied to the table.

You can also override the default value by using the second parameter of the [`setFilters`](#setfilters) function.

```tsx
useTable({
    defaultSetFilterBehavior: "replace",
});
```

## Return Values

### `tableProps`

The props needed by the [`<Table>`][table] component.

#### `onChange`

The callback function is executed when a user interacts(filter, sort, etc.) with the table.

> 🚨 `useTable` handles sorting, filtering, and pagination with this function. If you override this function, you need to handle these operations manually.

```tsx
const { tableProps } = useTable()

<Table {...tableProps} onChange={tableProps.onChange} rowKey="id">
    <Table.Column title="Title" dataIndex="title" />
</Table>
```

#### `dataSource`

Contains the data to be displayed in the table. Values fetched with [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

#### `loading`

Indicates whether the data is being fetched.

#### `pagination`

Returns pagination configuration values(pageSize, current, position, etc.).

#### `scroll`

> Default: `{ x: true }`

Whether the table can be scrollable.

### `searchFormProps`

It returns [`<Form>`](https://ant.design/components/form/) instance of Ant Design. When `searchFormProps.onFinish` is called, it will trigger [`onSearch`](#onsearch) function.
You can also use `searchFormProps.form.submit` to submit the form manually.

It's useful when you want to create a filter form for your `<Table>`.

```tsx
import { HttpError } from "@refinedev/core";
import { List, useTable, SaveButton } from "@refinedev/antd";
import { Table, Form, Input } from "antd";

interface IPost {
    id: number;
    title: string;
}

interface ISearch {
    title: string;
}

const PostList: React.FC = () => {
    const { searchFormProps, tableProps } = useTable<IPost, HttpError, ISearch>(
        {
            onSearch: (values) => {
                return [
                    {
                        field: "title",
                        operator: "contains",
                        value: values.title,
                    },
                ];
            },
        },
    );

    return (
        <List>
            <Form {...searchFormProps} layout="inline">
                <Form.Item name="title">
                    <Input placeholder="Search by title" />
                </Form.Item>
                {/* highlight-next-line */}
                <SaveButton onClick={searchFormProps.form?.submit} />
            </Form>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column title="Title" dataIndex="title" />
            </Table>
        </List>
    );
};
```

### `tableQueryResult`

Returned values from [`useList`](/docs/api-reference/core/hooks/data/useList/) hook.

### `sorters`

Current [sorters state][crudsorting].

### `setSorters`

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

### `filters`

Current [filters state][crudfilters].

### `setFilters`

```tsx
((filters: CrudFilters, behavior?: SetFilterBehavior) => void) & ((setter: (prevFilters: CrudFilters) => CrudFilters) => void)
```

A function to set current [filters state][crudfilters].

### `current`

Current page index state. If pagination is disabled, it will be `undefined`.

### `setCurrent`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page index state. If pagination is disabled, it will be `undefined`.

### `pageSize`

Current page size state. If pagination is disabled, it will be `undefined`.

### `setPageSize`

```tsx
React.Dispatch<React.SetStateAction<number>> | undefined;
```

A function to set the current page size state. If pagination is disabled, it will be `undefined`.

### `pageCount`

Total page count state. If pagination is disabled, it will be `undefined`.

### `createLinkForSyncWithLocation`

```tsx
(params: SyncWithLocationParams) => string;
```

A function creates accessible links for `syncWithLocation`. It takes an [SyncWithLocationParams][syncwithlocationparams] as parameters.

### ~~`sorter`~~

:::caution Deprecated
Use `sorters` instead.
:::

Current [sorters state][crudsorting].

### ~~`setSorter`~~

:::caution Deprecated
Use `setSorters` instead.
:::

A function to set current [sorters state][crudsorting].

```tsx
 (sorters: CrudSorting) => void;
```

## FAQ

### How can I handle relational data?

You can use [`useMany`](/docs/api-reference/core/hooks/data/useMany/) hook to fetch relational data and filter `<Table>` by categories with help of [`useSelect`](http://localhost:3000/docs/api-reference/antd/hooks/field/useSelect/)

<RelationalLivePreview/>

### How can I handle client side filtering?

You can set the [`filters.mode: "off"`](#filtersmode) in order to disable server-side filtering. `useTable` is fully compatible with [`Ant Design <Table> component's`](https://ant.design/components/table#components-table-demo-head) filtering feature.

```tsx
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

const ListPage = () => {
    const { tableProps } = useTable({
        filters: {
            mode: "off",
        },
    });

    return (
        <Table {...tableProps} rowKey="id">
            {/* ... */}
            <Table.Column
                dataIndex="status"
                title="Status"
                filters={[
                    {
                        text: "Published",
                        value: "published",
                    },
                    {
                        text: "Draft",
                        value: "draft",
                    },
                    {
                        text: "Rejected",
                        value: "rejected",
                    },
                ]}
                onFilter={(value, record) => record.status === value}
            />
        </Table>
    );
};
```

### How can I handle client side sorting?

You can set the [`sorters.mode: "off"`](#sortersmode) in order to disable server-side sorting. `useTable` is fully compatible with [`Ant Design <Table> component's`](https://ant.design/components/table#components-table-demo-head) sorting feature.

```tsx
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

const ListPage = () => {
    const { tableProps } = useTable({
        sorters: {
            mode: "off",
        },
    });

    return (
        <Table {...tableProps} rowKey="id">
            <Table.Column
                dataIndex="id"
                title="ID"
                sorter={(a, b) => a.id - b.id}
            />
            {/* ... */}
        </Table>
    );
};
```

## API

### Properties

<PropsTable module="@refinedev/antd/useTable"/>

### Type Parameters

| Property         | Desription                                                                                                                                                          | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData     | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                                                                                                                            |                            | `{}`                       |
| TData            | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property         | Description                                                                           | Type                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchFormProps  | Ant Design [`<Form>`][form] props                                                     | [`FormProps<TSearchVariables>`][form]                                                                                                             |
| tableProps       | Ant Design [`<Table>`][table] props                                                   | [`TableProps<TData>`][table]                                                                                                                      |
| tableQueryResult | Result of the `react-query`'s `useQuery`                                              | [` QueryObserverResult<{`` data: TData[];`` total: number; },`` TError> `][usequery]                                                              |
| totalPage        | Total page count (returns `undefined` if pagination is disabled)                      | `number` \| `undefined`                                                                                                                           |
| current          | Current page index state (returns `undefined` if pagination is disabled)              | `number` \| `undefined`                                                                                                                           |
| setCurrent       | A function that changes the current (returns `undefined` if pagination is disabled)   | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| pageSize         | Current pageSize state (returns `undefined` if pagination is disabled)                | `number` \| `undefined`                                                                                                                           |
| setPageSize      | A function that changes the pageSize. (returns `undefined` if pagination is disabled) | `React.Dispatch<React.SetStateAction<number>>` \| `undefined`                                                                                     |
| sorters          | Current sorting state                                                                 | [`CrudSorting`][crudsorting]                                                                                                                      |
| setSorters       | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                  |
| ~~sorter~~       | Current sorting state                                                                 | [`CrudSorting`][crudsorting]                                                                                                                      |
| ~~setSorter~~    | A function that accepts a new sorters state.                                          | `(sorters: CrudSorting) => void`                                                                                                                  |
| filters          | Current filters state                                                                 | [`CrudFilters`][crudfilters]                                                                                                                      |
| setFilters       | A function that accepts a new filter state                                            | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |

<br />

## Example

<CodeSandboxExample path="table-antd-use-table" />

[use-table-core]: /docs/api-reference/core/hooks/useTable/
[table]: https://ant.design/components/table/#API
[table-column]: https://ant.design/components/table#column
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /api-reference/core/interfaces.md#baserecord
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[httperror]: /api-reference/core/interfaces.md#httperror
[table search]: /advanced-tutorials/search/table-search.md
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
[filter-dropdown]: /docs/api-reference/antd/components/filter-dropdown/
[syncwithlocationparams]: /api-reference/core/interfaces.md#syncwithlocationparams
[notification-provider]: /api-reference/core/providers/notification-provider.md
