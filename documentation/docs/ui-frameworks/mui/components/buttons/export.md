---
id: export-button
title: Export
---

import exportButton from '@site/static/img/guides-and-concepts/components/buttons/export/export-mui.png';

`<ExportButton>` is a Material UI [`<LoadingButton>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

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
    <img src={exportButton} alt="Default export button" />
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

| Property     | Description                           | Type                                                                                 | Default                                                                                                                                        |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| props        | Material UI loading button properties | [`LoadingButtonProps`](https://mui.com/material-ui/api/loading-button/#main-content) |                                                                                                                                                |
| hideText     | Allows to hide button text            | `boolean`                                                                            | `false`                                                                                                                                        |
| loading      | Sets the loading status of the button | `boolean`                                                                            | When the request is not completed, loading is `true`, when it completes it's `false`                                                           |
| children     | Sets the button text                  | `ReactNode`                                                                          | `"Export"`                                                                                                                                     |
| startIcon    | Sets the icon component of button     | `ReactNode`                                                                          | [`<ImportExportOutlinedIcon />`](https://mui.com/material-ui/material-icons/?theme=Outlined&query=import+export&selected=ImportExportOutlined) |
| svgIconProps | Allows to set icon props              | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props)                    |                                                                                                                                                |

[button]: https://mui.com/material-ui/api/loading-button/#main-content
[useexport]: /core/hooks/import-export/useExport.md
