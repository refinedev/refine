---
id: csv-export
title: CSV Export
---

With **refine**, you can easily create an export button that dumps resources' records to a `csv` file from any button by using [`useExport`][useExport] hook with required configurations. Which resources' records to download from can be configured and unless explicitly specified, it is inferred from current route.

## Usage

Let's see an example:

```tsx title=""
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
    const exportButtonProps = useExport();

    return (
        <List
            pageHeaderProps={{
                //highlight-next-line
                extra: <ExportButton {...exportButtonProps} />,
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

`useExport` returns two props: `loading: boolean` and `onClick: () => void`. These props match with Ant Design's [`<Button>`][Button] components interface. `<ExportButton>` is just an Ant Design [`<Button>`][Button] with default icon and children, serving only presentational purposes.

> [Refer to useExport docs for more detailed information and export settings. &#8594][useExport]

> [Refer to ExportButton docs for more detailed information. &#8594][ExportButton]

[Button]: https://ant.design/components/button/
[useExport]: api-references/hooks/import-export/useExport.md
[ExportButton]: api-references/components/buttons/export.md
