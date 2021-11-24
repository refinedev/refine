---
id: access-control
title: Access Control
sidebar_label: Access Control
---

## Introduction

Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different solutions(RBAC, ABAC, ACL, [casbin](https://casbin.org/), [casl](https://casl.js.org/v5/en/), [cerbos](https://cerbos.dev/), [accesscontrol.js](https://onury.io/accesscontrol/)). `can` method would be the entry point for those solutions.

[Refer to the Access Control Provider documentation for detailed information. &#8594](api-references/providers/accessControl-provider.md)

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

We will be using **casbin** in this guide for users with different roles who have different access rights for parts of the app.

## Installation

We need to install casbin.

```bash
npm install casbin --save
```

## Setup

The app will have two resources: **posts** and **categories** with crud pages(list, create, edit and show)

[You can refer to codesandbox to how they are implemented](#live-codesandbox-example)

`App.tsx` will look like this before we begin implementing access control:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
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

The way **casbin** works is that access rights are checked according to policies that are defined based on a model. [You can find further information about how models and policies work here](https://casbin.org/docs/en/how-it-works).

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

implement simple version of `can`

screenshot -> emphasize disabled buttons. menu has only posts item.

admin can access posts list but not create, edit, delete. buttons will be disabled.

## Handling access with params

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

## Adding Different Roles

explanation for different roles can have different access rights for different resources and actions.

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, posts, (list)|(create)
p, editor, posts/*, (edit)|(show)|(delete)

p, editor, categories, list

`);
```

Demonstration with dynamic role change
- add header with role selection
- update `can` for dynamic role parameter

gif?

## Live Codesandbox Example