---
id: refine-config
title: <Refine>
sidebar_label: <Refine>
---

import warnwhen from '@site/static/img/warnwhen.png';

`<Refine>` component is the entry point of a **refine** app. It is where the highest level of configuration of the app occurs.
Only a [`dataProvider`](api-references/providers/data-provider.md) is required to bootstrap the app. After adding a `dataProvider`, `<Resource>`'s can be added as children.

```tsx title="App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
            />
        </Refine>
    );
};

export default App;
```

<br />

## Props


### `dataProvider`
<div className="required">Required</div>
<br/>
<br/>

A [`dataProvider`](api-references/providers/data-provider.md) is the place where a refine app communicates with an API.
Data providers also act as adapters for refine, making it possible for it to consume different API's and data services.   
A [`dataProvider`](api-references/providers/data-provider.md) makes HTTP requests and returns response data back using predefined methods.  


[Refer to the Data Provider documentation for detailed information. &#8594](api-references/providers/data-provider.md)

<br />

### `authProvider`

`authProvider` handles authentication logic like login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.

[Refer to the Auth Provider documentation for detailed information. &#8594](api-references/providers/auth-provider.md)

<br />

### `i18nProvider`

`i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.

[Refer to i18n documentation for detailed information. &#8594](api-references/providers/i18n-provider.md)

<br />

### `routes`

`routes` allow us to create custom pages with paths that are different than the ones defined by `<Resource>`s.

[Refer to the Custom Pages documentation for detailed information. &#8594](guides-and-concepts/custom-pages.md)

<br />

### `catchAll`

When the app is navigated to a non-existent route, **refine** shows a default error page. A custom error component can be used for this error page by passing the customized component to `catchAll` property:

```tsx title="App.tsx" {0-2, 8}
const CustomErrorPage = () => (
    <div>Page not found</div>
);

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            catchAll={CustomErrorPage}
        >
         ...
        </Refine>
    );
};
```
<br />

### `mutationMode`

`mutationMode` determines which mode the mutations run with. (e.g. useUpdate, useDelete).

```tsx title="App.tsx" {4}
const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            mutationMode="optimistic"
        >
         ...
        </Refine>
    );
};
```
 `pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly. This is the default setting.

 `optimistic`: The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If the mutation returns with error, UI updates accordingly.

 `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be cancelled from the notification with the ?undo? button. UI will revert back accordingly.


[Refer to the Mutation Mode docs for further information. &#8594](/guides-and-concepts/mutation-mode.md)

### `undoableTimeout`

The duration of the timeout period in **undoable** mode, shown in milliseconds. Mutations can be cancelled during this period. This period can also be set on the supported data hooks.  
The value set in hooks will override the value set with `undoableTimeout`.  
`undoableTimeout` has a default value of `5000`.

```tsx title="App.tsx" {5}
const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            mutationMode="undoable"
            undoableTimeout={3500}
        >
         ...
        </Refine>
    );
};
```

<br />

### `syncWithLocation`

List query parameter values can be edited manually by typing directly in the URL. To activate this feature `syncWithLocation` needs to be set to `true`.

When `syncWithLocation` is active, URL on the listing page shows query parameters like below:

```
/posts?current=1&pageSize=8&sort[]=createdAt&order[]=desc
```

Users are able to change current page, items count per page, sort and filter parameters.

Default value is `false`.

<br />

### `warnWhenUnsavedChanges`

When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
To activate this feature, set the `warnWhenUnsavedChanges` to `true`.

<br />


<div style={{textAlign: "center",  backgroundColor:"#efefef",  padding: "13px 10px 10px"}}>

<img src={warnwhen} />

</div>
<br/>

Default value is `false`.

<br />

### `configProviderProps`

Ant Design's [ConfigProvider](https://ant.design/components/config-provider) which includes default configurations can be changed using `configProviderProps`. 

[Props for the Ant Design's ConfigProvider &#8594](https://ant.design/components/config-provider/#API)

For example, Layout direction can be set to other way:

```tsx title="App.tsx" {4-6}
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            configProviderProps={{
                direction: "rtl"
            }}
        >
         ...
        </Refine>
    );
```

<br />

### `LoginPage`

**refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.

Custom login component can be passed to the `LoginPage` property.

```tsx title="App.tsx" {0, 6}
const CustomLoginPage = () => <div> Custom Login Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            LoginPage={CustomLoginPage}
        >
         ...
        </Refine>
    );
