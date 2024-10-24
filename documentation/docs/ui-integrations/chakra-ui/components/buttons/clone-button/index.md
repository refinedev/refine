---
title: Clone
swizzle: true
---

```tsx live shared
const { default: sharedRouterProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  legacyRouterProvider: sharedRouterProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
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

const ClonePage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useRouterContext().useParams();

  return (
    <ChakraUI.VStack alignItems="flex-start">
      <ChakraUI.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </ChakraUI.Text>
      <ChakraUI.Code>{JSON.stringify(params)}</ChakraUI.Code>

      <ChakraUI.Button
        size="sm"
        onClick={() => list("posts")}
        colorScheme="green"
      >
        Go back
      </ChakraUI.Button>
    </ChakraUI.VStack>
  );
};
```

`<CloneButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses the `clone` method from [useNavigation](/docs/routing/hooks/use-navigation) under the hood.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";

// visible-block-start
import {
  List,
  // highlight-next-line
  CloneButton,
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
            <CloneButton recordItemId={getValue() as number} />
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

  //hide-start
  List.defaultProps = {
    headerButtons: <></>,
  };
  //hide-end

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
      legacyRouterProvider={routerProvider}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: ClonePage,
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

`recordItemId` is used to append the record id to the end of the route path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  return <CloneButton colorScheme="black" recordItemId="123" />;
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          create: ClonePage,
          list: MyCloneComponent,
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

:::simple Good to know

**`<CloneButton>`** component reads the id information from the route by default.

:::

### resource

`resource` is used to redirect the app to the `clone` action of the given resource name. By default, the app redirects to the inferred resource's `clone` action path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  return (
    <CloneButton colorScheme="black" resource="categories" recordItemId="2" />
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: MyCloneComponent,
        },
        {
          name: "categories",
          create: ClonePage,
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `clone` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `clone` action route is defined by the pattern: `/posts/:authorId/clone/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CloneButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  return <CloneButton colorScheme="black" hideText />;
};
// visible-block-end

const App = () => {
  return (
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: MyCloneComponent,
          create: ClonePage,
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
import { CloneButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/CloneButton" />
