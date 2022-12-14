---
id: export-button
title: Export
swizzle: true
---


`<ExportButton>` is an Ant Design [`<Button>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/buttons/export/export.png" alt="Default export button" />
</div>

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { ExportButton } from "@pankod/refine-antd";

export const MyExportComponent = () => {
    return <ExportButton hideText />;
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/ExportButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::

[button]: https://ant.design/components/button/
[useexport]: /api-reference/core/hooks/import-export/useExport.md
