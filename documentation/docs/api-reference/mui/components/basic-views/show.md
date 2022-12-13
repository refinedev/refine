---
id: show
title: Show
swizzle: true
---


`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return <Show title="Custom Title">...</Show>;
};
```

### `resource`

The `<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/advanced-tutorials/custom-pages.md)

```tsx title="src/app.tsx"
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-start
const CustomPage = () => {
    return (
        <Show resource="posts" recordItemId="postId">
            ...
        </Show>
    );
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

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the [`useDelete`](/api-reference/core/hooks/data/useDelete.md) method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/api-reference/mui/components/buttons/delete.md) and the [`<EditButton>`](/api-reference/mui/components/buttons/edit.md) documentation for detailed usage.

```tsx title="src/pages/posts/show.tsx"
import { usePermissions } from "@pankod/refine-core";
// highlight-next-line
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const { data } = usePermissions<string>();

    return (
        <Show
            // highlight-next-line
            canDelete={data === "admin"}
            // highlight-next-line
            canEdit={data === "editor" || data === "admin"}
        >
            ...
        </Show>
    );
};
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/auth/usePermissions.md)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx title="src/pages/posts/show.tsx"
import { useState } from "react";
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Dialog, ShowButton } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const [visibleShowDialog, setVisibleShowDialog] = useState<boolean>(false);

    const { queryResult, showId, setShowId } = useShow();
    const { data, isLoading } = queryResult;

    return (
        <>
            <ShowButton
                size="small"
                onClick={() => {
                    setShowId(data?.data.id);
                    setVisibleShowDialog(true);
                }}
            />
            <Dialog
                open={visibleShowDialog}
                onClose={() => setVisibleShowDialog(false)}
            >
                // highlight-next-line
                <Show recordItemId={showId} isLoading={isLoading}></Show>
            </Dialog>
        </>
    );
};
```

:::note
`<Show>` component needs the `id` information for [`<RefreshButton>`](/api-reference/mui/components/buttons/refresh.md) to work properly.
:::

:::caution
The `<Show>` component needs the `id` information for work properly, so if you use the `<Show>` component in custom pages, you should pass the `recordItemId` property.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostShow = () => {
    return <Show dataProviderName="other">...</Show>;
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
            resources={[{ name: "posts", show: PostShow }]}
        />
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx
import { Show } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";
import { MyBackButton } from "@components";

export const ShowPage: React.FC = () => {
    const { goBack } = useNavigation();

    return (
        <Show
            /* ... */
            goBack={<MyBackButton onClick={() => goBack()} />}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `isLoading`

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            /* ... */
            isLoading={loading}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/mui/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            breadcrumb={null}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `wrapperProps`

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            wrapperProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `headerProps`

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            headerProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `contentProps`

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            contentProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Show, Button } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
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
        </Show>
    );
};
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            headerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Show, Button } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
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
        </Show>
    );
};
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx
import { Show } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            /* ... */
            footerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Show>
    );
};
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. By default,The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows nothing in the `<Show>` component.

```tsx title="src/pages/posts/show.tsx"
// highlight-next-line
import { Show, Button } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    return (
        <Show
            // highlight-start
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button type="default">Custom Button 2</Button>
                </>
            }
            // highlight-end
        >
            ...
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/basic-views/show/actionButtonsUsageMui.png" alt="actionButton Usage" />
</div>
<br/>

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Show>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Show>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Typography, Stack } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
        >
            <Stack gap="10px">
                <Typography fontWeight="bold">Id</Typography>
                <Typography>{record?.id}</Typography>
                <Typography fontWeight="bold">Title</Typography>
                <Typography>{record?.title}</Typography>
            </Stack>
        </Show>
    );
};

interface IPost {
    id: number;
    title: string;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/basic-views/show/cardHeaderProps.png" alt="cardHeaderProps Usage" />
</div>
<br/>

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Show>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Show" 
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
headerButtons-default="[`ListButton`](https://refine.dev/docs/api-reference/mui/components/buttons/list-button/), [`EditButton`](https://refine.dev/docs/api-reference/mui/components/buttons/edit-button/), [`DeleteButton`](https://refine.dev/docs/api-reference/mui/components/buttons/delete-button/), [`RefreshButton`](https://refine.dev/docs/api-reference/mui/components/buttons/refresh-button/)"
footerButtonProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/docs/api-reference/mui/components/mui-breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>