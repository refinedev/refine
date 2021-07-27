---
id: tag
title: Tag
---

import tagField from '@site/static/img/guides-and-concepts/fields/tag/tagField.png';

This field lets you display a value in a tag. It uses Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

## Usage

Let's see how we can use it in a basic list page:

```tsx title="pages/posts/list.tsx"
import {
    List,
    //highlight-next-line
    TagField,
    Table,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                //highlight-start
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value: string) => <TagField value={value} />}
                />
                //highlight-end
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IPost {
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>
<div>
    <img src={tagField} alt="A tag field example"/>
</div>

## API Reference

### Properties

| Property | Description | Type              |
| -------- | ----------- | ----------------- |
| value    | Tag content | `React.ReactNode` |

[Refer to the documentation for rest of Link props &#8594](https://ant.design/components/tag/#API)
