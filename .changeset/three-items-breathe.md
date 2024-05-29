---
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/antd": minor
"@refinedev/mui": minor
---

feat: use global values by default for app title and app icon

Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. For `<ThemedLayoutV2 />` and `<AuthPage />` components, these values will be used by default. While users can use `options.title` to pass global values for app icon and app name, option to override through `<ThemedTitleV2 />` component is still available for users to override these values in specific use cases.

```tsx
import { Refine } from "@refinedev/core";

const MyIcon = () => <svg>{/* ... */}</svg>;

const App = () => {
  return (
    <Refine
      options={{
        title: {
          icon: <MyIcon />,
          text: "Refine App",
        },
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

Then, `<ThemedLayoutV2 />` and `<AuthPage />` components will display `<MyIcon />` and `"Refine App"` as app icon and app name respectively.
