---
id: import-button
title: Import
---

import importButton from '@site/static/img/hooks/useImport/import-button.png';

`<ImportButton>` uses Ant Design's [`<Button>`][Button] and [`<Upload>`][Upload] components. It wraps a [`<Button>`][Button] component with an [`<Upload>`][Upload] component and accepts props for [`<Button>`][Button] and [`<Upload>`][Upload] components separately.

It is compatible with [`useImport`][useImport] hook and is meant to be used with this hook.

## Usage

```tsx title="/src/pages/posts/list.tsx"
import { 
    List, 
    Table, 
    useTable, 
    useImport, 
    //highlight-next-line
    ImportButton 
} from "@pankod/refine";

import { IPost, IPostFile } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    //highlight-next-line
    const importProps = useImport<IPostFile>();

    return (
        <List
            pageHeaderProps={{
                //highlight-next-line
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

```

```ts title="/src/interfaces.d.ts"
export interface IPost {
    id: string;
    title: string;
}
```

Looks like this:

<div>
    <img  src={importButton} alt="Import button" />
</div>

## API Reference

### Properties

| Property    | Description                      | Type                                                       | Default     |
| ----------- | -------------------------------- | ---------------------------------------------------------- | ----------- |
| uploadProps | Set the button type              | [`UploadProps`](https://ant.design/components/upload/#API) | `undefined` |
| buttonProps | Set the icon component of button | [`ButtonProps`](https://ant.design/components/button/#API) | `undefined` |
| children    | Set the button text              | `ReactNode`                                                | `"Import"`  |

[useImport]: /api-references/hooks/import-export/useImport.md
[Button]: https://ant.design/components/button/
[Upload]: https://ant.design/components/upload/
