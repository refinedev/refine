---
id: date
title: Date
swizzle: true
---


This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

```tsx live
// visible-block-start
import { 
    List,
    Table,
    useTable,
    // highlight-next-line
    DateField 
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" width="100%" />
                <Table.Column<IPost>
                    dataIndex="createdAt"
                    title="Created At"
                    render={(value) => (
                        // highlight-next-line
                        <DateField format="LLL" value={value} />
                    )}
                />
                ...
            </Table>
        </List>
    );
};

interface IPost {   
    id: number;
    title: string;   
    createdAt: string;
}
// visible-block-end

render(
    <RefineAntdDemo
        resources={[
            {
                name: "posts",
                list: PostList
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/DateField" format-default="`L`"/>

:::tip External Props
It also accepts all props of Ant Design [Text](https://ant.design/components/typography/#Typography.Text).
:::