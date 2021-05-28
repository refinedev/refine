---
id: list
title: List
sidebar_label: List
---

import list from '@site/static/img/list-component.png'

`<List>` does not contain any logic just for display only. It makes some things easier for us like adds extra functionalities like a create button and title to the page.

Let's examine what `<List>` does, with step-by-step examples.

## Options

### canCreate and createButtonProps

It adds the create button to your `<List>` component. `refine` adds this button by default. If you want to customize this button you can use `createButtonProps` property.

```tsx
import { List, IResourceComponentsProps } from "@pankod/refine";

export const List: React.FC<IResourceComponentsProps> = (props) => {
    return (
        <List
            canCreate
            createButtonProps={{ onClick: () => console.log("Hello, refine") }}
        >
            <div>...</div>
        </List>
    );
};
```

### title

It adds a title to your component if you don't pass title props it uses resource name by default.

```tsx
import { List, IResourceComponentsProps } from "@pankod/refine";

export const List: React.FC<IResourceComponentsProps> = () => {
    return (
        <List title="Default Title">
            <div>...</div>
        </List>
    );
};
```

### aside

It allows you to add a component to the right of the List component.

```tsx
import { List, IResourceComponentsProps, Card } from "@pankod/refine";

const Aside: React.FC = () => {
    return (
        <Card title="Users List Details" extra={<a href="#">More</a>}>
            <p>
                You can view personal data of users registered in your system in
                the user table.
            </p>
        </Card>
    );
};

export const List: React.FC<IResourceComponentsProps> = () => {
    return (
        <List aside={Aside}>
            <div>...</div>
        </List>
    );
};
```

### pageHeaderProps

`<List>` uses ant-design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

[Refer to `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx
import { List, IResourceComponentsProps } from "@pankod/refine";

export const List: React.FC<IResourceComponentsProps> = () => {
    return (
        <List
            pageHeaderProps={{
                onBack: () => console.log("clicked"),
                subTitle: "Subtitle",
            }}
        >
            <div>...</div>
        </List>
    );
};
```

### resource

`<List>` component needs the `resource` property when it is not passed to the `<Resource>` component as property.

[Refer to custom pages documentation for detailed usage. &#8594](#)

```tsx
import { Admin, Resource, List } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";

const CustomPage = () => {
    return <List resource="posts">...</List>;
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

<br/>
<div>
    <img src={list} alt="List Component"/>
</div>
<br/>

-   The red square contains [papeHeaderprops](#pageheaderprops).
-   The blue square shows [aside](#aside) components.

## API Reference

### Properties

| Property          | Description                               | Type                                                                             | Default         |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------- | --------------- |
| canCreate         | Adds create button                        | boolean                                                                          | true            |
| createButtonProps | Adds props for create button              | [ButtonProps](#https://ant.design/components/button/#API) & resourceName: string | `resource.name` |
| title             | Adds title                                | string                                                                           | -               |
| aside             | Adds component to right side              | `React.FC`                                                                       | -               |
| pageHeaderProps   | Passes props for `<PageHeader>`           | [PageHeaderProps](#https://ant.design/components/page-header/#API)               | -               |
| resource          | [`Resource`](#) for API data interactions | string                                                                           | -               |
