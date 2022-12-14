---
id: image
title: Image
swizzle: true
---


This field is used to display images and uses [`<Image>`](https://ant.design/components/image/#header) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<ImageField>` with the example in the edit page.

```tsx
import { 
    List,
    Table,
    // highlight-next-line
    ImageField,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table<IPost> rowKey="id">
                <Table.Column<IPost>
                    title="Image"
                    dataIndex="image"
                    render={(_, record) => (
                        // highlight-start
                        <ImageField
                            value={record.image[0].url}
                            title={record.image[0].name}
                            width={200}
                        />
                        // highlight-end
                    )}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
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
            name: string;
        },
    ];
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/image/imageField.png" alt="ImageField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/ImageField" value-description="Image path"/>

:::tip External Props
It also accepts all props of Ant Design [Image](https://ant.design/components/image/#API).
:::