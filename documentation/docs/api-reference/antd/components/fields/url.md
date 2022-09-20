---
id: url
title: Url
---

import urlField from '@site/static/img/guides-and-concepts/fields/url/urlField.png'

This field lets you embed a link. It uses Ant Design's [<Typography.Link\>](https://ant.design/components/typography/) component. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

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
    <img src={urlField} alt="UrlField" />
</div>

## API Reference

### Properties

| Property | Description                  | Type        |
| -------- | ---------------------------- | ----------- |
| value    | URL for link to reference to | `string`    |
| children | What to show instead of URL  | `ReactNode` |
