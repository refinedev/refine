---
id: resource
title: <Resource>
sidebar_label: <Resource>
---

## Overview

`<Resource>` is the main building block of a **refine** app. A `<Resource>` represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It serves as a bridge between the data from the API and the pages in the app, allowing pages to interact with the data from the API. 



## Usage
Here's an app that consumes the https://api.fake-rest.refine.dev/posts endpoint as a resource to list multiple items, edit or create an item and show a single item.
 
Page components that are for interacting with the CRUD API operations are passed as properties to `<Resource>`.  
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

These components will receive some properties. 


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
The values of `canCreate`, `canEdit` and `canShow` are determined by whether associated components are passed to the `<Resource>` or not.  
`name` and `canDelete` are the values passed to the `<Resource>`.

:::tip
This props can be get by using the [useResource](api-references/hooks/resource/useResource.md) hook.
:::

:::important
`<Resource>` components must be placed as children to the **<[Refine](api-references/components/refine-config.md)>** component.
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
- List page -> `/posts`
- Create page -> `/posts/create/:id?`
- Edit page -> `/posts/edit/:id`
- Show page -> `/posts/show/:id`

<br />

### `list`

The component passed to `list` prop will be rendered on the `/posts` route.

### `create`

The component passed to `create` will be rendered on the `/posts/create` route by default.

> It will also be rendered on `/posts/create/:id`. This represents namely a clone page. `id` represent a record and it will be available as a route parameter.  
For example [`useForm` uses this parameter to create a clone form](/api-references/hooks/form/useForm.md#clone-mode)

> `clone` from `useNavigation` can be used to navigate to a clone page.

### `edit`

The component passed to `edit` will be rendered on the `/posts/edit/:id` route.

### `show`

The component passed to `show` will be rendered on the `/posts/show/:id` route.


### `canDelete`
This value will be passed to all CRUD pages defined to `<Resource>`.

:::tip
**refine**'s <[Edit](api-references/components/basic-views/edit.md)> component uses `canDelete` value to whether show delete button in the edit form or not.
:::

### `icon`

An icon element can be passed as properties for the icon in the menu.

```tsx {2}
<Resource
    ...
    icon={<CustomIcon />}
/>
```

### `options`

Menu item name and route on clicking can be customized.

```tsx {2}
<Resource
    ...
    options={{ label: "custom", route: "/custom" }}
/>
 ```

#### `label`

Name to show in the menu. Plural form of the resource name is shown by default.
#### `route`

Custom route name


