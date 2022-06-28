---
id: text
title: Text
---

import textField from '@site/static/img/guides-and-concepts/fields/text/textFieldMui.png';

This field lets you show basic text. It uses Material UI [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) component.

## Usage

Let's see how to use it in a basic list page:

```tsx title="src/pages/posts/list.tsx"
import { useTable, useMany } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    // highlight-next-line
    TableRow,
    List,
    TextFieldComponent,
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

    const categoryIds =
        tableQueryResult?.data?.data?.map((post) => post.categoryId) || [];

    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { data } = tableQueryResult;

    return (
        <List>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell>
                                // highlight-start
                                <TextFieldComponent
                                    value={
                                        isLoading
                                            ? "Loading..."
                                            : categoriesData?.data.find(
                                                  (item) => item.id === row.id,
                                              )?.title
                                    }
                                />
                                // highlight-end
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    categoryId: string;
}

interface ICategory {
    id: number;
    title: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={textField} alt="TagField" />
</div>

## API Reference

### Properties

| Property | Description             | Type                    |
| -------- | ----------------------- | ----------------------- |
| value    | Markdown data to render | `string` \| `undefined` |

[Refer to Text props &#8594](https://ant.design/components/typography/#Typography.Text)
