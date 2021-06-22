---
id: text
title: Text
---

This field lets you show basic text. It uses Ant Design's [<Typography.Text\>](https://ant.design/components/typography/#Typography.Text) component.

## Usage

Let's see how to use it in a basic list page:

```tsx title="src/pages/posts/list.tsx"
import {
    List,
    //highlight-next-line
    TextField,
    Table,
    useTable,
    IResourceComponentsProps,
    useMany,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = (props) => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data: categoriesData, isLoading } = useMany<ICategory>(
        "categories",
        categoryIds,
        {
            enabled: categoryIds.length > 0,
        },
    );

    return (
        <List {...props}>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    //highlight-start
                    render={(value: string) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField strong
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    //highlight-end
                />
            </Table>
        </List>
    );
};
```

:::tip
Table columns already render their data as text by default. If the rendered data is in text form and its text field won't be customized with any of Ant Design [`<Typography.Text>`](https://ant.design/components/typography/#Typography.Text) props, there isn't any need to use `<TextField>` in a columns render function.
:::

```ts title="src/interfaces/index.d.ts"
export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    category: ICategory;
}
```

## API Reference

### Properties

| Property | Description             | Type                 |
| -------- | ----------------------- | -------------------- |
| value    | Markdown data to render | `string | undefined` |

[Refer to rest Text props &#8594](https://ant.design/components/typography/#Typography.Text)
