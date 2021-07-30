---
id: edit-button
title: Edit
---

import tableUsage from '@site/static/img/guides-and-concepts/components/buttons/edit/usage.png';

`<EditButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `edit` method from [`useNavigation`](#) under the hood. It can be useful when redirecting the app to the edit page with the record id route of `<Resource>`.

## Usage

```tsx
import { 
    List,
    Table,
    useTable
    //highlight-next-line
    EditButton,
} from "@pankod/refine";

import { IPost } from "interfaces";

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
                    key="actions"
                    render={(_, record) => (
                        //highlight-next-line
                        <EditButton size="small" recordItemId={record.id} />
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

Will look like this:

<div>
    <img  src={tableUsage} alt="Table usage for delete button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/posts/edit/1`.

:::note
`<EditButton>` component reads the id information from the route by default.
:::

### `resourceName`

Redirection endpoint(`resourceName/edit`) is defined by `resourceName` property. By default, `<EditButton>` uses `name` property of the `<Resource>` component as an endpoint to redirect after clicking.

```tsx
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](#) and then redirect the app to `/resources/categories/edit/2`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                                             | Default                                                       |
| ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| props        | Ant Design button properties                      | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; }` |                                                               |
| resourceName | Determines which resource to use for redirection | `string`                                                                                                         | Resource name that it reads from route                             |
| recordItemId | Adds `id` to the end of the URL                | `string`                                                                                                         | Record id that it reads from route                                 |
| children     | Sets the button text                           | `ReactNode`                                                                                                      | `"Edit"`                                                      |
| icon         | Sets the icon component of button              | `ReactNode`                                                                                                      | [`<EditOutlined />`](https://ant.design/components/icon/)     |
| onClick      | Sets the handler to handle click event         | `(event) => void`                                                                                                | Triggers navigation for redirection to the edit page of resource |
