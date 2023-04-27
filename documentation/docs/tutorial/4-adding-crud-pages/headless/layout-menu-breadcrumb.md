---
id: layout-menu-breadcrumb
title: 7. Layout, Menu and Breadcrumb
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/adding-sort-and-filters
    next: tutorial/understanding-authprovider/index
---

## Layout

When you create a new application with the **refine**, it creates a default layout under the `src/components/layout.tsx` file and it looks like this:

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

The `Menu` component is located in the `src/components/menu.tsx` file and it looks like this:

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

<br />

<Checklist>

<ChecklistItem id="layout-menu-breadcrumb">
I have learned about the Layout, Menu and Breadcrumb components.
</ChecklistItem>

</Checklist>
