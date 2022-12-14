---
id: create
title: Create
swizzle: true
---


`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return <Create title="Custom Title">...</Create>;
};
```

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/advanced-tutorials/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Create } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const CustomPage = () => {
    return <Create resource="posts">...</Create>;
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

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/mui/components/buttons/save.md)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return <Create saveButtonProps={{ size: "small" }}>...</Create>;
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx
import { Create } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";
import { MyBackButton } from "@components";

export const CreatePage: React.FC = () => {
    const { goBack } = useNavigation();

    return (
        <Create
            /* ... */
            goBack={<MyBackButton onClick={() => goBack()} />}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            /* ... */
            isLoading={loading}
            /* ... */
        >
            ...
        </Create>
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
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            breadcrumb={null}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            wrapperProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            headerProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            contentProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Create, Button } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
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
        </Create>
    );
};
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            headerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx
import { Create, Button } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
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
        </Create>
    );
};
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx
import { Create } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            /* ... */
            footerButtonProps={{
                sx: {
                    backgroundColor: "snow",
                },
            }}
            /* ... */
        >
            ...
        </Create>
    );
};
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows [`<SaveButton>`](/api-reference/mui/components/buttons/save.md) and [`<DeleteButton>`](/api-reference/mui/components/buttons/delete.md) based on your resource definition in the`resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { Create, Button } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
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
        </Create>
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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/basic-views/create/actionButtonUsageMui.png" alt="actionButton Usage" />
</div>
<br/>

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Create>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Create>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx
// highlight-next-line
import { Create, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
    return (
        <Create
            // highlight-start
            cardHeaderProps={{
                title: <Typography variant="h5">Custom Title</Typography>,
            }}
            // highlight-end
        >
            ...
        </Create>
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
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/basic-views/create/cardHeaderPropsTitle.png" alt="Card Header Props Usage" />
</div>
<br/>

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Create>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Create" goBack-default="`<ArrowLeft />`"/>