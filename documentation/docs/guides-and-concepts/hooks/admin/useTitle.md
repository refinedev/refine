---
id: useTitle
title: useTitle
---

`useTitle` returns a component that calls the `<Title>` passed to the `<Admin>`. In this way, it becomes easier for us to access this component in various parts of the application.

## Usage

Normally refine provides a default title. If we want to build a custom title instead of default one that comes with refine, we overwrite it like this:

```tsx title="src/App.tsx"
import { Admin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
            //highlight-start
            Title={({ collapsed }) => (
                <div>
                    {collapsed && <img src="./logo" alt="Logo" />}
                    <span>Custom Title</span>
                </div>
            )}
            //highlight-end
        />
    );
};
```

:::info
This `<Title>` we created is used in the `<Sider>` that refine provides by default.
:::
<br/>

Now `useTitle` will provides us to access `<Title>` component from various parts of the application, like this:

```tsx title="src/components/customSider"
//highlight-next-line
import { AntdLayout, useTitle } from "@pankod/refine";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    //highlight-next-line
    const Title = useTitle();

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
        >
            //highlight-next-line
            <Title collapsed={collapsed} />
            ...
        </AntdLayout.Sider>
    );
};
```
