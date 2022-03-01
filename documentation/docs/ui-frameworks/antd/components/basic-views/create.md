---
id: create
title: Create
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/create/pageHeaderPropsUsage.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/create/actionButtonsUsage.png'

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx 
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return <Create title="Custom Title">...</Create>;
};
```

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/buttons/save.md)

```tsx 
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return <Create saveButtonProps={{ size: "small" }}>...</Create>;
};
```

### `actionButtons`

`<Create>` uses the Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` property of the `<Card>` component shows `<SaveButton>` and `<DeleteButton>` based on your resource definition in the `resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx 
import { Create, Button } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button size="small">Custom Button 2</Button>
                </>
            }
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
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### `pageHeaderProps`

`<Create>` uses the Ant Design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

[Refer to the `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx 
import { Create } from "@pankod/refine-antd";

export const CreatePage: React.FC = () => {
    return (
        <Create
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
            }}
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
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { Create } from "@pankod/refine-antd";
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
                ]
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

| Property        | Description                             | Type                                                              | Default                                                                        |
| --------------- | --------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| saveButtonProps | Adds props for create button            | `{ disabled: boolean; onClick: () => void; loading: boolean; }`   | `<SaveButton>`                                                                 |
| title           | Adds title                              | `string`                                                          | `"Edit"` prefix and singular of `resource.name`                                |
| actionButtons   | Passes the props for `<PageHeader>`     | `React.ReactNode`                                                 | `<SaveButton>` and depending on your resource configuration (`canDelete` prop) |
| pageHeaderProps | Passes the props for `<PageHeader>`     | [PageHeaderProps](https://ant.design/components/page-header/#API) | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>` } |
| resource        | Resource name for API data interactions | `string`                                                          | Resource name that it reads from the URL.                                      |
