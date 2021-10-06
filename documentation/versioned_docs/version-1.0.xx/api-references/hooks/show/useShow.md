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

```tsx twoslash title="src/pages/posts/show.tsx" {0,5}
import { useShow, Show, Typography } from "@pankod/refine";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
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

interface IPost {
    id: string;
    title: string;
}
```

We didn't give any property to `useShow` because it can read `resource` and `id` information from the route.

```tsx title="src/App.tsx" {3, 10}
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

import { PostShow } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource name="posts" show={PostShow} />
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

```tsx twoslash title="src/pages/posts/list.tsx"
interface IPost {
    id: string;
    title: string;
}
// ---cut---
import { List, Table, useTable } from "@pankod/refine";

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

```tsx twoslash title="src/pages/posts/list.tsx" {4-8, 11, 14, 18-20, 28-41, 44-52}
interface IPost {
    id: string;
    title: string;
}
import { useState } from "react";
// ---cut---
import {
    List,
    Table,
    useTable,
    Modal,
    Show,
    ShowButton,
    Typography,
    useShow,
} from "@pankod/refine";

const { Title, Text } = Typography;

export const PostList: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const { tableProps } = useTable<IPost>();

    const { queryResult, showId, setShowId } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
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
                </Table>
            </List>
            <Modal visible={visible} onCancel={() => setVisible(false)}>
                <Show isLoading={isLoading} recordItemId={showId}>
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>
                </Show>
            </Modal>
        </>
    );
};
```

Finally, let's pass this page to the `<Resource>` component.

```tsx title="src/App.tsx" {3,10}
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

import { PostList } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}>
            <Resource name="posts" list={PostList} />
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

| Property | Description                                                          | Type                                                             | Default                                  |
| -------- | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| resource | [`Resource`](../../components/resource.md) for API data interactions | `string`                                                         | Resource name that it reads from the url |
| id       | Record id for fetching                                               | `string`                                                         | Id that it reads from the url            |
| metaData | Metadata query for `dataProvider`                                    | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery) | {}                                       |

### Return values

| Property    | Description                     | Type                                                                                          |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| queryResult | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| showId      | Record id                       | `string`                                                                                      |
| setShowId   | `showId` setter                 | `Dispatch<SetStateAction< string` \| `undefined>>`                                            |
