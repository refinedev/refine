---
id: multi-level-menu
title: Multi Level Menu
sidebar_label: Multi Level Menu
---

### What is Multi-level Menu?

This document is related to how to create a multi-level menu for **refine** applications. The resources in your menu that you want to create for **refine** application may not be of equal importance. Multi-level menu will provide you with the necessary infrastructure to create your resources with the priority you want.

Let's take a closer look at its usage.

## Usage

:::caution

The usage we will look closer has been prepared with ant-design. You can do yourself with also headless. if you decided to create a multi-level menu with headless, you can use the [`useResource`](/core/hooks/resource/useResource.md) hook to get the properties of a resource defined as an element of the `resources`.
:::

To do this, it is necessary to create an object array with the following [resources roperties](/core/interfaces.md#resourceitemprops):

```tsx title="src/App.tsx"
        <Refine
           ...
           // highlight-start
            resources={[
                {
                    name: "cms",
                },
                {
                    name: "posts",
                    parentName: "cms",
                },
                {
                    name: "category",
                    parentName: "cms",
                },
            ]}
            // highlight-end
        />
```

### Access Menu Items

You can access menu items that you want to render in your Sider component when using ant-design [`useMenu`](/ui-frameworks/antd/hooks/resource/useMenu.md) can help.

```tsx title="src/components/layout/sider/index.tsx"
import { useMenu } from "@hooks";

export const Sider: React.FC = () => {
    //highlight-next-line
    const { menuItems, selectedKey } = useMenu();
};
```

### Tree Creation Compatible with Multi-level Menu

Creating a multi-level menu compatible tree is not as difficult or time consuming. The only thing you will want to do when creating your trees with levels of submenus is using `createTreeView` helper from refine core, like this:

```tsx title="src/components/layout/sider/index.tsx"
    //highlight-next-line
import { createTreeView } from "@pankod/refine-core";

export const Sider: React.FC = () => {
    //highlight-next-line
    const treeMenu: ITreeMenu[] = createTreeView(menuItems);
};
        
```

```tsx title="example tree menu output
[
    {
        name: "cms",
        children: [
            {
                name: "posts",
            },
            {
                name: "category",
            },
        ],
    },
];
```

:::tip
If you want to create your multi-level menu without ant-design, you can use the `createTreeView` helper from refine core with resources that you can access from [`useResource`](/core/hooks/resource/useResource.md) hook.
:::

You can review the example from the link to examine the multi-level menu concept in more detail.
