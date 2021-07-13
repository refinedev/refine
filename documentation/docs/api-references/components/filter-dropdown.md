---
id: filter-dropdown
title: <FilterDropdown>
sidebar_label: <FilterDropdown>
---

import filterDropdown from '@site/static/img/category_filter-dropdown.png';

`<FilterDropdown>` is a helper component for [filter dropdowns in Ant Design `<Table>` components.](https://ant.design/components/table/#components-table-demo-custom-filter-panel)

It serves as a bridge by synchronizing between its children's input value and `<Table>`'s filter values.

```tsx title="components/pages/postList.tsx"
import { List, Table, useTable } from "@pankod/refine";

const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table
                {...tableProps}
                key="id"
            >
                <Table.Column
                    dataIndex={["category", "id"]}
                    title={"Categories"}
                    key="category.id"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                mode="multiple"
                                placeholder="Select Category"
                                options={[
                                    { label: "Hard Steel", value: "1" },
                                    { label: "Png Thx", value: "2" },
                                ]}
                            />
                        </FilterDropdown>
                    )}
                />
            </Table>
        </List>
    )
}
```

Selecting categories from dropdown will send the id's of categories as filtering values to **Table** and data will be updated by **refine** under the hood.


`<FilterDropdown` will put two buttons for filtering and clearing filter actions.

<div style={{textAlign: "center",  backgroundColor:"#efefef",  padding: "13px 10px 10px"}}>

<img style={{width: "60%"}} src={filterDropdown} />

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