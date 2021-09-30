---
id: useTitle
title: useTitle
---

`useTitle` returns a component that calls the `<Title>` passed to the `<Refine>`. In this way, it becomes easier for us to access this component in various parts of the application.

## Usage

Normally refine provides a default title. If we want to build a custom title instead of default one that comes with **refine**, we need to overwrite it like this:

```tsx twoslash title="src/App.tsx" {9-14}
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine/dist/styles.min.css";

export const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            Title={({ collapsed }) => (
                <div>
                    {collapsed && <img src="./logo" alt="Logo" />}
                    <span>Custom Title</span>
                </div>
            )}
        />
    );
};
```

:::info
This `<Title>` we created is used in the `<Sider>` that refine provides by default.
:::
<br/>

Now `useTitle` will provides us to access to the `<Title>` component from various parts of the application, like this:

```tsx twoslash title="src/components/customSider" {0,4,13}
import { AntdLayout, useTitle } from "@pankod/refine";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const Title = useTitle();

    return (
        <AntdLayout.Sider
            collapsible
            breakpoint="md"
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            <Title collapsed={collapsed} />
            ...
        </AntdLayout.Sider>
    );
};
```
