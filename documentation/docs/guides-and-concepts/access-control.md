---
id: access-control
title: Access Control
sidebar_label: Access Control
---

import simpleAccess from '@site/static/img/guides-and-concepts/access-control/simple-access.png';
import dynamicRole from '@site/static/img/guides-and-concepts/access-control/dynamic-role.gif';

## Introduction

Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different solutions(RBAC, ABAC, ACL, IP, LDAP, etc...). `can` method would be the entry point for those solutions.

[Refer to the Access Control Provider documentation for detailed information. &#8594](api-references/providers/accessControl-provider.md)

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

We will be using **[Casbin](https://casbin.org/)** in this guide for users with different roles who have different access rights for parts of the app.

## Installation

We need to install Casbin.

```bash
npm install casbin.js --save
```

## Setup

The app will have three resources: **posts**, **users** and **categories** with CRUD pages(list, create, edit and show)

[You can refer to codesandbox to how they are implemented](#live-codesandbox-example)

`App.tsx` will look like this before we begin implementing access control:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
                {
                    name: "users",
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                },
            ]}
        />
    );
};

export default App;

```

## Adding Policy and Model

The way **[Casbin](https://casbin.org/)** works is that access rights are checked according to policies that are defined based on a model. [You can find further information about how models and policies work here](https://casbin.org/docs/en/how-it-works).

Let's add a model and a policy for a role `editor` that have `list` access for `posts` resource.

```ts title="src/accessControl.ts"
import { newModel, MemoryAdapter } from "casbin.js";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new MemoryAdapter(`
p, editor, posts, (list)
`);

```

:::tip
You can can find more examples in [casbin documentation](https://casbin.org/docs/en/supported-models) or play with lots of examples in [casbin editor](https://casbin.org/en/editor)  
:::

## Adding `accessControlProvider`

Now we will implement the `can` method for `accessControlProvider` to integrate our policy.


```tsx title="src/App.tsx" 
// ...
import { newEnforcer } from "casbin.js";

import { model, adapter } from "accessControl";

const App: React.FC = () => {
    return (
        <Refine
            // ...
            // highlight-start
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    const can = await enforcer.enforce("editor", resource, action);

                    return Promise.resolve({
                        can,
                    });
                },
            }}
            // highlight-end
            // ...
        />
    );
};

export default App;
```

What happens is that whenever a part of the app checks for access control, refine passes `resource`, `action` and `params` parameters to `can` and then we can use these parameters to integrate our specific access control solution which is **casbin** in this case.

What our model provides is that user with role `editor` have access for `list` action on `posts` resource. Even though we have two other resources, since our policy doesn't include them, they will not appear on sidebar menu. Also in list page of `posts`, buttons for **create**, **edit** and **show** buttons will be disabled.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={simpleAccess} alt="Simple Access Control" />
</div>
<br/>

## Adding Different Roles

We can provide different access rights to different type of users for different parts of the app. We can do that by adding policies for the different roles.

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, users, (list)|(create)
p, admin, categories, (list)|(create)

p, editor, posts, (list)|(create)
p, editor, categories, list
`);
```

- **admin** will have access to **list** and **create** for every resource
- **editor** will have access to **list** and **create** for **posts**
- **editor** won't have any access for **users**
- **editor** will have only **list** access for **categories**

We can demonstrate the effect of different roles by changing the `role` dynamically. Let's implement a switch in the header for selecting either **admin** or **editor** role to see the effect on the app.

```tsx title="src/App.tsx" 
// ...
// highlight-next-line
import { Header } from "components/header";

const App: React.FC = () => {
    // highlight-next-line
    const [role, setRole] = useState("admin");

    return (
        <Refine
            // ...
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    // highlight-next-line
                    const can = await enforcer.enforce(role, resource, action);

                    return Promise.resolve({
                        can,
                    });
                },
            }}
            // highlight-next-line
            Header={() => <Header role={role} setRole={setRole} />}
            // ...
        />
    );
};

export default App;
```

<details>
<summary>Header Component</summary>

```tsx title="src/components/header.tsx"
import { AntdLayout, Radio } from "@pankod/refine";

interface HeaderProps {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
    return (
        <AntdLayout.Header
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "48px",
                backgroundColor: "#FFF",
            }}
        >
            <Radio.Group
                value={role}
                onChange={(event) => setRole(event.target.value)}
            >
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="editor">Editor</Radio.Button>
            </Radio.Group>
        </AntdLayout.Header>
    );
};
```
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={dynamicRole} alt="Dynamic Role" />
</div>
<br/>

## Handling access with params

### ID Based Access

update `can`: (write if for different actions)

can configure for ownership

admin -> editor

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)
`);
```

`*` is wildcard. can be specialized for specific ids:

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/5, (edit)|(show)|(delete)
`);
```

### Field Based Access


## Live Codesandbox Example