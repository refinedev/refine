---
id: clone-button
title: Clone
---

import cloneButton from '@site/static/img/guides-and-concepts/components/buttons/clone/clone.png';

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](/api-references/hooks/navigation/useNavigation.md) under the hood.
It can be useful when redirecting the app to the create page with the record id route of `<Resource>`.

## Usage

```tsx twoslash {4, 20}
import {
    List,
    Table,
    useTable,
    CloneButton,
} from "@pankod/refine";

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

```tsx twoslash
import { CloneButton } from "@pankod/refine";

export const MyCloneComponent = () => {
    return <CloneButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/create/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of the `<Resource>` component.

```tsx twoslash
import { CloneButton } from "@pankod/refine";

export const MyCloneComponent = () => {
    return <CloneButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/create/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx twoslash
import { CloneButton } from "@pankod/refine";

export const MyCloneComponent = () => {
    return <CloneButton hideText />;
};
```

## API Reference

### Properties

| Property     | Description                                      | Type                                                                                                                                 | Default                                                            |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| props        | Ant Design button props                          | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; hideText?: boolean; }` |                                                                    |
| resourceName | Determines which resource to use for redirection | `string`                                                                                                                             | Resource name that it reads from route                             |
| recordItemId | Adds `id` to the end of the URL                  | `string`                                                                                                                             | Record id that it reads from route                                 |
| hideText     | Allows to hide button text                       | `boolean`                                                                                                                            | `false`                                                            |
| children     | Sets the button text                             | `ReactNode`                                                                                                                          | `"Clone"`                                                          |
| icon         | Sets the icon component of button                | `ReactNode`                                                                                                                          | [`<PlusSquareOutlined />`](https://ant.design/components/icon/)    |
| onClick      | Sets the handler to handle click event           | `(event) => void`                                                                                                                    | Triggers navigation for redirection to the create page of resource |
