---
"@refinedev/antd": patch
---

fix: Filtering [`<Table />`](https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/) with [`<FilterDropdown />`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown) and [`<DatePicker />`](https://ant.design/components/date-picker) doesn't work with `syncWithLocation`. #5933

feat: Added [`rangePickerFilterMapper`](https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown/#rangepickerfiltermapper) utility function to convert `selectedKeys` to satisfy both the Refine and [`<DatePicker.RangePicker />`](https://ant.design/components/date-picker).

Usage example:

```tsx
import { getDefaultFilter } from "@refinedev/core";
import {
  DateField,
  FilterDropdown,
  rangePickerFilterMapper,
  useTable,
} from "@refinedev/antd";
import { Table, DatePicker } from "antd";

export const Posts = () => {
  const { tableProps, filters } = useTable({
    filters: {
      initial: [
        {
          field: "created_at",
          value: ["2022-01-01", "2022-01-31"],
          operator: "between",
        },
      ],
    },
  });

  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="title" title="Title" />
      <Table.Column
        dataIndex="createdAt"
        title="Created At"
        filterDropdown={(props) => (
          <FilterDropdown
            {...props}
            mapValue={(selectedKeys, event) => {
              return rangePickerFilterMapper(selectedKeys, event);
            }}
          >
            <DatePicker.RangePicker />
          </FilterDropdown>
        )}
        defaultFilteredValue={getDefaultFilter(
          "created_at",
          filters,
          "between",
        )}
      />
    </Table>
  );
};
```
