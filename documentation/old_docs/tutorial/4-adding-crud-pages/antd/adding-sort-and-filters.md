---
id: adding-sort-and-filters
title: 6. Adding Sort and Filters
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
    next: tutorial/understanding-authprovider/index
---

## Adding Sorting

We will use `<Table.Column/>`'s `sorter` prop to add sorting to the table. You just need to open `src/pages/blog-posts/list.tsx` file and add the `sorter` prop to the `<Table.Column/>` component of the `id` column:

```tsx
<Table.Column
    dataIndex="id"
    title="Id"
    //highlight-next-line
    sorter
/>
```

Now, you can sort the data by `id` on the table.

:::note
If you want to add multiple sorting capabilities to the table, you can add the `sorter` prop by priority.
For example, if you want to sort the data by `id` first and then by `name` on the table, you can add `sorter` prop as below:

    ```tsx
    <Table.Column
        dataIndex="id"
        title="Id"
        //highlight-next-line
        sorter
    />
    <Table.Column
        dataIndex="id"
        title="Name"
        //highlight-next-line
        sorter={{ multiple: 1 }}
    />
    ```

:::

## Adding Filters

We'll use `<Table.Column/>`'s `filterDropdown` prop and the `<FilterDropdown/>` component to add filters to the table.

`<FilterDropdown/>` acts as a bridge between its child input and the `useTable` hook, providing necessary props and handling filtering logic. To add filtering to the `category` column, we'll use the `<Select/>` component from **Ant Design** as the child input and the `useSelect` hook to get necessary props like `options`.

First of all, open the `src/pages/blog-posts/list.tsx` file and import the following components and hooks:

    ```tsx
    import { FilterDropdown, useSelect } from "@refinedev/antd";
    import { Select } from "antd";
    ```

Then call the `useSelect` hook with the `categories` resource to fill the `<Select/>` component with category options:

    ```tsx
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });
    ```

Finally, follow the steps below:

1. Add `filterDropdown` prop to the `<Table.Column/>` component of the `category` column.
2. Add the `<FilterDropdown/>` component as the return value of the prop. Then, pass the `props` to the `<FilterDropdown/>` component.
3. Add the `<Select/>` component as the child of `<FilterDropdown/>` component. Then, pass the `categorySelectProps` to the `<Select/>` component.

```tsx
<Table.Column
    dataIndex={["category", "id"]}
    title="category"
    render={(value) => {
        if (isLoading) {
            return <TextField value="Loading..." />;
        }

        return (
            <TextField
                value={
                    categoriesData?.data.find((item) => item.id === value)
                        ?.title
                }
            />
        );
    }}
    //highlight-start
    filterDropdown={(props) => (
        <FilterDropdown {...props}>
            <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
            />
        </FilterDropdown>
    )}
    //highlight-end
/>
```

And now, you can search and filter the data by category on the table.

For more information, check out the following documents:

-   > [**Ant Design** `<Select/>`](https://ant.design/components/select) and [`useSelect` documentations&#8594](/docs/api-reference/antd/hooks/field/useSelect/)

-   > [**Ant Design** `<Table/>` documentation](https://ant.design/components/table#components-table-demo-custom-filter-panel) for the `filterDropdown` prop.

-   > [`<FilterDropdown/>` documentation](/docs/api-reference/antd/components/filter-dropdown/) for the `<FilterDropdown/>` component.

<br/>

<Checklist>

<ChecklistItem id="add-search-and-filters-antd">
I have added search and filters to the table.
</ChecklistItem>

</Checklist>
