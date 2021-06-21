---
id: import-button
title: Import
---

import usage from '@site/static/img/guides-and-concepts/components/buttons/import/usage.png';

You can easily import csv files for any resource by using refine's customizable `<ImportButton>` component. refine uses `paparse` parser under the hood to parse csv files.

## Usage

```tsx
//highlight-next-line
import { List, Table, ImportButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        //highlight-next-line
        <List pageHeaderProps={{ extra: <ImportButton /> }}>
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
    <img src={usage} alt="Default Import Button" />
</div>
