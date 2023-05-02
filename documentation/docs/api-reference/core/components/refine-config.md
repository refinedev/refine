---
id: refine-config
title: <Refine>
sidebar_label: <Refine>
---

`<Refine>` component is the entry point of a **refine** app. It is where the highest level of configuration of the app occurs.

[`dataProvider`](/api-reference/core/providers/data-provider.md) and [`routerProvider`](#routerprovider) are required to bootstrap the app. After adding them, [`resources`](#resources) can be added as property.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: "/posts",
                },
            ]}
        />
    );
};

export default App;
```

<br />

## `dataProvider`

<div className="required">Required</div>
<br/>
<br/>

A [`dataProvider`](/api-reference/core/providers/data-provider.md) is the place where a refine app communicates with an API.
Data providers also act as adapters for refine, making it possible for it to consume different API's and data services.  
A [`dataProvider`](/api-reference/core/providers/data-provider.md) makes HTTP requests and returns response data back using predefined methods.

[Refer to the Data Provider documentation for detailed information. &#8594](/api-reference/core/providers/data-provider.md)
:::tip

To activate multiple data provider in refine, we have to pass the default key with `dataProvider` for the default data provider and we can pass other data providers with any key to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import defaultDataProvider from "./dataProvider";
import exampleDataProvider from "./dataProvider";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={{
                default: defaultDataProvider,
                example: exampleDataProvider,
            }}
        />
    );
};
```

:::
<br />

## `routerProvider`

**refine** provides a simple interface from the `routerProvider` prop to infer the resource from route, pass, parse and sync the query parameters and handle navigation operations. This provider and its properties are optional but it is recommended to use it to get the most out of **refine**. Bindings to pass to the `routerProvider` prop are provided for the following libraries:

-   React Router via `@refinedev/react-router-v6`
-   Next.js via `@refinedev/nextjs-router`
-   Remix via `@refinedev/remix-router`

It's also possible to create a custom router bindings for your routing needs.

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::info Legacy Router

In prior versions from v4 of **refine**, `routerProvider` had a different interface and it was required. This is no longer the case and `routerProvider` is optional. If you want to keep using the legacy router provider, you can use the `legacyRouterProvider` prop instead.

:::

## `resources`

`resources` is the main building block of a **refine** app. A resource represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It serves as a bridge between the data from the API and the pages in the app, allowing pages to interact with the data from the API.

Here's an app that consumes the https://api.fake-rest.refine.dev/posts endpoint as a resource to list multiple items, edit or create an item and show a single item.

Routes for the action pages that are for interacting with the CRUD API operations are passed as a resource element to `resources`.

<br />

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/json-server";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            // highlight-start
            resources={[
                {
                    name: "posts",
                    list: "/posts", // Means that the list action of this resource will be available at /posts in your app
                    create: "/posts/create", // Means that the create action of this resource will be available at /posts/create in your app
                    edit: "/posts/edit/:id", // Means that the edit action of this resource will be available at /posts/edit/:id in your app
                    show: "/posts/show/:id", // Means that the show action of this resource will be available at /posts/show/:id in your app
                },
            ]}
            // highlight-end
        />
    );
};

export default App;
```

:::tip
You can use [useResource](/api-reference/core/hooks/resource/useResource.md) hook to get the current active resource by the route or you can pass the `name` or the `identifier` of a resource to the `useResource` hook to get the resource object.
:::

### `name`

<div className="required">Required</div>
<br/>
<br/>

A string value that identifies a resource in the API. Interacting with the data in a resource will be done using an endpoint determined by the `name`:

```
https://api.fake-rest.refine.dev/posts
https://api.fake-rest.refine.dev/posts/1
```

### `identifier`

You can pass this value to a resource and it will be used as the main matching key for the resource. This is useful when you have multiple resources with the same `name`.

### `list`

The list path of the resource. The value assigned to the `list` will be treated as the `list` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

:::info
Passing a component or an object to the action will only take effect if the [`RefineRoutes`](#) component is used in the app to render the routes.
:::

:::caution Legacy Router
When using the legacy router provider, only the component values will be used. Custom paths are not supported.
:::

### `create`

The create path of the resource. The value assigned to the `create` will be treated as the `create` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/create`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

