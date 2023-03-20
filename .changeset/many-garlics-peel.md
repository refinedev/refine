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

-   `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

-   `<EditButton>` in `<Show>` type changed to `primary`.
-   `<CreateButton>` type changed to `primary`.

-   `<AuthPage>` component uses colors from the theme.
-   `<AuthPageTitle>` added to `AuthPage`
