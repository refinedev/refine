---
id: create-button
title: Create
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

const CreatePage = () => {
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

`<CreateButton>` uses UI's [`<Button>`](https://chakra-ui.com/docs/components/button/usage) component. It uses the `create` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the create page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import {
    List,
    // highlight-next-line
    CreateButton,
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
        ],
        [],
    );

    const { getHeaderGroups, getRowModel } = useTable({
        columns,
    });

    return (
        // highlight-next-line
        <List headerButtons={<CreateButton />}>
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
                                                    header.column.columnDef
                                                        .header,
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
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: CreatePage,
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

### `resource`

It is used to redirect the app to the `create` action path of the given resource name. By default, the app redirects to the inferred resource's `create` action path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { CreateButton } from "@refinedev/chakra-ui";

const MyCreateComponent = () => {
    return (
        <CreateButton
            colorScheme="black"
            resource="categories"
        />
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyCreateComponent,
                },
                {
                    name: "categories",
                    create: CreatePage,
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

Clicking the button will trigger the `create` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `create` action path of the resource, filling the necessary parameters in the route.

### `meta`

It is used to pass additional parameters to the `create` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md). By default, existing parameters in the route are used by the `create` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `create` action route is defined by the pattern: `/posts/:authorId/create`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
    return (
        <CreateButton meta={{ authorId: "10" }} />
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { CreateButton } from "@refinedev/chakra-ui";

const MyCreateComponent = () => {
    return <CreateButton colorScheme="black" hideText />;
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyCreateComponent,
                    create: CreatePage,
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

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { CreateButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
    return (
        <CreateButton
            accessControl={{ enabled: true, hideIfUnauthorized: true }}
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { CreateButton } from "@refinedev/chakra-ui";

const MyCreateComponent = () => {
    return (
        <CreateButton
            colorScheme="black"
            resourceNameOrRouteName="categories"
        />
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyCreateComponent,
                },
                {
                    name: "categories",
                    create: CreatePage,
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

Clicking the button will trigger the `create` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect to `/posts/create`.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/CloneButton" />
