---
"@refinedev/chakra-ui": minor
---

feat: add `isSticky` prop to `ThemedHeaderV2` component

```tsx
import { ThemedLayoutV2, ThemedHeaderV2 } from '@refinedev/chakra-ui';

const CustomHeader = () => (
  <ThemedHeaderV2 isSticky={true} />
);


const App = () => (
    <Refine>
        // ...
        <ThemedLayoutV2 Header={CustomHeader}>
            <Outlet />
        </ThemedLayoutV2>
        // ...
    </Refine>
);
```
