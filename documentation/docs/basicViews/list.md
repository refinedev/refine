---
id: list
title: List
sidebar_label: List
---

import asideUsage from '@site/static/img/aside-usage.png'
import pageHeaderPropsUsage from '@site/static/img/pageHeaderProps-usage.png'

`<List>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a create button and title to the page.

We' ll show what `<List>` does using properties with examples.

## Properties

### `canCreate` and `createButtonProps`

`canCreate` allows adding the create button inside the `<List>` component. If `<Resource>` is passed a create component refine adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the below code.

Create button redirects to the create page of the resource according to the value it reads from the url.

```tsx
import { List, usePermissions } from "@pankod/refine";

export const List: React.FC = (props) => {
    const { data } = usePermissions();

    return (
        <List
            canCreate={data === "admin"}
            createButtonProps={{ size: "small" }}
        >
            ...
        </List>
    );
};
```

[Refer to `usePermission` documentation for detailed usage. &#8594](#)

### `title`

It allows adding title inside the `<List>` component. if you don't pass title props it uses singular resource name by default.

```tsx
import { List } from "@pankod/refine";

export const List: React.FC = () => {
    return <List title="Custom Title">...</List>;
};
```

### `aside`

It allows adding a component to the right of the `<List>` component.

```tsx
import { List, Card } from "@pankod/refine";

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

export const List: React.FC = () => {
    return (
        <List aside={Aside}>
            <div>...</div>
        </List>
    );
};
```

<br/>
<div>
    <img src={asideUsage} alt="Aside Usage"/>
</div>
<br/>

### `pageHeaderProps`

`<List>` uses ant-design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

[Refer to `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx
import { List } from "@pankod/refine";

export const List: React.FC = () => {
    return (
        <List
            pageHeaderProps={{
                onBack: () => console.log("clicked"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </List>
    );
};
```

<br/>
<div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

### `resource`

`<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

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

## API Reference

### Properties

| Property          | Description                               | Type                                                                                   | Default                                                                                                                 |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| canCreate         | Adds create button                        | `boolean`                                                                              | If `<Resource>` is passed a create component, `true` else `false`                                                       |
| createButtonProps | Adds props for create button              | [ButtonProps](#https://ant.design/components/button/#API) & `{ resourceName: string }` | `` {type: "default", icon: <PlusSquareOutlined />, onClick: () => history.push(`/resources/${resourceName}/create`)} `` |
| title             | Adds title                                | `string`                                                                               | Plural of `resource.name`                                                                                               |
| aside             | Adds component to right side              | `React.FC`                                                                             | `undefined`                                                                                                             |
| pageHeaderProps   | Passes props for `<PageHeader>`           | [PageHeaderProps](#https://ant.design/components/page-header/#API)                     | { ghost: false, [title](#title), extra: `<CreateButton />` }                                                            |
| resource          | [`Resource`](#) for API data interactions | `string`                                                                               | Resource name that it reads from the url.                                                                               |
