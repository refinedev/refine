---
id: export-button
title: Export
---

import usage from '@site/static/img/guides-and-concepts/components/buttons/export/usage.png';

You can easily export csv files for any resource by using refine's customizable `<ExportButton>` component.

## Usage

```tsx
//highlight-next-line
import { List, Table, ExportButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        //highlight-next-line
        <List pageHeaderProps={{ extra: <ExportButton /> }}>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
```

```ts
export interface IPost {
    id: string;
    title: string;
}
```

Looks like this:

<div>
    <img src={usage} alt="Default Export Button" />
</div>
