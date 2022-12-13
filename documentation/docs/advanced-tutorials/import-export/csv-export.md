---
id: csv-export
title: CSV Export
---


With **refine**, you can easily add export functionality to dump resources' records to a `CSV` file from anywhere, including buttons. By using the [`useExport`][useexport] hook with desired configurations, you can turn any button into an export button. Which resources' records to export can be configured. But by default, unless explicitly specified, it is inferred from current route of browser.

## Usage

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package.
:::

Let's see an example:

```tsx title="pages/posts/list.tsx"
import {
    // highlight-next-line
    useExport,
} from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    ExportButton,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-next-line
    const { triggerExport, isLoading } = useExport<IPost>();

    return (
        <List
            pageHeaderProps={{
                extra: (
                    // highlight-next-line
                    <ExportButton onClick={triggerExport} loading={isLoading} />
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

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/csv-export/export-button.png" alt="Export button" />
</div>
<br />

After this setup is done, when the user clicks the button, download process will initialize.

Manually running the `triggerExport` function is another option.

`useExport` returns two properties: `isLoading: boolean` and `triggerExport: async () => void`. These properties can be used with Ant Design's [`<Button>`][button] components to create an export button. In this example, `<ExportButton>` is used and it's just an Ant Design [`<Button>`][button] with default icon and children, serving only presentational purposes.

> [Refer to the useExport docs for more detailed information and export settings. &#8594][useexport]

> [Refer to the ExportButton docs for more detailed information. &#8594][exportbutton]

## Example

<StackblitzExample path="import-export-antd" />

[button]: https://ant.design/components/button/
[useexport]: /api-reference/core/hooks/import-export/useExport.md
[exportbutton]: /api-reference/antd/components/buttons/export.md
