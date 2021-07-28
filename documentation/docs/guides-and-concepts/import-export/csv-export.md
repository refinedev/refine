---
id: csv-export
title: CSV Export
---

With **refine**, you can easily add export functionality to dump resources' records to a `CSV` file from anywhere, including buttons. By using the [`useExport`][useExport] hook with desired configurations, you can turn any button into an export button.  Which resources' records to export can be configured. But by default, unless explicitly specified, it is inferred from current route of browser.

## Usage

Let's see an example:

```tsx title="pages/posts/list.tsx"
import {
    List,
    Table,
    useTable,
    //highlight-start
    useExport,
    ExportButton,
    //highlight-end
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    //highlight-next-line
    const { triggerExport, loading } = useExport<IPost>();

    return (
        <List
            pageHeaderProps={{
                extra: (
                    //highlight-next-line
                    <ExportButton onClick={triggerExport} loading={loading} />
                ),
            }}
        >
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

```

After this setup is done, when the user clicks the button, download process will initialize.

Manually running the `triggerExport` function is another option.

`useExport` returns two properties: `loading: boolean` and `triggerExport: async () => void`. These properties can be used with Ant Design's [`<Button>`][Button] components to create an export button. In this example, `<ExportButton>` is used and it's just an Ant Design [`<Button>`][Button] with default icon and children, serving only presentational purposes.

> [Refer to the useExport docs for more detailed information and export settings. &#8594][useExport]

> [Refer to the ExportButton docs for more detailed information. &#8594][ExportButton]

[Button]: https://ant.design/components/button/
[useExport]: api-references/hooks/import-export/useExport.md
[ExportButton]: api-references/components/buttons/export.md
