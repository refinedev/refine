---
id: tag
title: Tag
swizzle: true
---


This field lets you display a value in a tag. It uses Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use it in a basic list page:

```tsx  title="pages/posts/list.tsx"
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    // highlight-next-line
    TagField,
    Table,
    useTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    // highlight-next-line
                    render={(value: string) => <TagField value={value} />}
                />
            </Table>
        </List>
    );
};

interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/tag/tagField.png" alt="TagField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/TagField" value-description="Tag content" />

:::tip External Props
It also accepts all props of Ant Design [Tag](https://ant.design/components/tag/#API).
:::