---
id: boolean
title: Boolean
swizzle: true
---


This field is used to display boolean values. It uses the [`<Tooltip>`](https://mui.com/material-ui/react-tooltip/#main-content) values from Material UI.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/fields/boolean/booleanFieldMui.png" alt="BooleanField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://mui.com/material-ui/material-icons/)"
falseIcon-default="[`<CloseOutlined />`](https://mui.com/material-ui/material-icons/)"
/>

:::tip External Props
It also accepts all props of Material UI [Tooltip](https://mui.com/material-ui/react-tooltip/#main-content).
:::
