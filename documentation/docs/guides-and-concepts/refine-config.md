---
id: refine-config
title: <Refine> Component
sidebar_label: <Refine>
---

`<Refine>` component is the entry point of a **refine** app. It is where the most high level configuration of the app occurs.
It requires only a [`dataProvider`](/docs/guides-and-concepts/providers/data-provider) to bootstrap the app. After adding a `dataProvider` `<Resource>`'s can be added as children.

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


[Refer to Data Provider documentation for detailed information. &#8594](guides-and-concepts/providers/data-provider.md)

<br />

### `authProvider`

`authProvider` handles authentication logic e.g. login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.

[Refer to Auth Provider documentation for detailed information. &#8594](guides-and-concepts/providers/auth-provider.md)

<br />

### `i18nProvider`

`i18nProvider` prop lets you add i18n support to your app using any i18n framework.

[Refer to i18n documentation for detailed information. &#8594](guides-and-concepts/i18n.md)

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