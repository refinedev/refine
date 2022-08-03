---
id: edit
title: Edit
---

import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/actionButtonUsageMui.png'
import cardHeaderPropsTitle from '@site/static/img/guides-and-concepts/basic-views/edit/cardHeaderPropsTitle.png'

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a [`<RefreshButton>`](/ui-frameworks/mui/components/buttons/refresh.md).

We will show what `<Edit>` does using properties with examples.

## Properties

### `title`

It allows adding title inside the `<Edit>` component. if you don't pass title props it uses "Edit" prefix and singular resource name by default. For example, for the `/posts/edit` resource, it will be "Edit post".

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return <Edit title="Custom Title">...</Edit>;
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

### `saveButtonProps`

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/buttons/save.md)

```tsx
// highlight-next-line
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    // highlight-next-line
    return <Edit saveButtonProps={{ size: "small" }}>...</Edit>;
};
```

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property, refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the [`useDelete`](/core/hooks/data/useDelete.md) method provided by the [`dataProvider`](/core/providers/data-provider.md).

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/buttons/delete.md)

```tsx title="src/pages/posts/edit.tsx"
import { usePermissions } from "@pankod/refine-core";
// highlight-next-line
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    const { data } = usePermissions<string>();

    return (
        <Edit
            // highlight-start
            canDelete={data === "admin"}
            deleteButtonProps={{ size: "small" }}
            // highlight-end
        >
            ...
        </Edit>
    );
};
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx title="src/pages/posts/edit.tsx"
import { useModalForm } from "@pankod/refine-react-hook-form";
import { Drawer, Edit} from "@pankod/refine-mui";

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
The `<Edit>` component needs the `id` information for the [`<RefreshButton>`](/ui-frameworks/mui/components/buttons/refresh.md) to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing [`<DeleteButton>`](/ui-frameworks/mui/components/buttons/delete.md).

[Refer to the mutation mode docs for further information. &#8594](guides-and-concepts/mutation-mode.md)

```tsx title="src/pages/posts/edit.tsx"
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    // highlight-next-line
    return <Edit mutationMode="undoable">...</Edit>;
};
```

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostEdit = () => {
    return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
            resources={[{ name: "posts", edit: PostEdit }]}
        />
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx
import { Edit } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";
import { MyBackButton } from "@components";

export const EditPage: React.FC = () => {
    const { goBack } = useNavigation();

    return (
        <Edit
            /* ... */
            goBack={<MyBackButton onClick={() => goBack()} />}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `isLoading`

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            /* ... */
            isLoading={loading}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/breadcrumb.md)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            breadcrumb={null}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `wrapperProps`

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            wrapperProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `headerProps`

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            headerProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `contentProps`

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            contentProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            headerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx
import { Edit } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            /* ... */
            footerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Edit>
    );
};
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Edit>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows [`<SaveButton>`](/ui-frameworks/mui/components/buttons/save.md) and [`<DeleteButton>`](/ui-frameworks/mui/components/buttons/delete.md) based on your resource definition in the`resources`property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx title="src/pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            // highlight-start
            actionButtons={
                <>
                    <Button>Custom Button 1</Button>
                    <Button>Custom Button 2</Button>
                </>
            }
            // highlight-end
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

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Edit>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Edit>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Typography } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
    return (
        <Edit
            //highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            //highlight-end
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

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Edit>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Edit>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

| Property                                                                                                      | Description                                                                     | Type                                                                            | Default                                                                        |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| title                                                                                                         | Adds title                                                                      | `React.ReactNode`                                                               | `"Edit"` prefix and singular of `resource.name`                                |
| resource                                                                                                      | Resource name for API data interactions                                         | `string`                                                                        | Resource name that it reads from the URL.                                      |
| saveButtonProps                                                                                               | Adds props for `<SaveButton>`                                                   | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                 | `<SaveButton>`                                                                 |
| canDelete                                                                                                     | Adds a `<DeleteButton>`                                                         | `boolean`                                                                       | If the resource has `canDelete` prop it is `true` else `false` `false`         |
| deleteButtonProps                                                                                             | Adds properties for `<DeleteButton>`                                            | [`DeleteButtonProps`](/core/interfaces.md#delete-button-props)                  | `<DeleteButton>`                                                               |
| recordItemId                                                                                                  | The record id for `<RefreshButton>`                                             | [`BaseKey`](/core/interfaces.md#basekey)                                        |                                                                                |
| mutationMode                                                                                                  | [Determines when mutations are executed](/guides-and-concepts/mutation-mode.md) | ` "pessimistic` \| `"optimistic` \| `"undoable"`                                | `"pessimistic"`\*                                                              |
| dataProviderName                                                                                              | To specify a data provider other than `default` use this property               | `string`                                                                        |                                                                                |
| goBack                                                                                                        | Custom back button element                                                      | `React.ReactNode`                                                               | `<ArrowBackIcon />`                                                            |
| isLoading                                                                                                     | Passes the props for `<SaveButton>`                                             | `boolean`                                                                       | false                                                                          |
| breadcrumb                                                                                                    | Custom breadcrumb element                                                       | `React.ReactNode`                                                               | `<Breadcrumb/>`                                                                |
| wrapperProps                                                                                                  | Wrapper element props                                                           | [`CardProps`](https://mui.com/material-ui/api/card/#props)                      |                                                                                |
| headerProps                                                                                                   | Header element props                                                            | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)         |                                                                                |
| contentProps                                                                                                  | Content wrapper element props                                                   | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)       |                                                                                |
| headerButtons                                                                                                 | Header buttons element or render function                                       | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                |
| headerButtonProps                                                                                             | Header buttons wrapper element props                                            | [`BoxProps`](https://mui.com/material-ui/api/box/#props)                        |                                                                                |
| footerButtons                                                                                                 | Footer buttons element or render function                                       | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                |
| footerButtonProps                                                                                             | Footer buttons wrapper element props                                            | [`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)       |                                                                                |
| <div className="required-block"><div>actionButtons</div> <div className=" required">deprecated</div></div>    | Passes the props for `<CardActions>`                                            | `React.ReactNode`                                                               | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| <div className="required-block"><div>cardProps</div> <div className=" required">deprecated</div></div>        | Passes the props for `<Card>`                                                   | [`CardProps`](https://mui.com/material-ui/api/card/#props)                      | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| <div className="required-block"><div>cardHeaderProps</div> <div className=" required">deprecated</div></div>  | Passes the props for `<CardHeader>`                                             | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)         |                                                                                |
| <div className="required-block"><div>cardContentProps</div> <div className=" required">deprecated</div></div> | Passes the props for `<CardContent>`                                            | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)       |                                                                                |
| <div className="required-block"><div>cardActionsProps</div> <div className=" required">deprecated</div></div> | Passes the props for `<CardActions>`                                            | [`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)       |                                                                                |
