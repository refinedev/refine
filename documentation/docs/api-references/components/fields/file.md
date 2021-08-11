---
id: file
title: File
---

import fileField from '@site/static/img/guides-and-concepts/fields/file/fileField.png'


This field is used to display files and uses [`<Typography.Link>`](https://ant.design/components/typography) from Ant Design.

## Usage

Let's see how we can use `<FileField>` with the example in the edit page. 

```tsx
import { 
    List,
    Table,
    //highlight-next-line
    FileField 
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table<IPost> rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="Title"
                />
                <Table.Column<IPost>
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
| src   <div className="required">Required</div> | Used for file path             | `string`                                                     |            |
| title                                          | Used for file title            | `string` \| `undefined`                                      | The `src` property |
| LinkProps                                      | Ant Design `<Typography>` properties | [`LinkProps`](https://ant.design/components/typography/#API) |            |
