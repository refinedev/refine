---
id: date
title: Date
---

import dateField from '@site/static/img/guides-and-concepts/fields/date/dateFieldMui.png'

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

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
    DateField,
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
                        <TableCell align="center">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">
                                // highlight-next-line
                                <DateField value={row.createdAt} />
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
    createdAt: string;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={dateField} alt="DateField" />
</div>

## API Reference

### Properties

| Property                                                                                         | Description                                                              | Type                                            | Default |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------- | ------- |
| <div className="required-block"><div>value</div> <div className=" required">Required</div></div> | Date value                                                               | `string` \| `number` \| `Date` \| `dayjs.Dayjs` |         |
| [format](https://day.js.org/docs/en/display/format)                                              | Gets the formatted date according to the string of the tokens passed in. | `string` \| `undefined`                         | `"L"`   |

[Refer to Text props &#8594](https://ant.design/components/typography/#Typography.Text)
