---
id: delete-button
title: Delete
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/delete/usage.png';
import defaultUsage from '@site/static/img/guides-and-concepts/components/buttons/delete/default.gif';

`<DeleteButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) and [`<Popconfirm>`](https://ant.design/components/popconfirm/) components. To prevent instant deletion when clicked a pop confirms pops up and asks for confirmation. When confirmed it execustes `useDelete` method provided by you dataProvider.

## Usage

```tsx
//highlight-next-line
import { List, Table, DeleteButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        //highlight-next-line
                        <DeleteButton size="small" recordItemId={record.id} />
                    )}
                />
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
    <img  src={tableUsage} alt="Table usage for delete button" />
</div>

When click it opens the confirmation window for confirming like this:

<div>
    <img  width="30%" src={defaultUsage} alt="Default delete button" />
</div>

## Properties

### `recordItemId`

`recordItemId` allows us to manage which record will delete.

```tsx
import { DeleteButton } from "@pankod/refine";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `useDelete` method and then the record whose resource is "post" and whose id is "1" deletes.

:::note
`<DeleteButton>` component reads the id information from the route by default.
:::

### `resourceName`

`resourceName` allows us to manage which resource's record is deleted.

```tsx
import { DeleteButton } from "@pankod/refine";

export const MyDeleteComponent = () => {
    return <DeleteButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `useDelete` method and then the record whose resource is "categories" and whose id is "2" deletes.

:::note
`<DeleteButton>` component reads the resource name from the route by default.
:::

### `onSuccess`

You can use it if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx
import { List, Table, DeleteButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <DeleteButton
                            size="small"
                            recordItemId={record.id}
                            //highlight-start
                            onSuccess={(value) => {
                                console.log(value);
                            }}
                            //highlight-end
                        />
                    )}
                />
            </Table>
        </List>
    );
};
```

### `mutationMode`

Determines the mode in which the mutation the `<DeleteButton>` will execute.

[Refer to mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

```tsx
import { List, Table, DeleteButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <DeleteButton
                            size="small"
                            recordItemId={record.id}
                            //highlight-start
                            mutationMode="undoable"
                            //highlight-end
                        />
                    )}
                />
            </Table>
        </List>
    );
};
```

## API Reference

### Properties

| Property     | Description                                                                                  | Type                                                                                                                        | Default                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| props        | Ant Design button props                                                                      | [`ButtonProps`](https://ant.design/components/button/#API) & [`DeleteButtonProps`](../../interfaces.md#delete-button-props) |                                                                                |
| resourceName | Determines which resource to use for delete                                                  | `string`                                                                                                                    | Resource name that it reads from route                                         |
| recordItemId | Determines which id to use for delete                                                        | `string`                                                                                                                    | Record id that it reads from route                                             |
| onSuccess    | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful | `(value: DeleteOneResponse) => void`                                                                                        |                                                                                |
| mutationMode | Determines when mutations are executed.                                                      | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                                                                           |                                                                                |
| children     | Set the button text                                                                          | `ReactNode`                                                                                                                 | `"Delete"`                                                                     |
| icon         | Set the icon component of button                                                             | `ReactNode`                                                                                                                 | [`<DeleteOutlined />`](https://ant.design/components/icon/)                    |
| danger       | Set the danger status of button                                                              | `boolean`                                                                                                                   | `true`                                                                         |
| loading      | Set the loading status of button                                                             | `boolean`                                                                                                                   | When the request is not completed loading is `true`, when it completes `false` |
