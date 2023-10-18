---
id: adding-sort-and-filters
title: 6. Adding Sort and Filters
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
    next: tutorial/understanding-authprovider/index
---

## Sort and Filters

The `@refinedev/react-table` package is based on the [**TanStack Table**](https://tanstack.com/table/v8) package, meaning that we can add sorting and filtering features to our table as suggested in the **TanStack** documentation.

**Tanstack Table** keeps the `sorting` and `filters` states in the `useTable` hook. When these states are changed, the `useTable` hook will automatically fetch the data and update the table with the new data.

:::info
Under the hood, `sorting` and `filters` states of **Tanstack Table** are converted to the `CrudSorting` and `CrudFilter` types of **refine**. So, when you change the **Tanstack Table**'s `sorting` or `filters` state, `useTable` hook will pass the converted params to the `getList` method of the `dataProvider`.
:::

Since `@refinedev/react-table` provides a headless solution, there are many ways to handle filtering and sorting. In this tutorial, we will show a basic way of adding sorting and filtering to the table.

## Adding Sorting

We first need to create a `ColumnSorter/>` component to use in our table header, which, when clicked on, will sort the table by the column:

```tsx title="src/components/table/ColumnSorter.tsx"
import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconSelector, IconChevronUp } from "@tabler/icons";
import type { Column } from "@tanstack/react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <ActionIcon size="xs" onClick={column.getToggleSortingHandler()}>
            {!sorted && <IconSelector size={18} />}
            {sorted === "asc" && <IconChevronDown size={18} />}
            {sorted === "desc" && <IconChevronUp size={18} />}
        </ActionIcon>
    );
};
```

`<ColumnSorter/>` is a simple component that renders a button, which will call the `column.getToggleSortingHandler()` method that will toggle the sorting state of the table when clicked on.

In addition, we are using the `column.getCanSort()` method to check if the column is sortable and not render the `<ColumnSorter/>` if it is not.

Lastly, if the column is not sorted, the `IconSelector` component is displayed; otherwise, either the `IconChevronDown` or `IconChevronUp` component is displayed based on the current sorting state.

:::tip
In this example, we are using the `@tabler/icons` package for icons but you can use any icon library you want.
:::

Now, we can finally use `<ColumnSorter/>` in our table header.

First, import the `<ColumnSorter/>` component:

    ```tsx title="src/pages/blog-posts/list.tsx"
    import { ColumnSorter } from "../../components/table/ColumnSorter";
    ```

Then add the `<ColumnSorter/>` component to the `<Th/>` as a child like below:

    ```tsx title="src/pages/blog-posts/list.tsx"
    <thead>
        {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                        {!header.isPlaceholder &&
                            flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        //highlight-next-line
                        <ColumnSorter column={header.column} />
                    </th>
                ))}
            </tr>
        ))}
    </thead>
    ```

Finally, disable sorting for the `actions` column by setting the `enableSorting` property of the column to `false` in the column definition like below:

    ```tsx title="src/pages/blog-posts/list.tsx"
    {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        //highlight-next-line
        enableSorting: false,
    },
    ```

Now, we can sort the table by clicking on the sort button in the table header.

:::tip
If you want to disable sorting for a specific column, you can set the `enableSorting` property of the column to `false` in the column definition:

```tsx
{
    id: "name",
    accessorKey: "name",
    header: "Name",
    //highlight-next-line
    enableSorting: false,
},
```

:::

## Adding Filters

Create a `<ColumnFilter/>` component to use in our table header which will be responsible for changing the filters state of the table.

```tsx title="src/components/table/ColumnFilter.tsx"
import React, { useState } from "react";
import { TextInput, Menu, ActionIcon, Stack, Group } from "@mantine/core";
import { IconFilter, IconX, IconCheck } from "@tabler/icons";
import type { Column } from "@tanstack/react-table";

export const ColumnFilter: React.FC<{ column: Column<any, any> }> = ({
    column,
}) => {
    const [state, setState] = useState(null as null | { value: any });

    if (!column.getCanFilter()) {
        return null;
    }

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

    const change = (value: any) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    const renderFilterElement = () => {
        const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <TextInput
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return <FilterComponent value={state?.value} onChange={change} />;
    };

    return (
        <Menu
            opened={!!state}
            position="bottom"
            withArrow
            transition="scale-y"
            shadow="xl"
            onClose={close}
            width="256px"
            withinPortal
        >
            <Menu.Target>
                <ActionIcon
                    size="xs"
                    onClick={open}
                    variant={column.getIsFiltered() ? "light" : "transparent"}
                    color={column.getIsFiltered() ? "primary" : "gray"}
                >
                    <IconFilter size={18} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {!!state && (
                    <Stack p="xs" spacing="xs">
                        {renderFilterElement()}
                        <Group position="right" spacing={6} noWrap>
                            <ActionIcon
                                size="md"
                                color="gray"
                                variant="outline"
                                onClick={clear}
                            >
                                <IconX size={18} />
                            </ActionIcon>
                            <ActionIcon
                                size="md"
                                onClick={save}
                                color="primary"
                                variant="outline"
                            >
                                <IconCheck size={18} />
                            </ActionIcon>
                        </Group>
                    </Stack>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};
```

`<ColumnFilter/>` is a component that renders a button which will open a menu when clicked on. In the menu, we are rendering the filter element of the column, which is `<Input/>` in this example but you can render any component you want.

Filter element is a component that renders an input element. When the user changes the value of the input element, the filter value of the column will be changed.

`<ColumnFilter/>` also contains "clear" and "apply" buttons, which will respectively clear or set the filter value of the column when clicked on.
Now, we can use `<ColumnFilter/>` in our table header.

1. Import the `<ColumnFilter/>` component:

    ```tsx title="src/pages/blog-posts/list.tsx"
    import { ColumnFilter } from "../../components/table/ColumnFilter";
    ```

2. Add the `<ColumnFilter/>` component to the `<Th/>` as a child:

    ```tsx title="src/pages/blog-posts/list.tsx"
    <thead>
        {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                        {!header.isPlaceholder &&
                            flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                        <ColumnSorter column={header.column} />
                        //highlight-next-line
                        <ColumnFilter column={header.column} />
                    </th>
                ))}
            </tr>
        ))}
    </thead>
    ```

3. Change the filter operator for columns to "contains" by changing the `meta` property of the column definition:

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

    :::tip
    There are many values that you can pass to the `filterOperator`, for more information about them, refer to the [Filtering section of the `useTable` documentation&#8594](/docs/packages/documentation/react-table/#filtering)
    :::

4. Disable filtering for the "actions" column by setting the `enableColumnFilter` property of the column to `false` in the column definition like below:

    ```tsx
    {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        //highlight-next-line
        enableColumnFilter: false,
        ...
    },
    ```

    :::tip
    You can similarly disable filtering for specific columns by setting their `enableColumnFilter` property to `false`.
    :::

Now, we can filter the table by clicking on the filter button in the table header.

<details>
  <summary><strong>How can I use a custom filter element?</strong></summary>

If you want to use a custom filter element, you can pass it to the `filterElement` property of the `meta` in column definition. For example, you can pass a `<Select/>` component like below:

```tsx
{
    id: "category",
    header: "Category",
    accessorKey: "category.id",
    meta: {
        filterElement: (props) => <Select {...props} />,
    },
},
```

In the props, the filter element will receive the `value` and `onChange` props. You can use these props to change the filter value of the column.

</details>

<br />

<Checklist>

<ChecklistItem id="add-search-and-filters-mantine">
I have added search and filters to the table
</ChecklistItem>

</Checklist>
