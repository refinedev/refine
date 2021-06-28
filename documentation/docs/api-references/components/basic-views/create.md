---
id: create
title: Create
---

import asideUsage from '@site/static/img/guides-and-concepts/basic-views/create/aside.png'
import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/create/pageHeaderProps.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/create/actionButtons.png'

`<Create>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a action buttons and title to the page.

We' ll show what `<Create>` does using properties with examples.

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will look like "Create post".

```tsx
import { Create } from "@pankod/refine";

export const Create: React.FC = () => {
    return <Create title="Custom Title">...</Create>;
};
```

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use `saveButtonProps` property like the below code.


[Refer to `<SaveButton>` documentation for detailed usage. &#8594](#)

```tsx
import { Create } from "@pankod/refine";

export const Create: React.FC = () => {
    return <Create saveButtonProps={{ size: "small" }}>...</Create>;
};
```



### `Aside`

It allows adding a component to the right of the `<Edit>` component.

```tsx
import { Edit, Card } from "@pankod/refine";

const Aside: React.FC = () => {
    return (
        <Card title="Post Create Details" extra={<a href="#">More</a>}>
            <p>Here you can give useful information about post create.</p>
        </Card>
    );
};

export const Create: React.FC = () => {
    return <Create Aside={Aside}>...</Create>;
};
```

<br/>
<div>
    <img src={asideUsage} alt="Aside Usage"/>
</div>
<br/>

### `actionButtons`

`<Create>` uses Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` prop of `<Card>` component shows `<SaveButton>` and `<DeleteButton>` depending on your resource definition on `<Resource>` components. If you want to use other things instead of these buttons, you can use `actionButton` property like the below code.

```tsx
import { Create, Button } from "@pankod/refine";

export const Create: React.FC = () => {
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
<div>
    <img src={actionButtonsUsage} alt="actionButton Usage"/>
</div>
<br/>

### `pageHeaderProps`

`<Create>` uses Ant Design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

[Refer to `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx
import { Create } from "@pankod/refine";

export const Create: React.FC = () => {
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
<div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `resource`

`<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to custom pages documentation for detailed usage. &#8594](#)

```tsx
import { Refine, Resource, Create } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage = () => {
//highlight-next-line
    return <Create resource="posts">...</Create>;
};

export const App: React.FC = () => {
    return (
        <Refine
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
        </Refine>
    );
};
```
## API Reference

### Properties

| Property        | Description                               | Type                                                              | Default                                                                            |
| --------------- | ----------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| saveButtonProps | Adds props for create button              | `{ disabled: boolean; onClick: () => void; loading: boolean; }`   | `<SaveButton>`                                                                     |
| title           | Adds title                                | `string`                                                          | `"Edit"` prefix and singular of `resource.name`                                    |
| Aside           | Adds component to right side              | `React.ReactNode`                                                 | `undefined`                                                                        |
| actionButtons   | Passes props for `<PageHeader>`           | `React.ReactNode`                                                 | `<SaveButton>` and depending on your `<Resource>` configuration (`canDelete` prop) |
| pageHeaderProps | Passes props for `<PageHeader>`           | [PageHeaderProps](https://ant.design/components/page-header/#API) | { ghost: false, [title](#title), extra: `<ListButton>` and `<RefreshButton>` }     |
| resource        | [`Resource`](#) for API data interactions | `string`                                                          | Resource name that it reads from the url.                                          |
