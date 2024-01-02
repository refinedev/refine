---
title: <FilterDropdown />
---

## Usage

`<FilterDropdown>` is a helper component for [filter dropdowns in Ant Design's `<Table>` components.](https://ant.design/components/table/#components-table-demo-custom-filter-panel)

It serves as a bridge by synchronizing between its children's input value and `<Table>`'s filter values.

```tsx title="components/pages/postList.tsx"
import {
  List,
  // highlight-start
  FilterDropdown,
  // highlight-end
  useTable,
} from "@refinedev/antd";
import { Table, Select } from "antd";

const PostList: React.FC = (props) => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          key="category.id"
          // highlight-start
          filterDropdown={(props) => (
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
          )}
          // highlight-end
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  category: {
    id: number;
  };
}
```

Selecting categories from dropdown will send the id's of categories as filtering values to **Table** and data will be updated by Refine under the hood.

`<FilterDropdown>` will put two buttons for filtering and clearing filter actions.

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/category_filter-dropdown.png" alt="Show record action" />

We added category options for `<Select>` manually for the sake of simplicity but the [useSelect](/docs/ui-integrations/ant-design/hooks/use-select) hook can be used to populate the props of `<Select>`

```tsx
const { selectProps: categorySelectProps } = useSelect<ICategory>({
  resource: "categories",
  optionLabel: "title",
  optionValue: "id",
});

<Select {...categorySelectProps} />;
```

## Properties

### selectedKeys, setSelectedKeys, confirm, clearFilters

These are to be passed from [`<Table.Column>`'s filterDropdown](https://ant.design/components/table/#Column) prop.

### mapValue

Determines the value passed to children. `mapValue` takes `selectedKeys` as an argument.

For example when using `useSelect` for `<Select>` component, in which case, the values must be mapped to `number`s using `mapValue`.

```tsx
import { getDefaultFilter } from "@refinedev/core";
import { useTable, FilterDropdown, useSelect } from "@refinedev/antd";
import { Table, Select } from "antd";

const { tableProps, filters } = useTable<IPost>({
  filters: {
    initial: [
      {
        field: "category.id",
        value: [1, 2],
        operator: "in",
      },
    ],
  },
});

const { selectProps: categorySelectProps } = useSelect<ICategory>({
  resource: "categories",
  optionLabel: "title",
  optionValue: "id",
  defaultValue: getDefaultFilter("category.id", filters, "in"),
});

<Table>
  <Table.Column dataIndex="id" title="ID" />
  <Table.Column
    dataIndex={["category", "id"]}
    title="Category"
    key="category.id"
    filterDropdown={(props) => (
      <FilterDropdown {...props} mapValue={(selectedKeys) => selectedKeys.map((i) => parseInt(i.toString()))}>
        <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select Category" {...categorySelectProps} />
      </FilterDropdown>
    )}
    defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
  />
</Table>;
```

:::simple Good to know

If [syncWithLocation](/docs/core/refine-component#syncwithlocation) is enabled, on page refresh, the filter values will be type of `string` since they will be parsed from URL. This might produce some incompatibility if data for filter input comes from an API and it's not type of `string`.

`getDefaultFilter` finds filter values for a given column from the given filters. In the example, `filters` passed to `getDefaultFilter` includes filter values from the URL since it comes from `useTable`.

:::

<PropsTable module="@refinedev/antd/FilterDropdown"/>

## Example

<CodeSandboxExample path="table-antd-use-table" />
