---
id: list
title: List
sidebar_label: List
---

import cardHeaderPropsTitle from '@site/static/img/guides-and-concepts/basic-views/list/cardHeaderPropsTitle.png'

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

## Properties

### `title`

It allows adding title inside the `<List>` component. if you don't pass title props it uses the plural resource name by default. For example, for the `/posts` resource, it will be "Posts".

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return <List title="Custom Title">...</List>;
};
```

### `resource`

The `<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { List } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <List resource="posts">...</List>;
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

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx title="src/pages/posts/list.tsx"
import { usePermissions } from "@pankod/refine-core";
// highlight-next-line
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    const { data } = usePermissions<string>();

    return (
        <List
            // highlight-start
            canCreate={data === "admin"}
            createButtonProps={{ size: "small" }}
            // highlight-end
        >
            ...
        </List>
    );
};
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/ui-frameworks/mui/components/breadcrumb.md)

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
            /* ... */
            breadcrumb={null}
            /* ... */
        >
            ...
        </List>
    );
};
```

### `wrapperProps`

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
            /* ... */
            wrapperProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </List>
    );
};
```

### `headerProps`

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
            /* ... */
            headerProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </List>
    );
};
```

### `contentProps`

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
            /* ... */
            contentProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </List>
    );
};
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { List, Button } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
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
        </List>
    );
};
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx
import { List } from "@pankod/refine-mui";

export const ListPage: React.FC = () => {
    return (
        <List
            /* ... */
            headerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </List>
    );
};
```

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<List>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<List>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { List, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <List
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
        >
            ...
        </List>
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
    <img src={cardHeaderPropsTitle} alt="Card Header Props Usage" />
</div>
<br/>

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<List>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

## API Reference

### Properties

| Property                                                                                                      | Description                               | Type                                                                            | Default                                                                        |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| title                                                                                                         | Adds title                                | `React.ReactNode`                                                               | Plural of `resource.name`                                                      |
| resource                                                                                                      | Resource name for API data interactions   | `string`                                                                        | Resource name that it reads from the URL.                                      |
| canCreate                                                                                                     | Adds a `<CreateButton>`                   | `React.ReactNode`                                                               | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| createButtonProps                                                                                             | Adds props for `<CreateButton>`           | `{ disabled: boolean; onClick: () => void; loading: boolean; }`                 | `<SaveButton>`                                                                 |
| breadcrumb                                                                                                    | Custom breadcrumb element                 | `React.ReactNode`                                                               | `<Breadcrumb/>`                                                                |
| wrapperProps                                                                                                  | Wrapper element props                     | [`CardProps`](https://mui.com/material-ui/api/card/#props)                      |                                                                                |
| headerProps                                                                                                   | Header element props                      | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)         |                                                                                |
| contentProps                                                                                                  | Content wrapper element props             | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)       |                                                                                |
| headerButtons                                                                                                 | Header buttons element or render function | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode` |                                                                                |
| headerButtonProps                                                                                             | Header buttons wrapper element props      | [`BoxProps`](https://mui.com/material-ui/api/box/#props)                        |                                                                                |
| <div className="required-block"><div>cardProps</div> <div className=" required">deprecated</div></div>        | Passes the props for `<Card>`             | [`CardProps`](https://mui.com/material-ui/api/card/#props)                      | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| <div className="required-block"><div>cardHeaderProps</div> <div className=" required">deprecated</div></div>  | Passes the props for `<CardHeader>`       | [`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)         |                                                                                |
| <div className="required-block"><div>cardContentProps</div> <div className=" required">deprecated</div></div> | Passes the props for `<CardContent>`      | [`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)       |                                                                                |
