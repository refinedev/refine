---
id: edit
title: Edit
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/pageHeaderPropsUsage.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/actionButtonsUsage.png'

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

## Properties

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/buttons/delete.md)

```tsx 
import { usePermissions } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    const { data } = usePermissions<string>();

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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `saveButtonProps`

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/buttons/save.md)

```tsx 
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    return <Edit saveButtonProps={{ size: "small" }}>...</Edit>;
};
```

### `title`

It allows adding titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx 
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    return <Edit title="Custom Title">...</Edit>;
};
```

### `actionButtons`

`<Edit>` uses the Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` property of the `<Card>` component shows `<SaveButton>` or `<DeleteButton>` based on your resource definition in the `resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx 
import { Edit, Button } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
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
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### `pageHeaderProps`

`<Edit>` uses the Ant Design [`<PageHeader>`](https://ant.design/components/page-header/#API) components, which means that you can customize the properties of `pageHeaderProps`.
By default, the `extra` property of the `<PageHeader>` component shows `<RefreshButton>` or `<ListButton>` based on your resource definition in the `resources` property you pass to `<Refine>`.

```tsx 
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
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
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx 
import { Edit, Modal, useModalForm } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    const { modalProps, id } = useModalForm({
        action: "edit",
    });

    return (
        <>
            ...
            <Modal {...modalProps}>
                <Edit recordItemId={id}>...</Edit>
            </Modal>
        </>
    );
};
```

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>` .

[Refer to the mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

```tsx 
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    return <Edit mutationMode="undoable">...</Edit>;
};
```

### `resource`

`<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <Edit resource="posts">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ]
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev/")}
            resources={[{ name: "posts" }]}
        />
    );
};
```

:::caution
`<Edit>` component needs the `id` information for work properly so if you use the `<Edit>` component in custom pages, you should pass the `recordItemId` property.
:::

## API Reference

### Properties

| Property          | Description                                                                     | Type                                                              | Default                                                                        |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| canDelete         | Adds a delete button                                                            | `boolean`                                                         | If the resource has `canDelete` prop it is `true` else `false` `false`             |
| deleteButtonProps | Adds properties for delete button                                               | [`DeleteButtonProps`](/core/interfaces.md#delete-button-props)    | `<DeleteButton>`                                                               |
| saveButtonProps   | Adds properties for create button                                               | `{ disabled: boolean; onClick: () => void; loading: boolean; }`   | `<SaveButton>`                                                                 |
| title             | Adds the title                                                                  | `string`                                                          | `"Edit"` prefix and singular of `resource.name`                                |
| actionButtons     | Passes properties for `<PageHeader>`                                            | `React.ReactNode`                                                 | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| pageHeaderProps   | Passes properties for `<PageHeader>`                                            | [PageHeaderProps](https://ant.design/components/page-header/#API) | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>` } |
| recordItemId      | The record id for `<RefreshButton>`                                             | [`BaseKey`](/core/interfaces.md#basekey)                          |                                                                                |
| mutationMode      | [Determines when mutations are executed](/guides-and-concepts/mutation-mode.md) | ` "pessimistic` \| `"optimistic` \| `"undoable"`                  | `"pessimistic"`\*                                                              |
| resource          | Resource name for API data interactions                                         | `string`                                                          | Resource name that it reads from the URL.                                      |

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/core/components/refine-config.md)>** component.
