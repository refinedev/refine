---
id: boolean
title: Boolean
swizzle: true
---


This field is used to display boolean values. It uses the [`<Tooltip>`](https://ant.design/components/tooltip/#header) values from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx
import {
    List,
    Table,
    // highlight-start
    BooleanField,
    Icons
    // highlight-end
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { CloseCircleOutlined, CheckCircleOutlined } = Icons;

    return (
        <List>
            <Table rowKey="id">
                ...
                <Table.Column
                    dataIndex="status"
                    title="Published"
                    render={(value) => (
                        // highlight-start
                        <BooleanField
                            value={value === "published"}
                            trueIcon={<CheckCircleOutlined />}
                            falseIcon={<CloseCircleOutlined />}
                            valueLabelTrue="published"
                            valueLabelFalse="unpublished"
                        />
                        // highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/boolean/booleanfield.png" alt="BooleanField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://ant.design/components/icon/)"
falseIcon-default="[`<CloseOutlined />`](https://ant.design/components/icon/)"
/>

:::tip External Props
It also accepts all props of Ant Design [Tooltip](https://ant.design/components/tooltip/#API).
:::
