---
title: Tag
swizzle: true
---

This field lets you display a value in a tag. It uses Material UI's [`<Chip>`](https://mui.com/material-ui/react-chip/#main-content) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use it in a basic list page:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  TagField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "status",
    headerName: "Status",
    renderCell: function render({ row }) {
      // highlight-start
      return <TagField value={row.status} />;
      // highlight-end
    },
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

<PropsTable module="@refinedev/mui/TagField" value-description="Tag content" />

:::simple External Props

It also accepts all props of Material UI [Chip](https://mui.com/material-ui/react-chip/#main-content).

:::
