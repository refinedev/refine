---
id: file
title: File
swizzle: true
---


This field is used to display files and uses [`<Typography.Link>`](https://ant.design/components/typography) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<FileField>` with the example in the edit page. 

```tsx
import { 
    List,
    Table,
    // highlight-next-line
    FileField 
} from "@pankod/refine-antd";

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
                        // highlight-next-line
                        <FileField src={record.image[0].url} />
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    image: [
        {
            url: string;
        },
    ];
}
```

:::tip
If you don't use `title` prop it will use `src` as `title`
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/file/fileField.png" alt="FileField" />
</div>


## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/FileField" />

:::tip External Props
It also accepts all props of Ant Design [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router).
:::
