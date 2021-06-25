---
id: resource
title: <Resource>
sidebar_label: <Resource>
---

## Overview

`<Resource>` is the main building block of a **refine** app. A `<Resource>` represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It serves as a bridge with the data from the API and the pages in the app to interact with that data.



## Usage
Here's an app that consumes the https://api.fake-rest.refine.dev/posts endpoint as a resource to list multiple items, edit or create an item and show a single item.
 
Page components for interacting with CRUD API operations are passed as props to `<Resource>`.  
 <br />

```tsx title="App.tsx"
import { Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Refine>
    );
};

export default App;
```



<br />

Those components will be passed some props. 


```tsx title="PostList.tsx"
interface IResourceComponentsProps {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name: string;
}

const PostList: React.FC<IResourceComponentsProps> = (props) => {
    ...
}
```
The values of `canCreate`, `canEdit` and `canShow` are determined by whether associated components are passed to the `<Resource>`.  
`name` and `canDelete` are the values passed to the `<Resource>`.

:::important
`<Resource>` components must be placed as children to the <[Refine](api-references/components/refine-config.md)> component.
:::
## Props

### `name`
<div className="required">Required</div>  
<br/>
<br/>

A string value that identifies a resource in the API. Interacting with the data in a resource will be done using an endpoint determined by the `name`:

```
https://api.fake-rest.refine.dev/posts  
https://api.fake-rest.refine.dev/posts/1
```

<br />

`name` also determines the routes of the pages of a resource:  
- List page -> `/resources/posts`
- Create page -> `/resources/posts/create/:id?`
- Edit page -> `/resources/posts/edit/:id`
- Show page -> `/resources/posts/show/:id`

<br />

### `list`

The component passed to `list` prop will be rendered on `/resources/posts` route.

### `create`

The component passed to `create` will be rendered on `/resources/posts/create` route by default.

> It will also be rendered on `/resources/posts/create/:id`. This represents namely a clone page. `id` represent a record and it will be available as a route parameter.  
For example [`useForm` uses this parameter to create a clone form](#)

> `clone` from `useNavigation` can be used to navigate to a clone page.

### `edit`

The component passed to `edit` will be rendered on `/resources/posts/edit/:id` route.

### `show`

The component passed to `show` will be rendered on `/resources/posts/show/:id` route.