:::info
Passing a component or an object to the action will only take effect if the [`RefineRoutes`](#) component is used in the app to render the routes.
:::

:::caution Legacy Router
When using the legacy router provider, only the component values will be used. Custom paths are not supported.
:::

### `edit`

The edit path of the resource. The value assigned to the `edit` will be treated as the `edit` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/edit/:id`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

:::info
Passing a component or an object to the action will only take effect if the [`RefineRoutes`](#) component is used in the app to render the routes.
:::

:::caution Legacy Router
When using the legacy router provider, only the component values will be used. Custom paths are not supported.
:::

### `show`

The show path of the resource. The value assigned to the `show` will be treated as the `show` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/show/:id`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

:::info
Passing a component or an object to the action will only take effect if the [`RefineRoutes`](#) component is used in the app to render the routes.
:::

:::caution Legacy Router
When using the legacy router provider, only the component values will be used. Custom paths are not supported.
:::

:::tip Nested Routes and Parameters
Additional parameters can also be used in the paths for the actions of the resources. Paths like `/:authorId/posts/:id/details` are also valid and supported. When these actions are used in the navigation helpers, the existing parameters from the URL and the `meta` property of these functions will be used to determine the additional parameters when composing the path.
:::

### `meta`

Menu item name and route on clicking can be customized.

```tsx
<Refine
    ...
    resources={[
        {
            ...
            // highlight-next-line
            meta: { label: "custom", route: "/custom" }
        },
    ]}
/>
```

#### `label`

Name to show in the menu. The plural form of the resource name is shown by default.

#### `icon`

An icon element can be passed as properties for the icon in the menu.

```tsx
<Refine
    ...
    resources={[
        {
            ...
            meta: {
                // highlight-next-line
                icon: <CustomIcon />
            }
        },
    ]}
/>
```

#### `canDelete`

This value will be passed to all CRUD pages defined as the `resources` element.

:::tip
**refine**'s <[Edit](/api-reference/antd/components/basic-views/edit.md)> component uses `canDelete` value to whether show delete button in the edit form or not.
:::

#### `parent`

You can set this value if you want to nest your resource into another resource. Usually this value represents the name of the parent resource but you can also pass a custom string. In this case, it will still be interpreted as a parent resource.

:::tip
This value is used by the `useMenu` and `useBreadcrumb` hooks.
:::

```tsx
<Refine
    /* ... */
    resources={[
        {
            name: "parent",
        },
        {
            name: "child",
            meta: {
                // highlight-next-line
                parent: "parent",
            },
        },
    ]}
/>
```

#### `dataProviderName`

Default data provider name to use for the resource. If not specified, the default data provider will be used.

#### `hide`

Can be used to hide a `resource` in `Sider`. This resource is also filtered in the `useMenu` hook.

#### ~~`route`~~

:::caution Deprecated

This property is deprecated and only works with the legacy routers. When using the new routing system, please define the paths by the actions of the resource.

:::

Custom route name for the resource.

:::tip

You can also pass any type of property into the `meta` object. This property you pass can be received from the [useResource](/api-reference/core/hooks/resource/useResource.md)

:::

<br />

## `authProvider`

`authProvider` handles authentication logic like login, logout flow, and checking user credentials. It is an object with methods that refine uses when necessary.

[Refer to the Auth Provider documentation for detailed information. &#8594](/api-reference/core/providers/auth-provider.md)

<br />

## `i18nProvider`

The `i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.

[Refer to i18n documentation for detailed information. &#8594](/api-reference/core/providers/i18n-provider.md)

<br />

## `accessControlProvider`

`accessControlProvider` is the entry point for implementing access control for **refine** apps.

[Refer to access control documentation for detailed information. &#8594](/api-reference/core/providers/accessControl-provider.md)

<br />

## `liveProvider`

**refine** lets you add Realtime support to your app via `liveProvider`. It can be used to update and show data in Realtime throughout your app.

[Refer to live provider documentation for detailed information. &#8594](/api-reference/core/providers/live-provider.md)

<br />

## `notificationProvider`

`notificationProvider` handles notification logic. It is an object with methods that refine uses when necessary.

[Refer to the Notification Provider documentation for detailed information. &#8594](/api-reference/core/providers/notification-provider.md)

<br />

## `options`

`options` is used to configure the app.

### `breadcrumb`

Customize or disable the breadcrumb. By default it uses the Breadcrumb component from respective package.

The value set in individual CRUD components ([ANTD](/docs/api-reference/antd/components/basic-views/create/#breadcrumb), [Mantine](/docs/api-reference/mantine/components/basic-views/create/#breadcrumb), [MUI](/docs/api-reference/mui/components/basic-views/create/#breadcrumb)) will override the value set with `breadcrumb`.

[Refer to the Breadcrumb docs for further information. &#8594](/docs/api-reference/antd/components/breadcrumb/)

```tsx title="App.tsx"
import { Breadcrumb } from "antd";
OR
import { Breadcrumb } from "@refinedev/mantine";
OR
import { Breadcrumb } from "@refinedev/mui";
OR
import { Breadcrumb } from "my-custom-breadcrumb";

const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-start
            options={{
                breadcrumb: (
                    <div
                        style={{
                            padding: "3px 6px",
                            border: "2px dashed cornflowerblue",
                        }}
                    >
                        <Breadcrumb />
                    </div>
                ),
            }}
            // highlight-end
        />
    );
};
```

To disable the breadcrumb

```tsx title="App.tsx"
const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-start
            options={{
                breadcrumb: false,
            }}
            // highlight-end
        />
    );
};
```

### `mutationMode`

`mutationMode` determines which mode the mutations run with. (e.g. useUpdate, useDelete).

```tsx title="App.tsx"
const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-next-line
            options={{ mutationMode: "optimistic" }}
        />
    );
};
```

`pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfully. This is the default setting.

