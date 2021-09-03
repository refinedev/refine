---
id: useShow
title: useShow
---

import showUsage from '@site/static/img/guides-and-concepts/hooks/useShow/show-usage.png';
import modalUsage from '@site/static/img/guides-and-concepts/hooks/useShow/modal-usage.png';

`useShow` hook allows you to fetch the desired record. It uses `getOne` method as query function from the dataProvider that is passed to `<Refine>`.

```tsx
const { queryResult } = useShow();
```

When no property is given, it tries to read the `resource` and `id` information from the route.

## Usage

First, we'll create a page to show the records. Then we'll use this page for the show property of the `<Resource>` component.

```tsx title="src/pages/posts/show.tsx"
// highlight-next-line
import { useShow, Show, Typography } from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    // highlight-next-line
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};
```

```ts title="src/interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
}
```

We didn't give any property to `useShow` because it can read `resource` and `id` information from the route.

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostShow } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                //highlight-next-line
                show={PostShow}
            />
        </Refine>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={showUsage} alt="useShow Basic Usage" />
</div>


<br />

In the next example, we'll show how it is used for the modal.

Let's simply create a post list showing posts.

```tsx title="src/pages/posts/list.tsx"
import { List, Table, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
```

Let's add our modal.

```tsx title="src/pages/posts/list.tsx"
import React, { useState } from "react";
import {
    List,
    Table,
    useTable,
    //highlight-start
    Modal,
    Show,
    ShowButton,
    Typography,
    useShow,
    //highlight-end
} from "@pankod/refine";

//highlight-next-line
const { Title, Text } = Typography;

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    //highlight-next-line
    const [visible, setVisible] = useState(false);

    const { tableProps } = useTable<IPost>();

    //highlight-start
    const { queryResult, showId, setShowId } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    //highlight-end

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    //highlight-start
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => (
                            <ShowButton
                                size="small"
                                recordItemId={record.id}
                                onClick={() => {
                                    setShowId(record.id);
                                    setVisible(true);
                                }}
                            />
                        )}
                    />
                    //highlight-end
                </Table>
            </List>
            //highlight-start
            <Modal visible={visible} onCancel={() => setVisible(false)}>
                <Show isLoading={isLoading} recordItemId={showId}>
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>
                </Show>
            </Modal>
            //highlight-end
        </>
    );
};
```

Finally, let's pass this page to the `<Resource>` component.

```tsx title="src/App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
//highlight-next-line
import { PostList } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource
                name="posts"
                //highlight-next-line
                list={PostList}
            />
        </Refine>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={modalUsage} alt="useShow Modal Usage" />
</div>

<br />

:::tip
To show data in the drawer, you can do it by simply replacing `<Modal>` with `<Drawer>`.
:::

## API Reference

### Properties

| Property | Description                                                          | Type     | Default                                  |
| -------- | -------------------------------------------------------------------- | -------- | ---------------------------------------- |
| resource | [`Resource`](../../components/resource.md) for API data interactions | `string` | Resource name that it reads from the url |
| id       | Record id for fetching                                               | `string` | Id that it reads from the url            |

### Return values

| Property    | Description                     | Type                                                                                          |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| queryResult | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| showId      | Record id                       | `string`                                                                                      |
| setShowId   | `showId` setter                 | `Dispatch<SetStateAction< string` \| `undefined>>`                                            |
