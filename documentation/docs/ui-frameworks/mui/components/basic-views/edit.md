---
id: edit
title: Edit
---

import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/actionButtonUsageMui.png'
import cardHeaderPropsTitle from '@site/static/img/guides-and-concepts/basic-views/edit/cardHeaderPropsTitle.png'

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

## Properties

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/buttons/delete.md)

```tsx
import { usePermissions } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-mui";

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

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/buttons/save.md)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return <Edit saveButtonProps={{ size: "small" }}>...</Edit>;
};
```

### `actionButtons`

`<Edit>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the `<CardActions>` component shows [`<SaveButton>`](/ui-frameworks/mui/components/buttons/save.md) and [`<DeleteButton>`](/ui-frameworks/mui/components/buttons/delete.md) based on your resource definition in the`resources`property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            actionButtons={
                <>
                    <Button>Custom Button 1</Button>
                    <Button>Custom Button 2</Button>
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

### `cardProps`

`<Edit>` uses the Material UI `<Card>` components so you can customize with the props of `cardProps`.

### `cardHeaderProps`

`<Edit>` uses the Material UI `<CardHeader>` components so you can customize with the props of `cardHeaderProps`.

```tsx
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
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
    <img src={cardHeaderPropsTitle} alt="actionButton Usage" />
</div>
<br/>

### `cardContentProps`

`<Edit>` uses the Material UI `<CardContent>` components so you can customize with the props of `cardContentProps`.

### `cardActionsProps`

`<Edit>` uses the Material UI `<CardActions>` components so you can customize with the props of `cardActionsProps`.

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx
import { useModalForm } from "@pankod/refine-react-hook-form";
import { Drawer, ...} from "@pankod/refine-mui";

export const PostEdit: React.FC = () => {
    const editDrawerFormProps = useModalForm<ICategory>({
        refineCoreProps: { action: "edit" },
    });

    return (
        <Drawer>
            <Edit
                ...
                // highlight-next-line
                recordItemId="2"
            >
                ...
            </Edit>
        </Drawer>
    );
};

interface ICategory {
    id: number;
    title: string;
}
```

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>` .

[Refer to the mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return <Edit mutationMode="undoable">...</Edit>;
};
```

### `resource`

The `<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-mui";
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
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev/")}
            resources={[{ name: "posts" }]}
        />
    );
};
```

## API Reference

### Properties

| Property          | Description                                                                     | Type                                                                      | Default                                                                        |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| canDelete         | Adds a delete button                                                            | `boolean`                                                                 | If the resource has `canDelete` prop it is `true` else `false` `false`         |
| deleteButtonProps | Adds properties for delete button                                               | [`DeleteButtonProps`](/core/interfaces.md#delete-button-props)            | `<DeleteButton>`                                                               |
| saveButtonProps   | Adds props for edit button                                                      | `{ disabled: boolean; onClick: () => void; loading: boolean; }`           | `<SaveButton>`                                                                 |
| actionButtons     | Passes the props for `<CardActions>`                                            | `React.ReactNode`                                                         | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardProps         | Passes the props for `<Card>`                                                   | [`CardHeaderProps`](https://mui.com/material-ui/api/card/#props)          | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| cardHeaderProps   | Passes the props for `<CardHeader>`                                             | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)   |                                                                                |
| cardContentProps  | Passes the props for `<CardContent>`                                            | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props) |                                                                                |
| cardActionsProps  | Passes the props for `<CardActions>`                                            | [`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props) |                                                                                |
| recordItemId      | The record id for `<RefreshButton>`                                             | [`BaseKey`](/core/interfaces.md#basekey)                                  |                                                                                |
| mutationMode      | [Determines when mutations are executed](/guides-and-concepts/mutation-mode.md) | ` "pessimistic` \| `"optimistic` \| `"undoable"`                          | `"pessimistic"`\*                                                              |
| resource          | Resource name for API data interactions                                         | `string`                                                                  | Resource name that it reads from the URL.                                      |
| isLoading         | Passes the props for `<SaveButton>`                                             | `boolean`                                                                 | false                                                                          |
