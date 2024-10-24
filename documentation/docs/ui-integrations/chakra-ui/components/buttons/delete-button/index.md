---
title: Delete
swizzle: true
---

```tsx live shared
const { default: sharedRouterProvider } = LegacyRefineReactRouterV6;
setRefineProps({
  legacyRouterProvider: sharedRouterProvider,
  Layout: RefineChakra.Layout,
  Sider: () => null,
  catchAll: <RefineChakra.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </ChakraUI.ChakraProvider>
  );
};
```

`<DeleteButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) and [`<Popover>`](https://www.chakra-ui.com/docs/components/popover#usage) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/docs/data/hooks/use-delete) method provided by your [`dataProvider`](/docs/data/data-provider).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import {
  List,
  // highlight-next-line
  DeleteButton,
} from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <DeleteButton recordItemId={getValue() as number} />
            // highlight-end
          );
        },
      },
    ],
    [],
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  return (
    <List>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const App = () => {
  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: PostList,
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, it will be read from the URL.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="123" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Clicking the button will trigger the [`useDelete`](/docs/data/hooks/use-delete) method and then the record whose resource is "post" and whose id is "123" gets deleted.

### resource

`resource` allows us to manage which resource's record is going to be deleted. By default, it will be read from the URL.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton resource="categories" recordItemId="2" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
        {
          name: "categories",
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Clicking the button will trigger the [`useDelete`](/docs/data/hooks/use-delete) method and then the record whose resource is "categories" and whose id is "2" gets deleted.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### onSuccess

`onSuccess` can be used if you want to do anything based on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resourceNameOrRouteName="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        message: "You have successfully deleted the record",
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>`.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="1" mutationMode="undoable" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

> For more information, refer to the [mutation mode docsumentation &#8594](/advanced-tutorials/mutation-mode.md)

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="1" hideText />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### accessControl

The `accessControl` prop can be used to skip the access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/docs/core/refine-component)

```tsx
import { DeleteButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what 'ok' and 'cancel' buttons text look like with the `confirmOkText` and `confirmCancelText` props.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      //hide-start
      recordItemId="1"
      //hide-end
      confirmTitle="Custom Title"
      confirmOkText="Ok Text"
      confirmCancelText="Delete Text"
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      console.log("girdi");
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/DeleteButton" />
