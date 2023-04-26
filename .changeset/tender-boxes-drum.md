---
"@refinedev/mui": minor
---

feat: add `isSticky` prop to `ThemedHeaderV2` component. Default is `true`.

```tsx
import { ThemedLayoutV2, ThemedHeaderV2 } from '@refinedev/mui';

const CustomHeader = () => (
  <ThemedHeaderV2 isSticky={false} />
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