---
id: export-button
title: Export
---

import exportButton from '@site/static/img/guides-and-concepts/components/buttons/export/export.png';

`<ExportButton>` is an Ant Design [`<Button>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

## Usage

Use it like any other Ant Design [`<Button>`][button]. You can use it with [useExport][useexport]:

```tsx  title="/src/pages/posts/list.tsx"
import { useExport } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    ExportButton,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const { triggerExport, isLoading: exportLoading } = useExport<IPost>();

    return (
        <List
            pageHeaderProps={{
                extra: (
                    // highlight-start
                    <ExportButton
                        onClick={triggerExport}
                        loading={exportLoading}
                    />
                    // highlight-end
                ),
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
import { ExportButton } from "@pankod/refine-antd";

export const MyRefreshComponent = () => {
    return <ExportButton hideText />;
};
```

## API Reference

### Properties

| Property | Description                       | Type                                                                                   | Default                                                     |
| -------- | --------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| props    | Ant Design button properties      | [`ButtonProps`](https://ant.design/components/button/#API) & `{ hideText?: boolean; }` |                                                             |
| hideText | Allows to hide button text        | `boolean`                                                                              | `false`                                                     |
| children | Sets the button text              | `ReactNode`                                                                            | `"Export"`                                                  |
| icon     | Sets the icon component of button | `ReactNode`                                                                            | [`<ExportOutlined />`](https://ant.design/components/icon/) |

[button]: https://ant.design/components/button/
[useexport]: /core/hooks/import-export/useExport.md
