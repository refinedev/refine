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

```tsx
import { 
    List,
    Table,
    // highlight-next-line
    DateField 
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {

    return (
        <List>
            <Table rowKey="id">
                ...
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
    createdAt: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/date/dateField.png" alt="DateField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/DateField" format-default="`L`"/>

:::tip External Props
It also accepts all props of Ant Design [Text](https://ant.design/components/typography/#Typography.Text).
:::