---
id: export-button
title: Export
swizzle: true
---


`<ExportButton>` is a Material UI [`<LoadingButton>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

Use it like any other Ant Design [`<Button>`][button]. You can use it with [useExport][useexport]:

```tsx title="/src/pages/posts/list.tsx"
// highlight-next-line
import { useExport, useTable } from "@pankod/refine-core";
import {
    ExportButton,
    List,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>();

    const { triggerExport, isLoading: exportLoading } = useExport<IPost>();

    return (
        <List
            cardHeaderProps={{
                action: (
                    // highlight-start
                    <ExportButton
                        onClick={triggerExport}
                        loading={exportLoading}
                    />
                    // highlight-end
                ),
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableQueryResult.data?.data.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
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

It looks like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/export/export-mui.png" alt="Default export button" />
</div>

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ExportButton } from "@pankod/refine-mui";

export const MyRefreshComponent = () => {
    return <ExportButton hideText />;
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ExportButton" />

:::tip External Props
It also accepts all props of Material UI [LoadingButton](https://mui.com/material-ui/api/loading-button/#main-content).
:::                             

[button]: https://mui.com/material-ui/api/loading-button/#main-content
[useexport]: /api-reference/core/hooks/import-export/useExport.md
