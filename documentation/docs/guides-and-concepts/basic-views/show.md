---
id: show
title: Show
---

import asideUsage from '@site/static/img/guides-and-concepts/basic-views/show/aside.png'
import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/show/pageHeaderProps.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/show/actionButtons.png'
import isLoading from '@site/static/img/guides-and-concepts/basic-views/show/isLoading.png'

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button and title to the page.

We'll show what `<Show>` does using properties with examples.

## Properties

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allow adding the delete button and edit button inside the `<Show>` component. If `<Resource>` has `canDelete` or `canEdit` prop refine adds the buttons by default.

Delete button when clicked executes the `useDelete` method provided by the `dataProvider` and edit button when clicked redirects to the record edit page.

Refer to [`<DeleteButton>`](#) and [`<EditButton>`](#) documentation for detailed usage.

```tsx
import { Show, usePermissions } from "@pankod/refine";

export const Show: React.FC = () => {
    const { data } = usePermissions();

    return (
        <Show
            canDelete={data === "admin"}
            canEdit={data === "editor" || data === "admin"}
        >
            ...
        </Show>
    );
};
```

[Refer to `usePermission` documentation for detailed usage. &#8594](#)

### `title`

It allows adding title inside the `<Show>` component. if you don't pass title props it uses "Show" prefix and singular resource name by default. For example, for the "posts" resource, it will look like "Show post".

```tsx
import { Show } from "@pankod/refine";

export const Show: React.FC = () => {
    return <Show title="Custom Title">...</Show>;
};
```

### `aside`

It allows adding a component to the right of the `<Show>` component.

```tsx
import { Show, Card } from "@pankod/refine";

const Aside: React.FC = () => {
    return (
        <Card title="Post User Details" extra={<a href="#">More</a>}>
            <p>Here you can give useful information about post.</p>
        </Card>
    );
};

export const Show: React.FC = () => {
    return <Show aside={Aside}>...</Show>;
};
```

<div>
    <img src={asideUsage} alt="Aside Usage"/>
</div>
<br/>

### `actionButtons`

`<Show>` uses Ant Design [`<Card>`](https://ant.design/components/card/) component so you can customize `action` property with the props of `actionButtons`. By default, the `action` prop of `<Card>` component shows nothing in `<Show>` component.

```tsx
import { Show, Space, Button } from "@pankod/refine";

export const Show: React.FC = () => {
    return (
        <Show
            actionButtons={
                <Space>
                    <Button type="primary">Custom Button 1</Button>
                    <Button type="default">Custom Button 2</Button>
                </Space>
            }
        >
            ...
        </Show>
    );
};
```

<div>
    <img src={actionButtonsUsage} alt="actionButtons Usage"/>
</div>
<br/>

### `isLoading`

Since `<Show>` uses Ant Design [`<Card>`](https://ant.design/components/card/) component, `isLoading` property can be set like the below.

```tsx
import { useState } from "react";
import { Show, Modal, ShowButton, useShow } from "@pankod/refine";

export const Show: React.FC = () => {
    const { isLoading } = useOne("categories", "1");

    return <Show isLoading={isLoading}>...</Show>;
};
```

<div>
    <img src={isLoading} alt="isLoading"/>
</div>
<br/>

### `pageHeaderProps`

`<Show>` uses Ant Design [`<PageHeader>`](https://ant.design/components/page-header/#API) components so you can customize with the props of `pageHeaderProps`. By default, the `extra` prop of `<PageHeader>` component shows `<RefreshButton>`, `<ListButton>`, `<EditButton>` and `<DeleteButton>` depending on your resource definition on `<Resource>` component.

```tsx
import { Show } from "@pankod/refine";

export const Show: React.FC = () => {
    return (
        <Show
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </Show>
    );
};
```

<div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordIdItem` is used when it cannot reading from the url (when used on a custom page, modal or drawer).

```tsx
import { useState } from "react";
import { Show, Modal, ShowButton, useShow } from "@pankod/refine";

export const Show: React.FC = () => {
    const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

    const { queryResult, showId, setShowId } = useShow();
    const { data, isLoading } = queryResult;

    return (
        <>
            <ShowButton
                size="small"
                onClick={() => {
                    setShowId(record.id);
                    setVisibleShowModal(true);
                }}
            />
            <Modal
                visible={visibleShowModal}
                onCancel={() => setVisibleShowModal(false)}
            >
                <Show recordItemId={showId} isLoading={isLoading}>
                    // show something with `data`
                </Show>
            </Modal>
        </>
    );
};
```

:::note
`<Show>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `resource`

`<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` prop.

[Refer to custom pages documentation for detailed usage. &#8594](#)

```tsx
import { Admin, Resource, Show } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

const CustomPage = () => {
    return (
        <Show resource="posts" recordItemId="postId">
            ...
        </Show>
    );
};

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://api.fake-rest.refine.dev/")}
            routes={[
                {
                    exact: true,
                    component: CustomPage,
                    path: "/custom",
                },
            ]}
        >
            <Resource name="posts" />
        </Admin>
    );
};
```

:::caution
`<Show>` component needs the `id` information for work properly so if you use `<Show>` component in custom pages, you should pass the `recordIditem` property.
:::

## API Reference

### Properties

| Property        | Description                                  | Type                                                              | Default                                                                            |
| --------------- | -------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| canDelete       | Adds delete button                           | `boolean`                                                         | If `<Resource>` has `canDelete` prop it is `true` else `false`                     |
| canEdit         | Adds edit button                             | `boolean`                                                         | If `<Resource>` has `canEdit` prop it is `true` else `false`                       |
| title           | Adds title                                   | `string`                                                          | `"Show"` prefix and singular of `resource.name`                                    |
| aside           | Adds component to right side                 | `React.FC`                                                        | `undefined`                                                                        |
| actionButtons   | Passes to `extra` property of the `<Card>`   | `React.ReactNode`                                                 | `<SaveButton>` and depending on your `<Resource>` configuration (`canDelete` prop) |
| isLoading       | Passes to `loading` property of the `<Card>` | `boolean`                                                         | `false`                                                                            |
| pageHeaderProps | Passes props for `<PageHeader>`              | [PageHeaderProps](https://ant.design/components/page-header/#API) | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>` }     |
| recordItemId    | Record id for `<RefreshButton>`              | `string`                                                          |                                                                                    |
| resource        | [`Resource`](#) for API data interactions    | `string`                                                          | Resource name that it reads from the url.                                          |
