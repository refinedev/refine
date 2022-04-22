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

First, we'll create a page to show the records. Then we'll use this page for the show property of the resource.

```tsx  title="src/pages/posts/show.tsx"
// highlight-next-line
import { useShow } from "@pankod/refine-core";
import { Show, Typography } from "@pankod/refine-antd";

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

interface IPost {
    id: string;
    title: string;
}
```

We didn't give any property to `useShow` because it can read `resource` and `id` information from the route.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-json-server";

// highlight-next-line
import { PostShow } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
// highlight-next-line
            resources={[{ name: "posts", show: PostShow }]}
        />
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

```tsx  title="src/pages/posts/list.tsx"
import { List, Table, useTable } from "@pankod/refine-antd";

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

```tsx  title="src/pages/posts/list.tsx"
// highlight-next-line
import { List, Table, useTable } from "@pankod/refine-core";
import {
    List,
    Table,
    useTable,
// highlight-start
    Modal,
    Show,
    ShowButton,
    Typography,
// highlight-end
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const PostList: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const { tableProps } = useTable<IPost>();

// highlight-next-line
    const { queryResult, showId, setShowId } = useShow<IPost>();
    const { data, isLoading } = queryResult;
// highlight-next-line
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
// highlight-start
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
// highlight-end
                    />
                </Table>
            </List>
// highlight-start
            <Modal visible={visible} onCancel={() => setVisible(false)}>
                <Show isLoading={isLoading} recordItemId={showId}>
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>
                </Show>
            </Modal>
// highlight-end
        </>
    );
};
```

Finally, let's pass this page to the `resources` as a list component.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-json-server";

// highlight-next-line
import { PostList } from "./pages/posts";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
// highlight-next-line
            resources={[{ name: "posts", list: PostList }]}
        />
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

| Property                                                     | Description                                                                                                                                                        | Type                                                                           | Default                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------- |
| resource                                                     | Resource name for API data interactions                                                                                                                            | `string`                                                                       | Resource name that it reads from the url |
| id                                                           | Record id for fetching                                                                                                                                             | [`BaseKey`](/core/interfaces.md#basekey)                                                                       | Id that it reads from the url            |
| metaData                                                     | Metadata query for `dataProvider`                                                                                                                                  | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                           | {}                                       |
| dataProviderName                                             | If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.                                                                 | `string`                                                                       | `default`                                |
| [liveMode](/core/providers/live-provider.md#usage-in-a-hook) | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/core/interfaces.md#livemodeprops)         | `"off"`                                  |
| liveParams                                                   | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                    | [`{ ids?: BaseKey[]; [key: string]: any; }`](/core/interfaces.md#livemodeprops) | `undefined`                              |
| onLiveEvent                                                  | Callback to handle all related live events of this hook.                                                                                                           | [`(event: LiveEvent) => void`](/core/interfaces.md#livemodeprops)              | `undefined`                              |

### Return values

| Property    | Description                     | Type                                                                                          |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| queryResult | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| showId      | Record id                       | `string`                                                                                      |
| setShowId   | `showId` setter                 | `Dispatch<SetStateAction< string` \| `undefined>>`                                            |
