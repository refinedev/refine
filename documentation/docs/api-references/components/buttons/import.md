---
id: import-button
title: Import
---

import importButton from '@site/static/img/guides-and-concepts/components/buttons/import/import.png';

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as it's upload button.
It uses Ant Design's [`<Button>`][button] and [`<Upload>`][upload] components. It wraps a [`<Button>`][button] component with an [`<Upload>`][upload] component and accepts properties for [`<Button>`][button] and [`<Upload>`][upload] components separately.

## Usage

```tsx  title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    useTable,
    // highlight-start
    useImport,
    ImportButton,
    // highlight-end
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-next-line
    const importProps = useImport<IPostFile>();

    return (
        <List
            pageHeaderProps={{
                // highlight-next-line
                extra: <ImportButton {...importProps} />,
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

interface IPost {
    id: string;
    title: string;
}

interface IPostFile {
    title: string;
    categoryId: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={importButton} alt="Default import button" />
</div>

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { ImportButton, useImport } from "@pankod/refine-antd";

export const MyRefreshComponent = () => {
    const importProps = useImport();

    return <ImportButton {...importProps} hideText />;
};
```
## API Reference

### Properties

| Property    | Description                       | Type                                                       | Default    |
| ----------- | --------------------------------- | ---------------------------------------------------------- | ---------- |
| uploadProps | Sets the button type              | [`UploadProps`](https://ant.design/components/upload/#API) |            |
| buttonProps | Sets the icon component of button | [`ButtonProps`](https://ant.design/components/button/#API) |            |
| hideText    | Allows to hide button text        | `boolean`                                                  | `false`    |
| children    | Sets the button text              | `ReactNode`                                                | `"Import"` |

[useimport]: /ui-frameworks/antd/hooks/import/useImport.md
[button]: https://ant.design/components/button/
[upload]: https://ant.design/components/upload/
