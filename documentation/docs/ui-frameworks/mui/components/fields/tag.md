---
id: tag
title: Tag
---

import tagField from '@site/static/img/guides-and-concepts/fields/tag/tagFieldMui.png';

This field lets you display a value in a tag. It uses Material UI [`<Chip>`](https://mui.com/material-ui/react-chip/#main-content) component.

## Usage

Let's see how we can use it in a basic list page:

```tsx title="pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    List,
    // highlight-next-line
    TagField,
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
                        <TableCell align="center">Status</TableCell>
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
                                <TagField value={row.status} />
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
    status: "published" | "draft" | "rejected";
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={tagField} alt="TagField" />
</div>

## API Reference

### Properties

| Property | Description | Type              |
| -------- | ----------- | ----------------- |
| value    | Tag content | `React.ReactNode` |

[Refer to the documentation for rest of Link props &#8594](https://ant.design/components/tag/#API)
