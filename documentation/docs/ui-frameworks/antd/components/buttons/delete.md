---
id: delete-button
title: Delete
---

import deleteButton from '@site/static/img/guides-and-concepts/components/buttons/delete/delete.png';
import confirmation from '@site/static/img/guides-and-concepts/components/buttons/delete/confirmation.gif';

`<DeleteButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) and [`<Popconfirm>`](https://ant.design/components/popconfirm/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/hooks/data/useDelete.md) method provided by your [`dataProvider`](/core/providers/data-provider.md).

## Usage

```tsx
import {
    // highlight-next-line
    DeleteButton,
    List,
    Table,
    useTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        // highlight-next-line
                        <DeleteButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: string;
    title: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={deleteButton} alt="Default delete button" />
</div>
<br />

When clicked, it opens the confirmation window like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={confirmation} alt="Confirmation window" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which record will be deleted.

```tsx 
import { DeleteButton } from "@pankod/refine-antd";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the [`useDelete`](/core/hooks/data/useDelete.md) method and then the record whose resource is "post" and whose id is "1" gets deleted.

:::note
**`<DeleteButton>`** component reads the id information from the route by default.
:::

### `resourceName`

`resourceNameOrRouteName` allows us to manage which resource's record is going to be deleted.

```tsx 
import { DeleteButton } from "@pankod/refine-antd";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the [`useDelete`](/core/hooks/data/useDelete.md) method and then the record whose resource is "categories" and whose id is "2" gets deleted.

:::note
**`<DeleteButton>`** component reads the resource name from the route by default.
:::

### `onSuccess`

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx
import { List, Table, DeleteButton, useTable } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        // highlight-start
                        <DeleteButton
                            size="small"
                            recordItemId={record.id}
                            onSuccess={(value) => {
                                console.log(value);
                            }}
                        />
                        // highlight-end
                    )}
                />
            </Table>
        </List>
    );
};
```

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

```tsx
import { List, Table, DeleteButton, useTable } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <DeleteButton
                            size="small"
                            recordItemId={record.id}
                            // highlight-next-line
                            mutationMode="undoable"
                        />
                    )}
                />
            </Table>
        </List>
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { DeleteButton } from "@pankod/refine-antd";

export const MyDeleteComponent = () => {
    return <DeleteButton hideText />;
};
```


### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx 
import { DeleteButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <DeleteButton ignoreAccessControlProvider />;
};
```

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what ok and cancel buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx 
import { DeleteButton } from "@pankod/refine-antd";

export const MyDeleteComponent = () => {
    return (
        <DeleteButton
            confirmTitle="Title"
            confirmOkText="Ok Text"
            confirmCancelText="Delete Text"
        />
    );
};
```
## API Reference

### Properties

| Property                    | Description                                                                                  | Type                                                                                                                        | Default                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| props                       | Ant Design button properties                                                                 | [`ButtonProps`](https://ant.design/components/button/#API) & [`DeleteButtonProps`](/core/interfaces.md#delete-button-props) |                                                                                      |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| recordItemId                | Determines which id to use for deletion                                                      | [`BaseKey`](/core/interfaces.md#basekey)                                                                                                                  | Record id that it reads from route                                                   |
| onSuccess                   | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful | `(value: DeleteOneResponse) => void`                                                                                        |                                                                                      |
| mutationMode                | Determines when mutations are executed.                                                      | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                                                                           |                                                                                      |
| hideText                    | Allows to hide button text                                                                   | `boolean`                                                                                                                   | `false`                                                                              |
| confirmTitle                | The title of the confirmation box                                                            | `string`                                                                                                                    | `"Are you sure?"`                                                                        |
| confirmOkText               | The text of the Confirm button                                                               | `string`                                                                                                                    | `"Delete"`                                                                                | 
| confirmCancelText           | The text of the Cancel button                                                                | `string`                                                                                                                    | `"Cancel"`                                                                 |
| children                    | Sets the button text                                                                         | `ReactNode`                                                                                                                 | `"Delete"`                                                                           |
| ignoreAccessControlProvider | Skip access control                                                                          | `boolean`                                                                                                                   | `false`                                                                              |
| icon                        | Sets the icon component of the button                                                        | `ReactNode`                                                                                                                 | [`<DeleteOutlined />`](https://ant.design/components/icon/)                          |
| danger                      | Sets the danger status of the button                                                         | `boolean`                                                                                                                   | `true`                                                                               |
| loading                     | Sets the loading status of the button                                                        | `boolean`                                                                                                                   | When the request is not completed, loading is `true`, when it completes it's `false` |
| metaData                    | Metadata query for `dataProvider`                                                            | [`MetaDataQuery`](/core/interfaces.md#metadataquery)                                                              | {}                                                                                   |
