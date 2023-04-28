---
id: layout-menu-breadcrumb
title: 7. Layout, Menu and Breadcrumb
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/adding-sort-and-filters
    next: tutorial/understanding-authprovider/index
---

import SharedComponents from "../../../partials/tutorial/headless-layout.md";

<SharedComponents />

In [Unit 2.4](/docs/tutorial/getting-started/headless/generate-crud-pages/), we created the CRUD pages automatically with Inferencer and wrapped them with a `<Layout>` component.

This component is provided when you create a new application using `create-refine-app` to help you get started quickly by providing simple implementations of `Menu` and `Breadcrumb` components using **refine**'s hooks, [`useMenu`](/docs/api-reference/core/hooks/ui/useMenu) and [`useBreadcrumb`](/docs/api-reference/core/hooks/useBreadcrumb).

Here is the preview for the `Layout`, `Menu` and `Breadcrumb` components:

```tsx live previewOnly previewHeight=600px url=http://localhost:3000
setInitialRoutes(["/"]);

import { Refine } from "@refinedev/core";
import { HeadlessInferencer } from "@refinedev/inferencer/headless";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "blog_posts",
                        list: "/blog-posts",
                        show: "/blog-posts/show/:id",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={
                                <NavigateToResource resource="blog_posts" />
                            }
                        />

                        <Route path="/blog-posts">
                            <Route index element={<HeadlessInferencer />} />
                            <Route
                                path="show/:id"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="edit/:id"
                                element={<HeadlessInferencer />}
                            />
                            <Route
                                path="create"
                                element={<HeadlessInferencer />}
                            />
                        </Route>

                        <Route path="*" element={<div>Error!</div>} />
                    </Route>
                </Routes>

                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

render(<App />);
```

## Layout

When you create a new application with the **refine**, it creates a default layout under the `src/components/layout.tsx` file and it looks like below:

```tsx title="src/components/layout.tsx"
import { PropsWithChildren } from "react";

import { Menu } from "../menu";
import { Breadcrumb } from "../breadcrumb";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="layout">
            <Menu />
            <div className="content">
                <Breadcrumb />
                <div>{children}</div>
            </div>
        </div>
    );
};
```

It has a `Menu` and a `Breadcrumb` component and it renders the children. You can completely customize this component to your needs.

## Menu

The `Menu` component is located in the `src/components/menu.tsx` file and it looks like below:

```tsx title="src/components/menu.tsx"
import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";

export const Menu = () => {
    const { menuItems } = useMenu();

    return (
        <nav className="menu">
            <ul>
                {menuItems.map((item) => (
                    <li key={item.key}>
                        <NavLink to={item.route}>{item.label}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
```

It uses the `useMenu` hook to get the menu items and renders them as a list. Also, it uses the `NavLink` component from the `react-router-dom` package to render the links.

> For more information, refer to the [`useMenu` documentation &#8594](/docs/api-reference/core/hooks/ui/useMenu)

## Breadcrumb

The `Breadcrumb` component is located in the `src/components/breadcrumb.tsx` file and it looks like below:

```tsx title="src/components/breadcrumb.tsx"
import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
    const { breadcrumbs } = useBreadcrumb();

    return (
        <ul className="breadcrumb">
            {breadcrumbs.map((breadcrumb) => (
                <li key={`breadcrumb-${breadcrumb.label}`}>
                    {breadcrumb.href ? (
                        <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                    ) : (
                        <span>{breadcrumb.label}</span>
                    )}
                </li>
            ))}
        </ul>
    );
};
```

It uses the `useBreadcrumb` hook to get the breadcrumb items and renders them as a list. Also, it uses the `Link` component from the `react-router-dom` package to render the links.

> For more information, refer to the [`useBreadcrumb` documentation &#8594](/docs/api-reference/core/hooks/useBreadcrumb)

<br/>

<Checklist>

<ChecklistItem id="layout-menu-breadcrumb">
I have learned about the Layout, Menu and Breadcrumb components.
</ChecklistItem>

<ChecklistItem id="layout-menu-breadcrumb">
I understood the usage of `useMenu` and `useBreadcrumb` hooks.
</ChecklistItem>

</Checklist>
