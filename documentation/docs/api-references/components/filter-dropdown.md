---
id: filter-dropdown
title: <FilterDropdown>
sidebar_label: <FilterDropdown>
---

import filterDropdown from '@site/static/img/category_filter-dropdown.png';

## Usage

`<FilterDropdown>` is a helper component for [filter dropdowns in Ant Design `<Table>` components.](https://ant.design/components/table/#components-table-demo-custom-filter-panel)

It serves as a bridge by synchronizing between its children's input value and `<Table>`'s filter values.

```tsx title="components/pages/postList.tsx"
import {
    List,
    Table,
    //highlight-start
    FilterDropdown,
    Select,
    useTable,
    //highlight-end
} from "@pankod/refine";

const PostList: React.FC = (props) => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowkey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    key="category.id"
                    filterDropdown={(props) => (
                        //highlight-start
                        <FilterDropdown {...props}>
                            <Select
                                mode="multiple"
                                placeholder="Select Category"
                                options={[
                                    { label: "Ergonomic", value: "1" },
                                    { label: "Island", value: "2" },
                                ]}
                            />
                        </FilterDropdown>
                        //highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

Selecting categories from dropdown will send the id's of categories as filtering values to **Table** and data will be updated by **refine** under the hood.

`<FilterDropdown>` will put two buttons for filtering and clearing filter actions.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={filterDropdown} alt="Show record action" />
</div>

<br/>

:::tip
We added category options for `<Select>` manually for the sake of simplicity but [useSelect](api-references/hooks/field/useSelect.md) hook can be used to populate the props of `<Select>`

```tsx
const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
});

<Select {...categorySelectProps}>
```

:::

## Properties

### `selectedKeys`, `setSelectedKeys`, `confirm`, `clearFilters`

These are to be passed from [`<Table.Column>`'s filterDropdown](https://ant.design/components/table/#Column) prop.

### `mapValue`

Determines the value passed to children. `mapValue` takes `selectedKeys` as an argument.

By default, `<FilterDropdown>` passes `selectedKeys` as value to its children. For some input types, you may need to change what is passed as value.

For example, `<Radio.Group>` component expects a singular value as a prop. Since `selectedKeys` is an array, `<Radio.Group>` won't work properly with it. A singular value for `<Radio.Group>` can be extracted from `selectedKeys`.

```tsx
import { Table, Radio, FilterDropdown } from "@pankod/refine";

<Table.Column
    dataIndex="status"
    title="status"
    key="status"
    filterDropdown={(props) => (
        <FilterDropdown
            {...props}
            //highlight-start
            mapValue={(selectedKeys) => {
                return selectedKeys[0];
            }}
            //highlight-end
        >
            <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
            </Radio.Group>
        </FilterDropdown>
    )}
/>;
```

> Since `<Checkbox.Group>` and `<Select>` can accepts an array as value, there is no need to use `mapValue`.

:::important
If [syncWithLocation](refine-config.md#syncwithlocation) is enabled, on page refresh filter values will be type of `string` since they will be parsed from URL. This might produce some incompatibility if data for filter input comes from an API and it's not type of `string`.  
For example when using `useSelect` for `<Select>` component. In this case values must be mapped to `number`s using `mapValue`.

```tsx
import {
    useTable,
    Table,
    FilterDropdown,
    Select,
    useSelect,
    getDefaultFilter,
} from "@pankod/refine";

const { tableProps, filters } = useTable<IPost>({
    initialFilter: [
        {
            field: "category.id",
            value: [1, 2],
            operator: "in",
        },
    ],
});

const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    defaultValue: getDefaultFilter("category.id", filters),
});

<Table>
    <Table.Column dataIndex="id" title="ID" />
    <Table.Column
        dataIndex={["category", "id"]}
        title="Category"
        key="category.id"
        filterDropdown={(props) => (
            <FilterDropdown
                {...props}
                mapValue={(selectedKeys) =>
                    selectedKeys.map((i) => parseInt(i.toString()))
                }
            >
                <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    placeholder="Select Category"
                    {...categorySelectProps}
                />
            </FilterDropdown>
        )}
        defaultFilteredValue={getDefaultFilter("category.id", filters)}
    />
</Table>;
```

> `getDefaultFilter` finds filter values for a given column from the given filters. In the example, `filters` passed to `getDefaultFilter` includes filter values from the URL since it comes from `useTable`.
> :::
