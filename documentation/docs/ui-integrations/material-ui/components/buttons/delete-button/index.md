---
title: Delete
swizzle: true
---

`<DeleteButton>` uses Material UI's [`<LoadingButton>`](https://mui.com/material-ui/api/loading-button/#main-content) and [`<Dialog>`](https://mui.com/material-ui/react-dialog/) components.

When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed, it executes the [`useDelete`](/docs/data/hooks/use-delete) method provided by your [`dataProvider`](/docs/data/data-provider).

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
const { Create } = RefineMui;
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  DeleteButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: function render({ row }) {
      // highlight-next-line
      return <DeleteButton size="small" recordItemId={row.id} />;
    },
    align: "center",
    headerAlign: "center",
    minWidth: 80,
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
}
// visible-block-end

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: PostsList,
      },
    ]}
  />,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;

import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/mui";

const MyDeleteComponent = () => {
  return <DeleteButton resource="posts" recordItemId="1" />;
};

// visible-block-end

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

Clicking the button will trigger the [`useDelete`](/docs/data/hooks/use-delete) method and then the record whose resource is `post` and whose id is `1` gets deleted.

### resource

`resource` allows us to manage which resource's record is going to be deleted.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/mui";

const MyDeleteComponent = () => {
  return <DeleteButton resource="categories" recordItemId="2" />;
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### onSuccess

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resource="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>`.

```tsx
import { useTable } from "@refinedev/core";

import {
  List,
  // highlight-next-line
  DeleteButton,
} from "@refinedev/mui";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/x-data-grid";

export const PostList: React.FC = () => {
  const { tableQuery } = useTable<IPost>();

  const { data } = tableQuery;

  return (
    <List>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">
                <DeleteButton
                  recordItemId={row.id}
                  // highlight-next-line
                  mutationMode="undoable"
                />
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
}
```

> For more information, refer to the [mutation mode documentation &#8594](/advanced-tutorials/mutation-mode.md)

### hideText

`hideText` is used to show or hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-next-line
      hideText={true}
    />
  );
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/docs/core/refine-component)

```tsx
import { DeleteButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what 'ok' and 'cancel' buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-start
      confirmTitle="Title"
      confirmOkText="Ok Text"
      confirmCancelText="Delete Text"
      // highlight-end
    />
  );
};
// visible-block-end

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

## API Reference

### Props

<PropsTable module="@refinedev/mui/DeleteButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).

:::
