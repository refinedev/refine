---
id: boolean
title: Boolean
---

import booleanField from '@site/static/img/guides-and-concepts/fields/boolean/booleanFieldMui.png'

This field is used to display boolean values. It uses the [`<Tooltip>`](https://mui.com/material-ui/react-tooltip/#main-content) values from Material UI.

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    // highlight-next-line
    BooleanField,
    List,
} from "@pankod/refine-mui";
import { Check, Close } from "@mui/icons-material";

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
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">
                                // highlight-start
                                <BooleanField
                                    value={row.status === "published"}
                                    trueIcon={<Check />}
                                    falseIcon={<Close />}
                                    valueLabelTrue="published"
                                    valueLabelFalse="unpublished"
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

export interface IPost {
    id: number;
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
    <img src={booleanField} alt="BooleanField" />
</div>

## API Reference

### Properties

| Property             | Description                                  | Type                                                               | Default                                                                                                               |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| value                | Field value                                  | `unknown`                                                          |                                                                                                                       |
| valueLabelTrue       | If there is a value, this is the text to use | `string`                                                           | `"true"`                                                                                                              |
| valueLabelFalse      | If there no value, this is the text to use   | `string`                                                           | `"false"`                                                                                                             |
| trueIcon             | If there is a value, this is the icon to use | `React.FC` \| `object`                                             | [`<CheckOutlined />`](https://mui.com/material-ui/material-icons/?query=check&theme=Outlined&selected=CheckOutlined)  |
| falseIcon            | If there no value, this is the icon to use.  | `React.FC` \| `object`                                             | [`<CloseOutlined />`](https://mui.com/material-ui/material-icons/?query=close+&theme=Outlined&selected=CloseOutlined) |
| svgIconProps         | Allows to set icon props                     | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props)  |                                                                                                                       |
| AbstractTooltipProps | Material UI `Tooltip` properties             | [`AbstractTooltipProps`](https://mui.com/material-ui/api/tooltip/) |                                                                                                                       |
