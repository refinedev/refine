---
"@refinedev/antd": patch
---

feat: added the `fixed` prop to the `<ThemedSiderV2/>` to allow the sider to be fixed

The props is optional and defaults to `false`. You can see the usage as follows:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

const App: React.FC = () => {
    return (
        <Refine
         ...
        >
            <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed />}>
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```
