---
id: refine-config
title: <Refine> Component
sidebar_label: <Refine>
---

import warnwhen from '@site/static/img/warnwhen.png';

`<Refine>` component is the entry point of a **refine** app. It is where the most high level configuration of the app occurs.
It requires only a [`dataProvider`](api-references/providers/data-provider.md) to bootstrap the app. After adding a `dataProvider` `<Resource>`'s can be added as children.

```tsx title="App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
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

A data provider is the place where a refine app communicates with an API.
Data providers also act as adapters for refine making it possible to consume different API's and data services conveniently.   
A data provider makes HTTP requests and returns response data back using predefined methods.  


[Refer to Data Provider documentation for detailed information. &#8594](api-references/providers/data-provider.md)

<br />

### `authProvider`

`authProvider` handles authentication logic e.g. login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.

[Refer to Auth Provider documentation for detailed information. &#8594](api-references/providers/auth-provider.md)

<br />

### `i18nProvider`

`i18nProvider` prop lets you add i18n support to your app using any i18n framework.

[Refer to i18n documentation for detailed information. &#8594](api-references/providers/i18n-provider.md)

<br />

### `routes`

`routes` allows to create custom pages with a path different than defined by `<Resource>`s.

[Refer to Custom Pages documentation for detailed information. &#8594](guides-and-concepts/custom-pages.md)

<br />

### `catchAll`

When the app is navigated to a non-existent route, **refine** shows a default error page. A custom error component can be used for this error page by passing the customized component to `catchAll` prop.

```tsx title="App.tsx"
...

const CustomErrorPage = () => (
    <div>Page not found</div>
)

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-next-line
            catchAll={CustomErrorPage}
        >
         ...
        </Refine>
    );
};
```
<br />

### `mutationMode`

Determines the mode with which the mutations run (e.g. useUpdate, useDelete).

```tsx title="App.tsx"
...

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-next-line
            mutationMode="optimistic"
        >
         ...
        </Refine>
    );
};
```
 `pessimistic` : The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly. This is the default setting.

 `optimistic` : The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. If mutation returns with error, UI updates accordingly.

 `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if mutation is succesful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.


[Refer to mutation mode docs for further information. &#8594](#)

### `undoableTimeout`

Duration in miliseconds for timeout period for cancelling mutations in **undoable** mode. Mutations can be cancelled during this period. This period can also be set on supported data hooks.  
The one set in hooks will override the value set with `undoableTimeout`.  
`undoableTimeout` has a default value of `5000`.

```tsx title="App.tsx"
...

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            mutationMode="undoable"
            //highlight-next-line
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
/resources/posts?current=1&pageSize=8&sort[]=createdAt&order[]=desc
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

Ant Design's [ConfigProvider](https://ant.design/components/config-provider) which includes default configurations can be change using `configProviderProps`. 

[Props for Ant Design's ConfigProvider &#8594](https://ant.design/components/config-provider/#API)

For example, Layout direction can be set to other way:

```tsx title="App.tsx"
...
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            configProviderProps={{
                direction: "rtl"
            }}
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

### `LoginPage`

**refine** has a default login page form which is served on `/login` route when `authProvider` config is provided.

Custom login component can be passed to `LoginPage` prop.

```tsx title="App.tsx"
...
const CustomLoginPage = () => <div> Custom Login Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            LoginPage={CustomLoginPage}
            //highlight-end
        >
         ...
        </Refine>
    );
```
<br />

### `DashboardPage`

A custom dashboard page can be passed to `DashboardPage` prop which is accessible on root route.  
The dashboard item will appear at the top of the sider menu.

First `<Resource>` will be shown if no `DashboardPage` is given.


```tsx title="App.tsx"
...
const CustomDashboardPage = () => <div> Custom Dashboard Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            DashboardPage={CustomDashboardPage}
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

### `ReadyPage`

**refine** shows a default ready page on root route when no `<Resource>` is passed to `<Refine>` component as a child.

Custom ready page component can be set by passing to `ReadyPage` prop.

```tsx title="App.tsx"
...
const CustomReadyPage = () => <div> Custom Ready Page </div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            ReadyPage={CustomReadyPage}
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

### `Sider`

The default sidebar can be customized by using refine hooks and passing custom component to `Sider` prop.

**refine** uses [Ant Design Sider](https://ant.design/components/layout/#Layout.Sider) component by default. 

[Refer to useMenu hook documentation for detailed sidebar customization. &#8594](api-references/hooks/resource/useMenu.md)

<br />

### `Footer`

The default app footer can be customized by passing `Footer` prop.


```tsx title="App.tsx"
...
const CustomFooter = () => <div>Custom Footer</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            Footer={CustomFooter}
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

### `Header`

The default app header can be customized by passing `Header` prop.


```tsx title="App.tsx"
...
const CustomHeader = () => <div>Custom Header</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            Header={CustomHeader}
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

### `Layout`

Default layout can be customized by passing `Layout` prop.

**refine** uses [Ant Design Layout](https://ant.design/components/layout/) components by default. 

Layout prop will receive individual layout components as props.

```tsx title="App.tsx"
...

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
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
            //highlight-end
        >
         ...
        </Refine>
    );
```

<br />

A completely custom layout can also be implemented instead of the  **refine**'s default [Ant Design based layout](https://ant.design/components/layout) like below.

```tsx title="App.tsx"
...
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            Layout={({ children }) => (
                <div style={{display: "flex", flexDirection: "column"}} >
                    <div>Custom Layout</div>
                    <div>{children}</div>
                </div>
            )}
            //highlight-end
        >
         ...
        </Refine>
    );
```
> `children` will be what is passed as component for the route in a Resource(list, edit..) or a custom route.

<br />


### `OffLayoutArea`

The component wanted to be placed out of app layout structure can be set by passing to `OffLayoutArea` prop.

```tsx title="App.tsx"
//highlight-next-line
import { Refine, BackTop } from "@pankod/refine";
...
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-next-line
            OffLayoutArea={() => <BackTop />}
        >
         ...
        </Refine>
    );
```

<br />

### `Title`

The app title can be set by passing `Title` prop.


```tsx title="App.tsx"
...

const CustomTitle = ({collapsed}) => <div>{collapsed ? "Collapsed Title" : "Full Title"}</div>;

const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-start
            Title={CustomTitle}
            //highlight-end
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
[Refer to QueryClient documentation for detailed information. &#8594](https://react-query.tanstack.com/reference/QueryClient#queryclient)


```tsx
...
const App: React.FC = () => 
    (
        <Refine
            dataProvider={dataProvider(API_URL)}
            //highlight-next-line
            reactQueryClientConfig={{ keepPreviousData: false }}
        >
         ...
        </Refine>
    );
```