---
id: url
title: Url
swizzle: true
---


This field lets you embed a link. It uses Ant Design's [<Typography.Link\>](https://ant.design/components/typography/) component. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<UrlField>` with an example:

```tsx  title="pages/posts/list.tsx"
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    UrlField 
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    key="title"
                />
                <Table.Column
                    dataIndex={["image", "0", "url"]}
                    title={"Image"}
                    key="image"
                    // highlight-next-line
                    render={(value: string) => <UrlField value={value} />}
                />
            </Table>
        </List>
    );
};

interface IPost {
    title: string;
    image: IImage[];
}

interface IImage {
    url: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/url/urlField.png" alt="UrlField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/UrlField" value-description="URL for link to reference to"/>

:::tip External Props
It also accepts all props of Ant Design [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router).
:::