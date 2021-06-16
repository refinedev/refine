---
id: tag
title: Tag
---

import tagField from '@site/static/img/guides-and-concepts/fields/tag/tagField.png';

This field lets you display a value in a tag. It uses and Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

## Usage

Let's see how to use it in a basic list page:

```tsx
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
                    render={(value) => <TagField value={value} />}
                />
                //highlight-end
            </Table>
        </List>
    );
};
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

[Refer to rest Link props &#8594](https://ant.design/components/tag/#API)