```
<br />

### `DashboardPage`

A custom dashboard page can be passed to the `DashboardPage` prop which is accessible on root route.  
The dashboard item will appear at the top of the sider menu.

`<Resource>` will be shown first if no `DashboardPage` is given.


```tsx title="App.tsx" {0, 6}
const CustomDashboardPage = () => <div> Custom Dashboard Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            DashboardPage={CustomDashboardPage}
        >
         ...
        </Refine>
    );
```

<br />

### `ReadyPage`

**refine** shows a default ready page on root route when no `<Resource>` is passed to the `<Refine>` component as a child.

Custom ready page component can be set by passing to `ReadyPage` property?.

```tsx title="App.tsx" {0, 6}
const CustomReadyPage = () => <div> Custom Ready Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            ReadyPage={CustomReadyPage}
        >
         ...
        </Refine>
    );
```

<br />

### `Sider`

The default sidebar can be customized by using refine hooks and passing custom components to `Sider` property.

**refine** uses [Ant Design Sider](https://ant.design/components/layout/#Layout.Sider) component by default. 

[Refer to the useMenu hook documentation for detailed sidebar customization. &#8594](api-references/hooks/resource/useMenu.md)

<br />

### `Footer`

The default app footer can be customized by passing the `Footer` property.


```tsx title="App.tsx" {0, 6}
const CustomFooter = () => <div>Custom Footer</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Footer={CustomFooter}
        >
         ...
        </Refine>
    );
```

<br />

### `Header`

The default app header can be customized by passing the `Header` property.


```tsx title="App.tsx" {0, 6}
const CustomHeader = () => <div>Custom Header</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Header={CustomHeader}
        >
         ...
        </Refine>
    );
```

<br />

### `Layout`

Default layout can be customized by passing the `Layout` property.

**refine** uses [Ant Design Layout](https://ant.design/components/layout/) components by default. 

Layout property will receive individual layout components as property.

```tsx title="App.tsx" {4-20}
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Layout={({ children, Sider, Footer, Header, OffLayoutArea }) => (
                <AntdLayout
                    style={{ minHeight: "100vh", flexDirection: "row" }}
                >
                    <Sider />
                    <AntdLayout>
                        <Header />
                        <AntdLayout.Content>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                {children}
                            </div>
                        </AntdLayout.Content>
                        <Footer />
                    </AntdLayout>
                    <OffLayoutArea />
                </AntdLayout>
            )}
        >
         ...
        </Refine>
    );
```

<br />

A completely custom layout can also be implemented instead of the  **refine**'s default [Ant Design based layout](https://ant.design/components/layout) like below.

```tsx title="App.tsx" {4-9}
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Layout={({ children }) => (
                <div style={{display: "flex", flexDirection: "column"}} >
                    <div>Custom Layout</div>
                    <div>{children}</div>
                </div>
            )}
        >
         ...
        </Refine>
    );
```
> `children` will be what is passed as component for the route in a Resource(list, edit..) or a custom route.

<br />


### `OffLayoutArea`

The component wanted to be placed out of app layout structure can be set by passing to `OffLayoutArea` prop.

```tsx title="App.tsx" {0, 6}
import { Refine, BackTop } from "@pankod/refine";

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            OffLayoutArea={() => <BackTop />}
        >
         ...
        </Refine>
    );
```

<br />

### `Title`

The app title can be set by passing the `Title` property.


```tsx title="App.tsx" {0, 6}
const CustomTitle = ({collapsed}) => <div>{collapsed ? "Collapsed Title" : "Full Title"}</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            Title={CustomTitle}
        >
         ...
        </Refine>
    );
```

<br />

### `reactQueryClientConfig`

Config for React Query client that **refine** uses.

**refine** uses some defaults that applies to all queries:

```ts
{
    refetchOnWindowFocus: false,
    keepPreviousData: true,
}
```
[Refer to the QueryClient documentation for detailed information. &#8594](https://react-query.tanstack.com/reference/QueryClient#queryclient)


```tsx {4-10}
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            reactQueryClientConfig={{
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                    },
                },
            }}
        >
         ...
        </Refine>
    );
```

### `notificationConfig`

Config for Ant Design [notification](https://ant.design/components/notification/) that **refine** uses.

```tsx {4-8}
const App: React.FC = () =>
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            notifcationConfig={{
                placement: "bottomRight",
                bottom: 40,
                closeIcon: <CloseOutlined />,
            }}
        >
         ...
        </Refine>
    );
```