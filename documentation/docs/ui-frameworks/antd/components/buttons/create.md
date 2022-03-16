---
id: create-button
title: Create
---

import createButton from '@site/static/img/guides-and-concepts/components/buttons/create/create.png';

`<CreateButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `create` method from [`useNavigation`](/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the create page route of resource.

## Usage

```tsx
import {
    // highlight-next-line
    CreateButton,
    List,
    Table,
    useTable,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        // highlight-next-line
        <List pageHeaderProps={{ extra: <CreateButton /> }}>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
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
    <img src={createButton} alt="Default create button" />
</div>

## Properties

### `resourceNameOrRouteName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx 
import { CreateButton } from "@pankod/refine-antd";

export const MyCreateComponent = () => {
    return <CreateButton resourceNameOrRouteName="posts" />;
};
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect to `/posts/create`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { CreateButton } from "@pankod/refine-antd";

export const MyCreateComponent = () => {
    return <CreateButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx 
import { CreateButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <CreateButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                                                                          | Default                                                         |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| props                       | Ant Design button props                          | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; hideText?: boolean; }` |                                                                 |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| hideText                    | Allows to hide button text                       | `boolean`                                                                                                     | `false`                                                         |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                                                                     | `false`                                                         |
| children                    | Sets the button text                             | `ReactNode`                                                                                                   | `"Create"`                                                      |
| icon                        | Sets the icon component of button                | `ReactNode`                                                                                                   | [`<PlusSquareOutlined />`](https://ant.design/components/icon/) |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                                                             | Triggers navigation for redirect to the create page of resource |
