---
id: command-palette
title: Command Palette
---

import example from '@site/static/img/packages/command-palette/kbar/refine-kbar-example.gif';

**refine** supports the command palette feature and use the
[**kbar**][kbar]. **kbar** is a fully extensible `cmd` + `k`(MacOS) or `ctrl` + `k`(Linux/Windows) interface for your site.

## Installation

Install the [@pankod/refine-kbar][refine-kbar] library.

```bash
npm i @pankod/refine-kbar
```

:::info
If your are going to use the [`superplate`][superplate-url] to create new project, you can select the `kbar` as a command palette.

:::

## Basic Usage

First of all, you need to import the `@pankod/refine-kbar` library and we will use `RefineKbarProvider` to wrap the whole application.

After that, we should create the `<OffLayoutArea/>` component for the Refine component and use the `refine-kbar` command palette in `<OffLayoutArea>`. We have the `<RefineKbar>` component to provide the command palette to the `<Refine>` component.

```tsx tile="src/App.tsx"
import { Refine } from "@pankod/refine-core";
// highlight-next-line
import { RefineKbarProvider } from "@pankod/refine-kbar";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

// highlight-start
export const OffLayoutArea: React.FC = () => {
    return <RefineKbar />;
};
// highlight-end

const App: React.FC = () => {
    return (
        <RefineKbarProvider>
            <Refine
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        icon: <Icons.StarOutlined />,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: CategoriesList,
                        create: CategoriesCreate,
                        edit: CategoriesEdit,
                        canDelete: true,
                    },
                ]}
                //highlight-next-line
                OffLayoutArea={OffLayoutArea}
            />
        </RefineKbarProvider>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={example} alt="Refine Kbar Example" />
</div>

<br/>

:::note
_Why do we need to add `<OffLayoutArea>` to the `<Refine>` component?_<br/>
Because we need to reach the `resources` property of the `<Refine>` component.
:::

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
import { createAction, useRegisterActions } from "@pankod/refine-kbar";

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
`refine-kbar` export the `kbar`. You can use all `kbar` features.
:::

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/commandPalette/kbar?embed=1&view=preview&theme=dark&preset=node"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-kbar-example"
></iframe>

[kbar]: https://github.com/timc1/kbar
[kbar-actions]: https://kbar.vercel.app/docs/concepts/actions
[refine-kbar]: https://github.com/pankod/refine/tree/master/packages/kbar
[access-contol]: https://refine.dev/docs/core/providers/accessControl-provider/
[usecanwithoutcache]: https://github.com/pankod/refine/blob/master/packages/core/src/hooks/accessControl/useCanWithoutCache.ts
[refine-finefoods]: https://github.com/pankod/refine/blob/master/examples/fineFoods/admin/mui/src/hooks/useOrderCustomKbarActions/index.tsx
[superplate-url]: https://github.com/pankod/superplate
