---
id: permission
title: Permission
---


refine allows us to add permission to your `Resource`. 


## Usage

To do this, it is necessary to create an object with [`PermissionItem`](#permissionitem) then, pass this object as one of the [`IResource Permission`](#iresource-permission) prop in the `<Resource>` component.

### Post List Page

```tsx title="App.tsx"

import { Admin, Resource } from "@pankod/refine";
import {
    PostCreate,
    PostList,
    PostEdit,
    PostShow,
} from "./components/pages";


const App: React.FC = () => {

const API_URL = "https://refine-fake-rest.pankod.com";

const authProvider: AuthProvider = {
        login: (params: any) => {
            if (params.username === "admin") {
                localStorage.setItem("username", params.username);
                return Promise.resolve();
            }

            return Promise.reject(new Error("Invalid username or password"));
        },
        logout: () => {
            localStorage.removeItem("username");
            return Promise.resolve();
        },
        checkError: () => Promise.resolve(),
        checkAuth: () =>
            localStorage.getItem("username")
                ? Promise.resolve()
                : Promise.reject(),
        getPermissions: () => Promise.resolve(["hr"]),
        getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            }),
    };

     // highlight-start
    const allowPostList = {
        list: ["admin", "hr"],
        hasPermission: true,
    };
    const allowPostCreate = {
        list: ["admin"],
        hasPermission: true,
    };
    const allowPostEdit = {
        list: ["admin"],
        hasPermission: true,
    };
    const allowPostShow = {
        list: ["admin", "hr"],
        hasPermission: true,
    };
    const allowPostDelete = {
        list: ["admin", "hr"],
        hasPermission: true,
    };
    const allowPostSideBar = {
        list: ["admin", "hr"],
        hasPermission: false,
    };
  // highlight-end

    return (
        <Admin dataProvider={dataProvider(API_URL)}  authProvider={authProvider}>
             <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                // highlight-start
                allowCreate={allowPostCreate}
                allowEdit={allowPostEdit}
                allowList={allowPostList}
                allowShow={allowPostShow}
                allowDelete={allowPostDelete}
                allowSideBar={allowPostSideBar}
                // highlight-end
            />
        </Admin>
    );
};

export default App;
```

### Allow Types
```ts title="interfaces/index.d.ts"
type AllowType =
    | "allowList"
    | "allowCreate"
    | "allowEdit"
    | "allowShow"
    | "allowDelete"
    | "allowSideBar";
```

### Permission Item
```ts
export interface PermissionItem {
    list: string[];
    hasPermission: boolean;
}
```

### IResource Permission
```ts
export interface IResourcePermission {
    allowList?: PermissionItem;
    allowCreate?: PermissionItem;
    allowEdit?: PermissionItem;
    allowShow?: PermissionItem;
    allowDelete?: PermissionItem;
    allowSideBar?: PermissionItem;
}
```

<br/>

