---
id: import-button
title: Import
---

import importButton from '@site/static/img/guides-and-concepts/components/buttons/import/import-mui.png';

`<ImportButton>` is compatible with the `useImport` hook and is meant to be used as it's upload button. It uses Material UI [`<LoadingButton>`][button] component and native html [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<LoadingButton>`][button] component and [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element and accepts it's own properties for separately.

[Refer to the for more detailed information about `useImport`. &#8594][useimport]

## Usage

Use it like any other Material UI [`<LoadingButton>`][button]. You can use it with [useImport][useimport]:

```tsx title="/src/pages/posts/list.tsx"
// highlight-next-line
import { useTable, useImport } from "@pankod/refine-core";
import {
    // highlight-next-line
    ImportButton,
    List,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>();
    // highlight-next-line
    const { inputProps, isLoading } = useImport<IPost>();

    return (
        <List
            cardHeaderProps={{
                action: (
                    // highlight-next-line
                    <ImportButton inputProps={inputProps} loading={isLoading} />
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
    <img src={importButton} alt="Default export button" />
</div>

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ImportButton } from "@pankod/refine-mui";

export const MyImportComponent = () => {
    return <ImportButton hideText />;
};
```

## API Reference

### Properties

| Property     | Description                           | Type                                                                                 | Default                                                                                                                                        |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| props        | Material UI loading button properties | [`LoadingButtonProps`](https://mui.com/material-ui/api/loading-button/#main-content) |                                                                                                                                                |
| inputProps   | Allows to set input props             | [`UseImportInputPropsType`](/core/interfaces.md#useimportinputpropstype)             |
| hideText     | Allows to hide button text            | `boolean`                                                                            | `false`                                                                                                                                        |
| loading      | Sets the loading status of the button | `boolean`                                                                            | When the request is not completed, loading is `true`, when it completes it's `false`                                                           |
| children     | Sets the button text                  | `ReactNode`                                                                          | `"Import"`                                                                                                                                     |
| startIcon    | Sets the icon component of button     | `ReactNode`                                                                          | [`<ImportExportOutlinedIcon />`](https://mui.com/material-ui/material-icons/?theme=Outlined&query=import+export&selected=ImportExportOutlined) |
| svgIconProps | Allows to set icon props              | [`SvgIconProps`](https://mui.com/material-ui/api/svg-icon/#props)                    |                                                                                                                                                |

[button]: https://mui.com/material-ui/api/loading-button/#main-content
[useimport]: /core/hooks/import-export/useImport.md
