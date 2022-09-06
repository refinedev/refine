---
id: useMenu
title: useMenu
---

`useMenu` is used to get menu items derived from the resources. These items include a link to dashboard page (if it exists) and links to the user defined resources (passed as children to `<Refine>`).
This hook can also be used to build custom menus, including multi-level support. `<Sider/>` components inside [`@pankod/refine-antd`](/docs/ui-frameworks/antd/tutorial/) and [`@pankod/refine-mui`](/docs/ui-frameworks/mui/tutorial/) packages are using this hook as a base for their menus.

```ts
const { selectedKey, menuItems, defaultOpenKeys } = useMenu();
```

-   `menuItems` is a list of style agnostic menu items. Each of them has a key.
-   `selectedKey` is the key of the resource user is viewing at the moment. Its inferred from the route.
-   `defaultOpenKeys` is the array with the keys of default opened menus.

<br />

:::caution

`useMenu` hooks exported from `@pankod/refine-antd` and `@pankod/refine-mui` packages are now **deprecated** and will be removed. Please use `useMenu` from `@pankod/refine-core`.
:::

## Usage

:::tip

If you are using [`@pankod/refine-antd`](/docs/ui-frameworks/antd/tutorial/) or [`@pankod/refine-mui`](/docs/ui-frameworks/mui/tutorial/) as a UI framework integration, you can find out more info about how their `<Sider/>` components are created and how to create a custom one by following their guides.

[Ant Design > Customization > Custom Sider &#8594](/docs/ui-frameworks/antd/customization/antd-custom-sider/)

[Material UI > Customization > Custom Sider &#8594](/docs/ui-frameworks/mui/customization/mui-custom-sider/)

:::

### Creating a Menu

We will show you how to use `useMenu` to create a simple menu for your refine application.

Create a `<Layout />` component inside `src/components/layout.tsx` with the following code;

```tsx title="src/components/layout.tsx"
import { LayoutProps } from "@pankod/refine-core";
import { useMenu, useNavigation, useRouterContext, useRefineContext } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems, selectedKey } = useMenu();
    const { hasDashboard } = useRefineContext();
    const { Link } = useRouterContext();
    // You can also use navigation helpers from `useNavigation` hook instead of `Link` from your Router Provider.
    // const { push } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                        </Link>
                        // highlight-start
                        <ul>
                            {hasDashboard && (
                                <li>
                                    <Link to="/">
                                        <a style={{ fontWeight: selectedKey === "/" ? "bold" : "normal" }}>
                                            <span>Dashboard</span>
                                        </a>
                                    </Link>
                                </li>
                            )}
                            {menuItems.map(({ name, label icon, route }) => {
                                const isSelected = route === selectedKey;
                                return (
                                    <li key={name}>
                                        <Link to={route}>
                                            <a style={{ fontWeight: isSelected ? "bold" : "normal" }}>
                                                {icon}
                                                <span>{label ?? name}</span>
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        // highlight-end
                    </div>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};
```

We created a header with a logo and a list of links to all menu items (resources). The links are clickable and will navigate to the corresponding resource. To do this, we used the [`useMenu`](/core/hooks/ui/useMenu.md) hook to get the menu items from the `<Refine/>` and the `useRouterContext` hook to get the `<Link/>` component from the router provider. Also [`useNavigation`](/core/hooks/navigation/useNavigation.md) hook can be used to navigate between routes.

`children` is the content of the layout. In our case, it is the content of the **Page** components.

:::tip

[Refer to Custom Layout guide for more detailed information on layout customization. &#8594](/guides-and-concepts/custom-layout.md)  
:::

Now, we can use the `<Layout/>` in our application.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/post";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/category";
// highlight-next-line
import { Layout } from "components/layout";
import { PostIcon } from "icons";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
            // highlight-next-line
            Layout={Layout}
        />
    );
};
```

### Multi Level Menus

`useMenu` hook comes out of the box with multi level menu support, you can render menu items recursively to get a multi level menu.

Update your `resources` in `<Refine/>` with `parentName` to nest them inside a label.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/post";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/category";

import { Layout } from "components/layout";
import { PostIcon } from "icons";

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            // highlight-start
            resources={[
                {
                    name: "CMS",
                },
                {
                    name: "posts",
                    parentName: "CMS",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
                {
                    name: "categories",
                    parentName: "CMS",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
            // highlight-end
            Layout={Layout}
        />
    );
};
```

Now you can update your `<Layout/>` to support multi level rendering with following code:

```tsx title="src/components/Layout.tsx"
import { LayoutProps } from "@pankod/refine-core";
import { useMenu, useNavigation, useRouterContext } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems, selectedKey } = useMenu();
    const { Link } = useRouterContext();

    // highlight-start
    const renderMenu = (items) => {
        return (
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <span>{item.label}</span>
                        {item.children ? renderMenu(item.children) : null}
                    </li>
                ))}
            </ul>
        );
    };
    // highlight-end

    return (
        <div className="flex min-h-screen flex-col">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                        </Link>
                        // highlight-start
                        {renderMenu(menuItems)}
                        // highlight-end
                    </div>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};
```

## API Reference

### Return values

| Property        | Description                                                                             | Type                         |
| --------------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| selectedKey     | Key of the resource the user is viewing at the moment                                   | `string`                     |
| menuItems       | List of keys and routes and some metadata of resources and also the dashboard if exists | [`ITreeMenu[]`](#interfaces) |
| defaultOpenKeys | Array with the keys of default opened menus.                                            | `string[]`                   |

#### Interfaces

```ts
interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    parentName?: string;
    options?: OptionsProps;
}

interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps>;
    create?: React.FunctionComponent<IResourceComponentsProps>;
    edit?: React.FunctionComponent<IResourceComponentsProps>;
    show?: React.FunctionComponent<IResourceComponentsProps>;
}

interface IResourceComponentsProps<TCrudData = any> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
}

type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
    label?: string;
    route?: string;
    auditLog?: {
        permissions?: AuditLogPermissions[number][] | string[];
    };
    hide?: boolean;
    [key: string]: any;
};

// highlight-start
type IMenuItem = IResourceItem & {
    key: string;
};

type ITreeMenu = IMenuItem & {
    children: ITreeMenu[];
};
// highlight-end
```

### Source Code

[View source code for `useMenu` on GitHub &#8594](https://github.com/pankod/refine/blob/feat/use-menu-core/packages/core/src/hooks/menu/useMenu.tsx#L26)
