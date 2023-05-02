---
id: command-palette
title: Command Palette
sidebar_label: Command Palette
---


**refine** supports the command palette feature and use the
[**kbar**][kbar]. **kbar** is a fully extensible `cmd` + `k`(MacOS) or `ctrl` + `k`(Linux/Windows) interface for your site.

## Installation

Install the [@refinedev/kbar][refine-kbar] library.

```bash
npm i @refinedev/kbar
```
## Basic Usage

First of all, you need to import the `@refinedev/kbar` library and we will use `RefineKbarProvider` to wrap the whole application.

After that, we should mount the `RefineKbar` component inside the `<Refine>` component.

```tsx tile="src/App.tsx"
import { Refine } from "@refinedev/core";
// highlight-next-line
import { RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <Refine
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            show: "/posts/show/:id",
                            meta: {
                                icon: <Icons.StarOutlined />,
                                canDelete: true,
                            }
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                            meta: {
                                canDelete: true,
                            }
                        },
                    ]}
                >
                    {/* highlight-next-line */}
                    <RefineKbar />
                    <Routes>
                        <Route path="categories">
                            <Route index element={<CategoriesList />} />
                            <Route path="create" element={<CategoriesCreate />} />
                            <Route path="edit/:id" element={<CategoriesEdit />} />
                        </Route>
                        <Route path="posts">
                            <Route index element={<PostList />} />
                            <Route path="create" element={<PostCreate />} />
                            <Route path="edit/:id" element={<PostEdit />} />
                            <Route path="show/:id" element={<PostShow />} />
                        </Route>
                    </Routes>
                </Refine>
            </RefineKbarProvider>
        </BrowserRouter>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/packages/command-palette/kbar/refine-kbar-example.gif" alt="Refine Kbar Example" />
</div>

<br/>

## Access Control

`refine-kbar` respects the access control settings of your App. To learn more about access control, please refer to the [Access Control Provider][access-contol] section of the documentation. Also, we can use the `canDelete` in the `resources` to check the delete accessibility of the command palette.<br />
For more information check out the source code of [`refine-kbar`][refine-kbar] package

## Actions

`refine-kbar` uses your resources to create default actions. Which includes; `list`, `create`, `edit`, `show` and `delete`. It will hide the current action of the page you are in.

## Custom Actions

If we want to add custom actions to the command palette, we can use the `createAction` and `useRegisterActions` of the `refine-kbar`.
check the [`refine-finefoods`][refine-finefoods] example. Also you can find more information about actions in the [`kbar`][kbar-actions] package.

You can use the `createAction` to create a new action and use the `useRegisterActions` to register the action to the command palette.

```tsx title="Custom action example"
import { createAction, useRegisterActions } from "@refinedev/kbar";

const customAction = createAction({
    name: "my custom action",
    section: "custom-actions",
    perform: () => {
        console.log("onSelect my custom action");
    },
    priority: Priority.HIGH,
});

useRegisterActions(customAction);
```

:::tip
`refine-kbar` exports the [`kbar`](https://github.com/timc1/kbar). You can use all [`kbar`](https://github.com/timc1/kbar) features.
:::

## Example

<CodeSandboxExample path="command-palette-kbar" />

[kbar]: https://github.com/timc1/kbar
[kbar-actions]: https://kbar.vercel.app/docs/concepts/actions
[refine-kbar]: https://github.com/refinedev/refine/tree/master/packages/kbar
[access-contol]: https://refine.dev/docs/core/providers/accessControl-provider/
[usecanwithoutcache]: https://github.com/refinedev/refine/blob/master/packages/core/src/hooks/accessControl/useCanWithoutCache.ts
[refine-finefoods]: https://github.com/refinedev/refine/blob/master/examples/finefoods-material-ui/src/hooks/useOrderCustomKbarActions/index.tsx
