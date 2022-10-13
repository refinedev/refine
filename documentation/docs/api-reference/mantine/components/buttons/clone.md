---
id: clone-button
title: Clone
---

```tsx live shared
setRefineProps({
    Sider: () => null,
    Layout: RefineMantine.Layout,
    notificationProvider: RefineMantine.notificationProvider,
    catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
    return (
        <RefineMantine.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <RefineMantine.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMantine.NotificationsProvider position="top-right">
                {children}
            </RefineMantine.NotificationsProvider>
        </RefineMantine.MantineProvider>
    );
};
```

`<CloneButton>` uses Mantine's [`<Button>`](https://mantine.dev/core/button/) component. It uses the `clone` method from [useNavigation](/api-reference/core/hooks/navigation/useNavigation.md) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { List, Table, Pagination, CloneButton } from "@pankod/refine-mantine";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

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
                        <CloneButton
                            size="xs"
                            recordItemId={getValue() as number}
                        />
                        // highlight-end
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    //hide-start
    List.defaultProps = {
        headerButtons: <></>,
    };
    //hide-end

    return (
        <List>
            <Table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
}
// visible-block-end

const ClonePage = () => {
    const { list } = useNavigation();
    const params = useRouterContext().useParams();

    return (
        <div>
            <Text italic color="dimmed" size="sm">
                URL Parameters:
            </Text>
            <Code>{JSON.stringify(params)}</Code>
            <Space h="md" />
            <Button size="xs" variant="outline" onClick={() => list("posts")}>
                Go back
            </Button>
        </div>
    );
};

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
    return <CloneButton recordItemId="1" />;
};
// visible-block-end

const ClonePage = () => {
    const { list } = useNavigation();
    const params = useRouterContext().useParams();

    return (
        <div>
            <Text italic color="dimmed" size="sm">
                URL Parameters:
            </Text>
            <Code>{JSON.stringify(params)}</Code>
            <Space h="md" />
            <Button size="xs" variant="outline" onClick={() => list("posts")}>
                Go back
            </Button>
        </div>
    );
};

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/clone/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
    return (
        <CloneButton resourceNameOrRouteName="categories" recordItemId="2" />
    );
};
// visible-block-end

const ClonePage = () => {
    const { list } = useNavigation();
    const params = useRouterContext().useParams();

    return (
        <div>
            <Text italic color="dimmed" size="sm">
                URL Parameters:
            </Text>
            <Code>{JSON.stringify(params)}</Code>
            <Space h="md" />
            <Button size="xs" variant="outline" onClick={() => list("posts")}>
                Go back
            </Button>
        </div>
    );
};

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
    return <CloneButton hideText />;
};
// visible-block-end

const ClonePage = () => {
    const { list } = useNavigation();
    const params = useRouterContext().useParams();

    return (
        <div>
            <Text italic color="dimmed" size="sm">
                URL Parameters:
            </Text>
            <Code>{JSON.stringify(params)}</Code>
            <Space h="md" />
            <Button size="xs" variant="outline" onClick={() => list("posts")}>
                Go back
            </Button>
        </div>
    );
};

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { CloneButton } from "@pankod/refine-mantine";

export const MyListComponent = () => {
    return <CloneButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/CloneButton" />
