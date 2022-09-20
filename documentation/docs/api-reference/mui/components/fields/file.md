---
id: file
title: File
---

import fileField from '@site/static/img/guides-and-concepts/fields/file/fileFieldMui.png'

This field is used to display files and it uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

## Usage

Let's see how we can use `<FileField>` with the example in the edit page.

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    List,
    // highlight-next-line
    FileField,
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
                        <TableCell align="center">Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">
                                // highlight-next-line
                                <FileField src={row.image[0].url} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </List>
    );
};

export interface IPost {
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
    <img src={fileField} alt="FileField" />
</div>

## API Reference

### Properties

| Property                                     | Description                           | Type                                                             | Default            |
| -------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------ |
| src <div className="required">Required</div> | Used for file path                    | `string`                                                         |                    |
| title                                        | Used for file title                   | `string` \| `undefined`                                          | The `src` property |
| LinkProps                                    | Material UI `<Link>` properties       | [`LinkProps`](https://mui.com/material-ui/api/link/)             |                    |
| TypographyProps                              | Material UI `<Typography>` properties | [`TypographyProps`](https://mui.com/material-ui/api/typography/) |                    |
