---
id: url
title: Url
---

This field lets you embed a link. It uses [Ant Design's <Typography.Link\>](https://ant.design/components/typography/) component. You can pass a url in its `value` prop. And you can show a text in its place by passing any `children`.

## Usage

Let's see how to use `<UrlField>` with an example:

```tsx title="pages/posts/list.tsx"
import * as React from "react";

import { List, Table, useTable, UrlField } from "@pankod/refine";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table<IPost> {...tableProps} key="id">
                <Table.Column<IPost>
                    dataIndex="title"
                    title="Title"
                    key="title"
                />
                <Table.Column<IPost>
                    dataIndex={["image", "0", "url"]}
                    title={"Image"}
                    key="image"
                    render={(value: string) => <UrlField value={value} />}
                />
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
interface IPost {
    title: string;
    image: IImage[];
}

interface IImage {
    url: string;
}
```

## API Reference

### Properties

| Property | Description                  | Type        |
| -------- | ---------------------------- | ----------- |
| value    | Url for link to reference to | `string`    |
| children | What to show instead of url  | `ReactNode` |
