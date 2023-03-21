---
"@refinedev/antd": minor
---

-   `RefineThemes` added. It contains predefined colors for the antd components.

```tsx
import { Refine } from "@refinedev/core";
import { RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";

const App = () => {
    // ---

    return (
        <ConfigProvider
            theme={{
                token: RefineThemes.Magenta.token,
            }}
        >
            <Refine dataProvider={dataProvider("YOUR_API_URL")}>
                {/** your app here */}
            </Refine>
        </ConfigProvider>
    );
};
```

-   default title with icon added to `AuthPage`. It uses `ThemedTitle` component from `@refinedev/antd`. You can remove it by setting `title` prop to `false`.

```tsx
<AuthPage title={false} />
```

-   `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

```tsx
<AuthPage
    renderContent={(content: React.ReactNode, title: React.ReactNode) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {title}
                <h1 style={{ color: "white" }}>Extra Header</h1>
                {content}
                <h1 style={{ color: "white" }}>Extra Footer</h1>
            </div>
        );
    }}
/>
```

-   `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

-   `<EditButton>` in `<Show>` type changed to `primary`.
-   `<CreateButton>` type changed to `primary`.

-   `<AuthPage>` component uses colors from the theme.
-   `<ThemedTitle>` added to `AuthPage`
