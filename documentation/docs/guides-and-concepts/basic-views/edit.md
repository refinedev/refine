---
id: edit
title: Edit
---

import asideUsage from '@site/static/img/guides-and-concepts/basic-views/edit/aside.png'
import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/pageHeaderProps.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/actionButtons.png'

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button and title to the page.

We' ll show what `<Edit>` does using properties with examples.

## Properties

### `canDelete` and `deleteButtonProps`

`canDelete` allows adding the delete button inside the `<Edit>` component. If `<Resource>` has `canDelete` prop refine adds the delete button by default. If you want to customize this button you can use `deleteButtonProps` property like the below code.

Delete button when clicked executes the `useDelete` method provided by the `dataProvider`.

[Refer to `<DeleteButton>` documentation for detailed usage. &#8594](#)

```tsx
import { Edit, usePermissions } from "@pankod/refine";

export const Edit: React.FC = () => {
    const { data } = usePermissions();

    return (
        <Edit
            canDelete={data === "admin"}
            deleteButtonProps={{ size: "small" }}
        >
            ...
        </Edit>
    );
};
```

[Refer to `usePermission` documentation for detailed usage. &#8594](#)

### `saveButtonProps`

`<Edit>` component has a save button by default. If you want to customize this button you can use `saveButtonProps` property like the below code.

Save button submits your form.

[Refer to `<SaveButton>` documentation for detailed usage. &#8594](#)

```tsx
import { Edit } from "@pankod/refine";

export const Edit: React.FC = () => {
    return <Edit saveButtonProps={{ size: "small" }}>...</Edit>;
};
```

### `title`

It allows adding title inside the `<Edit>` component. if you don't pass title props it uses "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will look like "Edit post".

```tsx
import { Edit } from "@pankod/refine";

export const Edit: React.FC = () => {
    return <Edit title="Custom Title">...</Edit>;
};
```

### `aside`

It allows adding a component to the right of the `<Edit>` component.

```tsx
import { Edit, Card } from "@pankod/refine";

const Aside: React.FC = () => {
    return (
        <Card title="Post Edit Details" extra={<a href="#">More</a>}>
            <p>Here you can give useful information about post edit.</p>
        </Card>
    );
};

export const Edit: React.FC = () => {
    return <Edit aside={Aside}>...</Edit>;
};
```

<br/>
<div>
    <img src={asideUsage} alt="Aside Usage"/>
</div>
<br/>

### `actionButtons`

`<Edit>` uses Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` prop of `<Card>` component shows `<SaveButton>` and `<DeleteButton>` depending on your resource definition on `<Resource>` components. If you want to use other things instead of these buttons, you can use `actionButton` property like the below code.

```tsx
import { Edit } from "@pankod/refine";

export const Edit: React.FC = () => {
    return (
        <Edit
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button size="small">Custom Button 2</Button>
                </>
            }
        >
            ...
        </Edit>
    );
};
```

<br/>
<div>
    <img src={actionButtonsUsage} alt="actionButton Usage"/>
</div>
<br/>

### `pageHeaderProps`

`<Edit>` uses Ant Design [`<PageHeader>`](https://ant.design/components/page-header/#API) components. so you can customize with the props of `pageHeaderProps`. By default, the `extra` prop of `<PageHeader>` component shows `<RefreshButton>` and `<ListButton>` depending on your resource definition on `<Resource>` component.

```tsx
import { Edit } from "@pankod/refine";

export const Edit: React.FC = () => {
    return (
        <Edit
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </Edit>
    );
};
```

<br/>
<div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `recordItemId`

`<Edit>` component reads the `id` information from the route by default. `recordIdItem` is used when it cannot reading from the url (when used on a custom page, modal or drawer).

```tsx
import { Edit, Modal, useModalForm } from "@pankod/refine";

export const Edit: React.FC = () => {
    const { modalProps, editId } = useModalForm({
        action: "edit",
    });

    return (
        <>
            ...
            <Modal {...modalProps}>
                <Edit recordItemId={editId}>...</Edit>
            </Modal>
        </>
    );
};
```

:::note
`<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines the mode in which the mutation the `<DeleteButton>` will execute.

[Refer to mutation mode docs for further information. &#8594](#)

```tsx
import { Edit } from "@pankod/refine";

export const Edit: React.FC = () => {
    return <Edit mutationMode="undoable">...</Edit>;
};
```

### `resource`

`<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` prop.

[Refer to custom pages documentation for detailed usage. &#8594](#)

```tsx
import { Admin, Resource, Edit } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

const CustomPage = () => {
    return <Edit resource="posts">...</Edit>;
};

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com/")}
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
`<Edit>` component needs the `id` information for work properly so if you use `<Edit>` component in custom pages, you should pass the `recordIditem` property.
:::

## API Reference

### Properties

| Property          | Description                                 | Type                                                              | Default                                                                            |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| canDelete         | Adds delete button                          | `boolean`                                                         | If `<Resource>` has `canDelete` prop it is `true` else `false` `false`                 |
| deleteButtonProps | Adds props for delete button                | [`DeleteButtonProps`](interfaces.md#delete-button-props)          | `<DeleteButton>`                                                                   |
| saveButtonProps   | Adds props for create button                | `{ disabled: boolean; onClick: () => void; loading: boolean; }`   | `<SaveButton>`                                                                     |
| title             | Adds title                                  | `string`                                                          | `"Edit"` prefix and singular of `resource.name`                                    |
| aside             | Adds component to right side                | `React.FC`                                                        | `undefined`                                                                        |
| actionButtons     | Passes props for `<PageHeader>`             | `React.ReactNode`                                                 | `<SaveButton>` and depending on your `<Resource>` configuration (`canDelete` prop) |
| pageHeaderProps   | Passes props for `<PageHeader>`             | [PageHeaderProps](https://ant.design/components/page-header/#API) | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>` }        |
| recordItemId      | Record id for `<RefreshButton>`           | `string`                                                          |                                                                                    |
| mutationMode      | [Determines when mutations are executed](#) | ` "pessimistic` \| `"optimistic` \| `"undoable"`                  | `"pessimistic"`\*                                                                  |
| resource          | [`Resource`](#) for API data interactions   | `string`                                                          | Resource name that it reads from the url.                                          |

> `*`: These props have default values in `AdminContext` and can also be set on **<[Admin](#)>** component.
