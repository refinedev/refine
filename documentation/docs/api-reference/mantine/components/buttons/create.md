---
id: create-button
title: Create
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

`<CreateButton>` uses Mantine [`<Button>`](https://mantine.dev/core/button/) component. It uses the `create` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the create page route of resource.

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine, useNavigation, useRouterContext } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { List, Table, Pagination, CreateButton } from "@pankod/refine-mantine";
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

    return (
        // highlight-next-line
        <List headerButtons={<CreateButton />}>
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

const CreatePage = () => {
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

### `resourceNameOrRouteName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { CreateButton } from "@pankod/refine-mantine";

const MyCreateComponent = () => {
    return <CreateButton resourceNameOrRouteName="categories" />;
};
// visible-block-end

const CreatePage = () => {
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

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { CreateButton } from "@pankod/refine-mantine";

const MyCreateComponent = () => {
    return <CreateButton hideText />;
};
// visible-block-end

const CreatePage = () => {
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

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { CreateButton } from "@pankod/refine-mantine";

export const MyListComponent = () => {
    return <CreateButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/CloneButton" />
