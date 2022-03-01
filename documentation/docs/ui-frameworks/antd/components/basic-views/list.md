---
id: list
title: List
sidebar_label: List
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/list/pageHeaderProps.png'

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

## Properties

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx 
import { usePermissions } from "@pankod/refine-core";
import { List } from "@pankod/refine-antd";

export const ListPage: React.FC = () => {
    const { data } = usePermissions<string>();

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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `title`

It allows adding a title for the `<List>` component. if you don't pass title props, it uses plural from of resource name by default.

```tsx 
import { List } from "@pankod/refine-antd";

export const ListPage: React.FC = () => {
    return <List title="Custom Title">...</List>;
};
```

### `pageHeaderProps`

`<List>` uses ant-design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

[Refer to the `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx 
import { List } from "@pankod/refine-antd";

export const ListPage: React.FC = () => {
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

`<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx
import { Refine } from "@pankod/refine-core";
import { List } from "@pankod/refine-antd";
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

| Property          | Description                             | Type                                                                                  | Default                                                       |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| canCreate         | Adds create button                      | `boolean`                                                                             | If the resource is passed a create component, `true` else `false` |
| createButtonProps | Adds props for create button            | [ButtonProps](https://ant.design/components/button/#API) & `{ resourceName: string }` | `<CreateButton />`                                            |
| title             | Adds title                              | `string`                                                                              | Plural of `resource.name`                                     |
| pageHeaderProps   | Passes properties for `<PageHeader>`    | [PageHeaderProps](https://ant.design/components/page-header/#API)                     | { ghost: false, [title](#title), extra: `<CreateButton />` }  |
| resource          | Resource name for API data interactions | `string`                                                                              | Resource name that it reads from the url.                     |
