---
title: Text
swizzle: true
---

This field lets you show basic text. It uses Material UI's [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how to use it in a basic list page:

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  {
    field: "title",
    headerName: "Title",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return <TextField value={row.title} />;
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
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostsList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/TextField" />

:::simple External Props

It also accepts all props of Material UI [Typography](https://mui.com/material-ui/react-typography/#main-content).

:::
