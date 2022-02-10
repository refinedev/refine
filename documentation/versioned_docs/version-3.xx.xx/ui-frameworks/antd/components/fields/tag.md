---
id: tag
title: Tag
---

import tagField from '@site/static/img/guides-and-concepts/fields/tag/tagField.png';

This field lets you display a value in a tag. It uses Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

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
    <img src={tagField} alt="TagField" />
</div>

## API Reference

### Properties

| Property | Description | Type              |
| -------- | ----------- | ----------------- |
| value    | Tag content | `React.ReactNode` |

[Refer to the documentation for rest of Link props &#8594](https://ant.design/components/tag/#API)
