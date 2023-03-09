---
id: import-button
title: Import
swizzle: true
---

```tsx live shared
const { default: routerProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
    legacyRouterProvider: routerProvider,
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    notificationProvider: RefineMantine.notificationProvider,
    Layout: RefineMantine.Layout,
    Sider: () => null,
    catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
    return (
        <MantineCore.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <MantineCore.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <MantineNotifications.NotificationsProvider position="top-right">
                {children}
            </MantineNotifications.NotificationsProvider>
        </MantineCore.MantineProvider>
    );
};
```

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as it's upload button.

It uses Mantine [`<Button>`][button] component and native html [`<input>`][input] element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<Button>`][button] component and [`<input>`][input] element and accepts it's own properties for separately.

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";

// visible-block-start
//highlight-next-line
import { useImport, useNotification } from "@refinedev/core";
import {
    List,
    //highlight-next-line
    ImportButton,
} from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
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

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    //highlight-start
    const { open } = useNotification();

    const { inputProps, isLoading } = useImport({
        onFinish: () => {
            open?.({
                message: "Import successfully completed",
                type: "success",
            });
        },
    });
    //highlight-end

    return (
        <List
            headerButtons={
                // highlight-next-line
                <ImportButton loading={isLoading} inputProps={inputProps} />
            }
        >
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

const App = () => {
    return (
        <Refine
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

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";

// visible-block-start
import { ImportButton } from "@refinedev/mantine";

const MyImportComponent = () => {
    return <ImportButton hideText />;
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: MyImportComponent,
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

<PropsTable module="@refinedev/mantine/ImportButton" />

[useimport]: /api-reference/core/hooks/import-export/useImport.md
[button]: https://mantine.dev/core/button/
[input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
