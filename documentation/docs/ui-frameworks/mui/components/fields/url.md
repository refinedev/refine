---
id: url
title: Url
---

import urlField from '@site/static/img/guides-and-concepts/fields/url/urlFieldMui.png'

This field lets you embed a link. It uses Material UI [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) and [`Link`](https://mui.com/material-ui/react-link/#main-content) components. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

## Usage

Let's see how we can use `<UrlField>` with an example:

```tsx title="pages/posts/list.tsx"
import { useTable, useMany } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    List,
    // highlight-next-line
    UrlField,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    const { data } = tableQueryResult;

    return (
        <List>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell>
                                // highlight-next-line
                                <UrlField value={row.image[0].url} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
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
