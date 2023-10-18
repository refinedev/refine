---
id: adding-sort-and-filters
title: 6. Adding Sort and Filters
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
    next: tutorial/adding-crud-pages/{preferredUI}/layout-menu-breadcrumb
---

## Sort and Filters

The `@refinedev/react-table` package is based on the [**TanStack Table**](https://tanstack.com/table/v8) package, meaning that we can add sorting and filtering features to our table as suggested in the **TanStack** documentation.

**Tanstack Table** keeps the `sorting` and `filters` states in the `useTable` hook. When these states are changed, the `useTable` hook will automatically fetch the data and update the table with the new data.

:::info
Under the hood, `sorting` and `filters` states of **Tanstack Table** are converted to the `CrudSorting` and `CrudFilter` types of **refine**. So, when you change the **Tanstack Table**'s `sorting` or `filters` state, `useTable` hook will pass the converted params to the `getList` method of the `dataProvider`.
:::

Since `@refinedev/react-table` provides a headless solution, there are many ways to handle filtering and sorting. In this tutorial, we will show a basic way of adding sorting and filtering to the table.

## Adding Sorting

We first need to add a clickable column header to the table, which, when clicked on, will sort the table by the column.

To do this, just open the `src/pages/blog-posts/list.tsx` file on your editor and replace the `<thead>` element with the following code:

```tsx title="src/pages/blog-posts/list.tsx"
<thead>
    {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <th key={header.id}>
                    //highlight-next-line
                    <div onClick={header.column.getToggleSortingHandler()}>
                        {!header.isPlaceholder &&
                            flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        //highlight-start
                        {{
                            asc: " 🔼",
                            desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                        //highlight-end
                    </div>
                </th>
            ))}
        </tr>
    ))}
</thead>
```

In the above code, we have added an `onClick` event to the column header. When the user clicks on the column header, the `getToggleSortingHandler` method of the column will be called, which will toggle the sorting state.

An arrow icon was also added to display the sorting state: no icon is shown if the column isn't sorted, 🔼 is displayed for ascending order, and 🔽 is displayed for descending order.

:::tip
If you want to disable sorting for a specific column, you can set the `enableSorting` property of the column to `false` in the column definition:

```tsx
{
    title: "Category",
    dataIndex: "category",
    //highlight-next-line
    enableSorting: false,
},
```

:::

## Adding Filters

We will just add a basic text input to the table header that will filter the table by the column value.

To do this, open the `src/pages/blog-posts/list.tsx` file on your editor and change the filter operator for columns to "contains" by changing the `meta` property of the column definition like below:

```tsx
{
    id: "title",
    accessorKey: "title",
    header: "Title",
    //highlight-start
    meta: {
        filterOperator: "contains",
    },
    //highlight-end
},
{
    id: "content",
    accessorKey: "content",
    header: "Content",
    //highlight-start
    meta: {
        filterOperator: "contains",
    },
    //highlight-end
},
```

:::note

There are many values that you can pass to the `filterOperator`, for more information about them, refer to the [Filtering section of the `useTable` documentation&#8594](/docs/packages/documentation/react-table/#filtering)
:::

You then need to disable filtering for the "actions" column by setting the `enableFiltering` property of the column to `false` in the column definition like below:

```tsx
{
    id: "actions",
    accessorKey: "id",
    header: "Actions",
    //highlight-next-line
    enableColumnFilter: false,
    cell: function render({ getValue }) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "4px",
                }}
            >
                <button
                    onClick={() => {
                        show("blog_posts", getValue() as string);
                    }}
                >
                    Show
                </button>
                <button
                    onClick={() => {
                        edit("blog_posts", getValue() as string);
                    }}
                >
                    Edit
                </button>
            </div>
        );
    },
},
```

Finally, you need to replace the `<thead/>` element with the following code:

```tsx
<thead>
    {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <th key={header.id}>
                    <div onClick={header.column.getToggleSortingHandler()}>
                        {!header.isPlaceholder &&
                            flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        {{
                            asc: " 🔼",
                            desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    //highlight-start
                    <div>
                        {header.column.getCanFilter() && (
                            <input
                                value={header.column.getFilterValue() as string}
                                onChange={(e) => {
                                    header.column.setFilterValue(
                                        e.target.value,
                                    );
                                }}
                                placeholder={`Search ${header.column.columnDef.header}`}
                            />
                        )}
                    </div>
                    //highlight-end
                </th>
            ))}
        </tr>
    ))}
</thead>
```

In the above code, we have added a basic text input to the column header. When the user types in the input, the `setFilterValue` method of the column will be called which will set the filter value of the column.

:::tip
We added the `enableColumnFilter` property to the column definition, which will call the `getCanFilter` method of the column to determine whether the column should have a filter input or not. If you want to disable the filtering for a spesific column, set the `enableColumnFilter` property of the column to false in the column definition:

```tsx
{
    title: "Category",
    dataIndex: "category",
    //highlight-next-line
    enableColumnFilter: false,
},
```

:::

> For more information about sorting and filters, refer to the [`useTable` documentation&#8594](/docs/packages/documentation/react-table/)

<br />

<Checklist>

<ChecklistItem id="add-search-and-filters-headless">
I have added search and filters to the table.
</ChecklistItem>

</Checklist>
