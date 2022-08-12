---
id: clone-button
title: Clone
---

import cloneButton from '@site/static/img/guides-and-concepts/components/buttons/clone/clone.png';

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](/core/hooks/navigation/useNavigation.md) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

## Usage

```tsx live
const { Table, List, useTable, CloneButton } = RefineAntd;

// visible-block-start
import { Table, List, useTable, CloneButton } from "@pankod/refine-antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" width="100%" />
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
    id: number;
    title: string;
}
// visible-block-end

render(
    <RefineAntdDemo
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx live disableScroll previewHeight=200px
const { CloneButton } = RefineAntd;
const { useRouterContext } = RefineCore;
// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
    return <CloneButton resourceNameOrRouteName="posts" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                create: ClonedPage,
            },
        ]}
        DashboardPage={MyCloneComponent}
    />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/clone/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx live disableScroll previewHeight=200px
const { CloneButton } = RefineAntd;
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
    return (
        <CloneButton resourceNameOrRouteName="categories" recordItemId="1" />
    );
};

// visible-block-end

const ClonedPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
            },
            {
                name: "categories",
                create: ClonedPage,
            },
        ]}
        DashboardPage={MyCloneComponent}
    />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=200px
const { CloneButton } = RefineAntd;
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
    return (
        <CloneButton
            // highlight-next-line
            hideText={true}
        />
    );
};

// visible-block-end

const ClonedPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                create: ClonedPage,
            },
        ]}
        DashboardPage={MyCloneComponent}
    />,
);
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

| Property                                                                                                  | Description                                      | Type                                                                                                                                  | Default                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| props                                                                                                     | Ant Design button props                          | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: BaseKey; hideText?: boolean; }` |                                                                    |
| resourceNameOrRouteName                                                                                   | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                             |
| <div className="required-block"><div>resourceName</div> <div className=" required">deprecated</div></div> | Determines which resource to use for redirection | `string`                                                                                                                              | Resource name that it reads from route                             |
| recordItemId                                                                                              | Adds `id` to the end of the URL                  | [`BaseKey`](/core/interfaces.md#basekey)                                                                                              | Record id that it reads from route                                 |
| hideText                                                                                                  | Allows to hide button text                       | `boolean`                                                                                                                             | `false`                                                            |
| ignoreAccessControlProvider                                                                               | Skip access control                              | `boolean`                                                                                                                             | `false`                                                            |
| children                                                                                                  | Sets the button text                             | `ReactNode`                                                                                                                           | `"Clone"`                                                          |
| icon                                                                                                      | Sets the icon component of button                | `ReactNode`                                                                                                                           | [`<PlusSquareOutlined />`](https://ant.design/components/icon/)    |
| onClick                                                                                                   | Sets the handler to handle click event           | `(event) => void`                                                                                                                     | Triggers navigation for redirection to the create page of resource |
