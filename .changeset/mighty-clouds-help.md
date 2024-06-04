---
"@refinedev/core": minor
---

feat(core): ability to pass global app title and icon

Added ability to pass global app name and icon values through `<Refine />` component's `options` prop.

Now `<Refine />` component accepts `options.title` prop that can be used to set app icon and app name globally. By default these values will be accessible through `useRefineOptions` hook and will be used in `<ThemedLayoutV2 />` and `<AuthPage />` components of the UI packages.

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
