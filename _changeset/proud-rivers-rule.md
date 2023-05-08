---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

Example:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

const App: React.FC = () => {
    return (
        <Refine
            ...
        >
            <ThemedLayoutV2
                Header={() => <ThemedHeaderV2 sticky />}
            >
                {/* ... */}
            </ThemedLayoutV2>
        </Refine>
    );
};
```
