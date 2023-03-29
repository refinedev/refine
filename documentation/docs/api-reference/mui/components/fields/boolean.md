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

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
    useDataGrid,
    List,
    // highlight-next-line
    BooleanField,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Close, Check } from "@mui/icons-material"

const columns: GridColumns = [
    { field: "id", headerName: "ID", type: "number" },
    { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
    {
        field: "status",
        headerName: "Published",
        renderCell: function render({ row }) {
            // highlight-start
            return (
                <BooleanField
                    value={row.status === "published"}
                    trueIcon={<Check />}
                    falseIcon={<Close />}
                    valueLabelTrue="published"
                    valueLabelFalse="unpublished"
                />
            );
            // highlight-end
        },
        align: "center",
        headerAlign: "center",
        minWidth: 100,
        flex: 1,
    },
];

const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
// visible-block-end

render(
    <RefineMuiDemo
        resources={[
            {
                name: "posts",
                list: PostsList,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://mui.com/material-ui/material-icons/)"
falseIcon-default="[`<CloseOutlined />`](https://mui.com/material-ui/material-icons/)"
/>

:::tip External Props
It also accepts all props of Material UI [Tooltip](https://mui.com/material-ui/react-tooltip/#main-content).
:::
