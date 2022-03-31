---
id: clone-button
title: Clone
---

import cloneButton from '@site/static/img/guides-and-concepts/components/buttons/clone/clone.png';

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](/core/hooks/navigation/useNavigation.md) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

## Usage

```tsx
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    CloneButton,
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
                    key="actions"
                    render={(_, record) => (
                        // highlight-next-line
                        <CloneButton size="small" recordItemId={record.id} />
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
    <img src={cloneButton} alt="Default clone button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx 
import { CloneButton } from "@pankod/refine-antd";

export const MyCloneComponent = () => {
    return <CloneButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/clone/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx 
import { CloneButton } from "@pankod/refine-antd";

export const MyCloneComponent = () => {
    return <CloneButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { CloneButton } from "@pankod/refine-antd";

export const MyCloneComponent = () => {
    return <CloneButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/core/components/refine-config.md)

```tsx 
import { CloneButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
    return <CloneButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                                                                                                 | Default                                                            |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| props                       | Ant Design button props                          | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: BaseKey; hideText?: boolean; }` |                                                                    |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                      | Resource name that it reads from route                           |
| recordItemId                | Adds `id` to the end of the URL                  | [`BaseKey`](/core/interfaces.md#basekey)                                                                                                                             | Record id that it reads from route                                 |
| hideText                    | Allows to hide button text                       | `boolean`                                                                                                                            | `false`                                                            |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                                                                                            | `false`                                                            |
| children                    | Sets the button text                             | `ReactNode`                                                                                                                          | `"Clone"`                                                          |
| icon                        | Sets the icon component of button                | `ReactNode`                                                                                                                          | [`<PlusSquareOutlined />`](https://ant.design/components/icon/)    |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                                                                                    | Triggers navigation for redirection to the create page of resource |