`optimistic`: The mutation is applied locally, and redirection and UI updates are executed immediately as if the mutation is successful. If the mutation returns with an error, UI updates accordingly.

`undoable`: The mutation is applied locally, and redirection and UI updates are executed immediately as if the mutation is successful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be canceled from the notification with the ?undo? button. UI will revert accordingly.

[Refer to the Mutation Mode docs for further information. &#8594](/advanced-tutorials/mutation-mode.md)

### `undoableTimeout`

The duration of the timeout period in **undoable** mode is shown in milliseconds. Mutations can be canceled during this period. This period can also be set on the supported data hooks.  
The value set in hooks will override the value set with `undoableTimeout`.  
`undoableTimeout` has a default value of `5000`.

```tsx title="App.tsx"
const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-next-line
            options={{ mutationMode: "undoable", undoableTimeout: 3500 }}
        />
    );
};
```

### `syncWithLocation`

List query parameter values can be edited manually by typing directly in the URL. To activate this feature `syncWithLocation` needs to be set to `true`.

:::info

Form hooks like `useDrawerForm` and `useModalForm` also have a `syncWithLocation` property but the value of this option has no effect on these hooks. You'll still need to set the `syncWithLocation` property in hooks to `true` to activate this feature.

:::

When `syncWithLocation` is active, the URL on the listing page shows query parameters like those shown below:

```
/posts?current=1&pageSize=8&sort[]=createdAt&order[]=desc
```

Users can change the current page, items count per page, and sort and filter parameters.

The default value is `false`.

### `warnWhenUnsavedChanges`

When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
To activate this feature, set the `warnWhenUnsavedChanges` to `true`.

:::info
This feature also requires `UnsavedChangesNotifier` component to be mounted. You can import this component from your router package.
:::

<br />

<div style={{textAlign: "center",  backgroundColor:"#efefef",  padding: "13px 10px 10px"}}>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/warnwhen.png" />

</div>
<br/>

The default value is `false`.

### `liveMode`

Whether to update data automatically (`auto`) or not (`manual`) if a related live event is received. The `off` value is used to avoid creating a subscription.

[Refer to live provider documentation for detailed information. &#8594](/api-reference/core/providers/live-provider.md#livemode)

### `disableTelemetry`

**refine** implements a simple and transparent telemetry module for collecting usage statistics defined in a very limited scope. This telemetry module is used to improve the **refine** experience. You can disable this by setting `disableTelemetry` to `true`.

[Refer to refine telemetry documentation for detailed information. &#8594](/further-readings/telemetry.md)

### `redirect`

By default, **refine** redirects to the `list` page of the resource after a successful form mutation. To change this behaviour based on the form [action](/api-reference/core/hooks/useForm.md#actions), set `redirect` as follows:

```tsx title="App.tsx"
const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-start
            options={{
                redirect: {
                    afterCreate: "show",
                    afterClone: "edit",
                    afterEdit: false,
                },
            }}
            // highlight-end
        />
    );
};
```

When the `redirect` option is set to `false`, no redirect is performed after a successful form mutation.

:::caution

If you don't have a show page and you redirect to the show page, the user will be redirected to the list page. Also, in the `undoable` and `optimistic` mutation modes, redirect happens before the mutation succeeds. Therefore, if there is no data in the query cache, the user will be redirected to the list page.

:::

### `reactQuery`

#### `clientConfig`

Config for React Query client that **refine** uses.

**refine** uses some defaults that apply to all queries:

```ts
{
    refetchOnWindowFocus: false,
    keepPreviousData: true,
}
```

[Refer to the QueryClient documentation for detailed information. &#8594](https://react-query.tanstack.com/reference/QueryClient#queryclient)

```tsx
const App: React.FC = () => (
    <Refine
        ...
        // highlight-start
        options={{
            reactQuery: {
                clientConfig: {
                    defaultOptions: {
                        queries: {
                            staleTime: Infinity,
                        },
                    },
                },
            },
        }}
        // highlight-end
    />
);
```

Also, you can implement your own [QueryClient](https://react-query.tanstack.com/reference/QueryClient#queryclient).

```tsx
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => (
    <Refine
        ...
        // highlight-start
        options={{
            reactQuery: {
                clientConfig: queryClient
            },
        }}
        // highlight-end
    />
);
```

#### `devtoolConfig`

Config for customizing React Query Devtools. If you want to disable the Devtools, set `devtoolConfig` to `false`.

**refine** uses some defaults that apply to react-query devtool:

```ts
{
    initialIsOpen: false,
    position: "bottom-right"
}
```

[Refer to the Devtools documentation for detailed information. &#8594](https://react-query.tanstack.com/devtools#options)

```tsx {4-7}
const App: React.FC = () => (
    <Refine
        ...
        // highlight-start
        options={{
            reactQuery: {
                devtoolConfig: {
                    initialIsOpen: true,
                    position: "bottom-left",
                },
            },
        }}
        // highlight-end
    />
);
```

<br />

## `onLiveEvent`

Callback to handle all live events.

[Refer to live provider documentation for detailed information. &#8594](/api-reference/core/providers/live-provider.md#refine)

## ~~`catchAll`~~

:::caution Deprecated

`LoginPage` only works with the legacy routing system. It will be removed in the next major release. Please create a catch all route to handle this when using the new routing system.

:::

When the app is navigated to a non-existent route, **refine** shows a default error page. A custom error component can be used for this error page by passing the customized component to the `catchAll` property:

```tsx title="App.tsx"
// highlight-next-line
const CustomErrorPage = <div>Page not found</div>;

const App: React.FC = () => {
    return (
        <Refine
            ...
            // highlight-next-line
            catchAll={CustomErrorPage}
        />
    );
};
```

<br />

## ~~`LoginPage`~~

:::caution Deprecated

`LoginPage` only works with the legacy routing system. It will be removed in the next major release. Please create a route for the login page when using the new routing system.

:::

**refine** has a default login page form which is served on the `/login` route when the `authProvider` configuration is provided.

Custom login component can be passed to the `LoginPage` property.

```tsx title="App.tsx"
// highlight-next-line
const CustomLoginPage = () => <div> Custom Login Page </div>;

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        LoginPage={CustomLoginPage}
    />
);
```

<br />

## ~~`DashboardPage`~~

:::caution Deprecated

`DashboardPage` only works with the legacy routing system. It will be removed in the next major release. Please create a route for the root page when using the new routing system.

:::

A custom dashboard page can be passed to the `DashboardPage` prop which is accessible on the root route.

The dashboard item will appear at the top of the sider menu. If `DashboardPage` is not given, the first resource of `resources` will be shown.

```tsx title="App.tsx"
// highlight-next-line
const CustomDashboardPage = () => <div> Custom Dashboard Page </div>;

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        DashboardPage={CustomDashboardPage}
    />
);
```

<br />

## ~~`ReadyPage`~~

:::caution Deprecated

`ReadyPage` only works with the legacy routing system. Now you can start using **refine** without any resources defined.

:::

**refine** shows a default ready page on the root route when no `resources` is passed to the `<Refine>`.

Custom ready page component can be set by passing to the `ReadyPage` property?.

```tsx title="App.tsx"
// highlight-next-line
const CustomReadyPage = () => <div> Custom Ready Page </div>;

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        ReadyPage={CustomReadyPage}
    />
);
```

<br />

## ~~`Sider`~~

:::caution Deprecated

`Sider` only works with the legacy routing system and the `Layout` prop. Please pass the `Sider` property to the `Layout` component when using the new routing system.

:::

The default sidebar can be customized by using refine hooks and passing custom components to the `Sider` property.

**refine** uses [Ant Design Sider](https://ant.design/components/layout/#Layout.Sider) component by default.

[Refer to the `useMenu` hook documentation for detailed sidebar customization. &#8594](/api-reference/core/hooks/ui/useMenu.md)

<br />

## ~~`Footer`~~

:::caution Deprecated

`Footer` only works with the legacy routing system and the `Layout` prop. Please pass the `Footer` property to the `Layout` component when using the new routing system.

:::

The default app footer can be customized by passing the `Footer` property.

```tsx title="App.tsx"
// highlight-next-line
const CustomFooter = () => <div>Custom Footer</div>;

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        Footer={CustomFooter}
    />
);
```

<br />

## ~~`Header`~~

:::caution Deprecated

`Header` only works with the legacy routing system and the `Layout` prop. Please pass the `Header` property to the `Layout` component when using the new routing system.

:::

The default app header can be customized by passing the `Header` property.

```tsx title="App.tsx"
// highlight-next-line
const CustomHeader = () => <div>Custom Header</div>;

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        Header={CustomHeader}
    />
);
```

<br />

## ~~`Layout`~~

:::caution Deprecated

`Layout` only works with the legacy routing system and will be removed in the next major release. You can continue using the `Layout` component by wrapping it to the components you want to render.

:::

The default layout can be customized by passing the `Layout` property.

**refine** uses [Ant Design Layout](https://ant.design/components/layout/) components by default.

Layout property will receive individual layout components as property.

```tsx title="App.tsx"
const App: React.FC = () => (
    <Refine
        ...
        // highlight-start
        Layout={({ children, Sider, Footer, Header, OffLayoutArea }) => (
            <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
                {Sider && <Sider />}
                <AntdLayout>
                    {Header && <Header />}
                    <AntdLayout.Content>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            {children}
                        </div>
                    </AntdLayout.Content>
                    {Footer && <Footer />}
                </AntdLayout>
                {OffLayoutArea && <OffLayoutArea />}
            </AntdLayout>
        )}
        // highlight-end
    />
);
```

<br />

A completely custom layout can also be implemented instead of the **refine**'s default [Ant Design based layout](https://ant.design/components/layout) like below.

```tsx title="App.tsx"
const App: React.FC = () => (
    <Refine
        ...
        // highlight-start
        Layout={({ children }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Custom Layout</div>
                <div>{children}</div>
            </div>
        )}
        // highlight-end
    />
);
```

[Refer to the Custom Layout documentation for detailed information. &#8594](/advanced-tutorials/custom-layout.md)

> `children` will be what is passed as a component for the route in a resource(list, edit..) or a custom route.

<br />

## ~~`OffLayoutArea`~~

:::caution Deprecated

`OffLayoutArea` only works with the legacy routing system and the `Layout` prop. Please pass the `OffLayoutArea` property to the `Layout` component when using the new routing system.

:::

The component wanted to be placed out of the app layout structure can be set by passing to the `OffLayoutArea` prop.

```tsx title="App.tsx"
// highlight-next-line
import { Refine } from "@refinedev/core";

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        OffLayoutArea={() => <div>Some elements to place outside the layout</div>}
    />
);
```

<br />

## ~~`Title`~~

:::caution Deprecated

`Title` only works with the legacy routing system and the `Layout` prop. Please pass the `Title` property to the `Layout` component when using the new routing system.

:::

The app title can be set by passing the `Title` property.

```tsx title="App.tsx"
// highlight-start
const CustomTitle = ({ collapsed }) => (
    <div>{collapsed ? "Collapsed Title" : "Full Title"}</div>
);
// highlight-end

const App: React.FC = () => (
    <Refine
        ...
        // highlight-next-line
        Title={CustomTitle}
    />
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/Refine"/>

[routerprovider]: /api-reference/core/providers/router-provider.md
