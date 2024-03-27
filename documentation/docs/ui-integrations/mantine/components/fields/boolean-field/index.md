---
title: Boolean
swizzle: true
---

```tsx live shared
const { default: routerProvider } = LegacyRefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  legacyRouterProvider: routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  notificationProvider: RefineMantine.useNotificationProvider,
  Layout: RefineMantine.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <MantineCore.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <MantineCore.Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <MantineNotifications.NotificationsProvider position="top-right">
        {children}
      </MantineNotifications.NotificationsProvider>
    </MantineCore.MantineProvider>
  );
};
```

This field is used to display boolean values. It uses the [`<Tooltip>`](https://mantine.dev/core/tooltip) values from Mantine.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";

// visible-block-start
import { List, BooleanField } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { IconX, IconCheck } from "@tabler/icons-react";

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
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <BooleanField
              value={getValue() === "published"}
              trueIcon={<IconCheck />}
              falseIcon={<IconX />}
              valueLabelTrue="published"
              valueLabelFalse="unpublished"
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  status: "published" | "draft" | "rejected";
}
// visible-block-end

const App = () => {
  return <Refine resources={[{ name: "posts", list: PostList }]} />;
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/BooleanField" title-description="The text shown in the tooltip" title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" trueIcon-default="[`<IconCheck />`](https://tabler-icons.io/i/check)" falseIcon-default="[`<IconX />`](https://tabler-icons.io/i/x)" />

:::simple External Props

It also accepts all props of Mantine [Tooltip](https://mantine.dev/core/tooltip?t=props).

:::
