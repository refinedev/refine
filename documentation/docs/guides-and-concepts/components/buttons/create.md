---
id: create-button
title: Create
---

import listUsage from '@site/static/img/guides-and-concepts/components/buttons/create/usage.png';

`<CreateButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `create` method from [`useNavigation`](#) under the hood. It can be useful to redirect the app to the create page route of `<Resource>`.

## Usage

```tsx
//highlight-next-line
import { List, Table, CreateButton, useTable } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        //highlight-start
        <List pageHeaderProps={{ extra: <CreateButton /> }}>
            //highlight-end
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
```

Looks like this:

<div>
    <img src={listUsage} alt="Default Create Button" />
</div>

## Properties

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of `<Resource>` component.

```tsx
import { CreateButton } from "@pankod/refine";

export const MyCreateComponent = () => {
    return <CreateButton resourceName="posts" />;
};
```

Clicking the button will trigger the `create` method of [`useNavigation`](#) and then redirect to `/resources/posts/create`.

## API Reference

### Properties

| Property     | Description                                   | Type                                                                                      | Default                                                         |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props        | Ant Design button props                       | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; }` |                                                                 |
| resourceName | Determines which resource to use for redirect | `string`                                                                                  | Resource name acquired from route                               |
| children     | Set the button text                           | `ReactNode`                                                                               | `"Create"`                                                      |
| icon         | Set the icon component of button              | `ReactNode`                                                                               | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
| onClick      | Set the handler to handle click event         | `(event) => void`                                                                         | Triggers navigation for redirect to the create page of resource |
