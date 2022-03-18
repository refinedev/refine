---
id: multi-level-menu
title: Multi Level Menu
sidebar_label: Multi Level Menu
---

### What is Multi-level Menu?

This document is related to how to create a multi-level menu for **refine** applications. The resources in your menu that you want to create for **refine** application may not be of equal importance. Multi-level menu will provide you with the necessary infrastructure to create your resources with the priority.

Let's take a closer look at its usage.

## Usage

:::caution

The usage we will look closer has been prepared with ant-design. You can do yourself with also headless. If you decided to create a multi-level menu with headless, you can use the [`useResource`](/core/hooks/resource/useResource.md) hook to get the properties of a resource defined as an element of the `resources`.
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

Creating a multi-level menu compatible tree is not as difficult or time consuming. The only thing you will want to do when creating your trees with levels of submenus is using `createTreeView` helper from refine core.

```tsx title="src/components/layout/sider/index.tsx"
    //highlight-next-line
import { createTreeView } from "@pankod/refine-core";

export const Sider: React.FC = () => {
    //highlight-next-line
    const treeMenu: ITreeMenu[] = createTreeView(menuItems);
};
        
```

```tsx title="example output"
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

## Live Codesandbox Example

You can review the example to examine the multi-level menu concept in more detail.

[View Source](https://github.com/pankod/refine/tree/master/examples/multi-level-menu)

<iframe src="https://codesandbox.io/embed/refine-multi-level-menu-example-ur4kq0?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-multi-level-menu-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>