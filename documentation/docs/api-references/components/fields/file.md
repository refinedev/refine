---
id: file
title: File
---

import fileField from '@site/static/img/guides-and-concepts/fields/file/fileField.png'


This field is used to display files and uses `<Typography.Link>` from Ant Design.

[Refer to `<Typography.Link>` documentation for detailed usage. &#8594](https://ant.design/components/typography)

## Usage

Let's see how to use `<FileField>` with the example in the edit page. 

```tsx
import { List, Table, FileField } from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table<IPost> rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    key="title"
                />
                <Table.Column<IPost>
                    key="image"
                    title="Image"
                    dataIndex="image"
                    render={(_, record) => (
                        //highlight-start
                         <FileField src={record.image[0].url} />
                        //highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

:::tip
If you don't use `title` prop it will use `src` as `title`
:::

```tsx title="interfaces/index.d.ts"
interface IPost {
    id: string;
    title: string;
    image: [
        {
            url: string;
        },
    ];
}
```

<br/>
<div>
    <img src={fileField} alt="File Field Usage"/>
</div>

## API Reference

### Properties

| Property                                       | Description                     | Type                                                         | Default    |
| ---------------------------------------------- | ------------------------------- | ------------------------------------------------------------ | ---------- |
| src   <div className="required">Required</div> | Using for file path             | `string`                                                     |            |
| title                                          | Using for file title            | `string` \| `undefined`                                      | `src` prop |
| LinkProps                                      | Ant Design `<Typography>` props | [`LinkProps`](https://ant.design/components/typography/#API) |            |
