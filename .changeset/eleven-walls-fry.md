---
"@refinedev/mantine": minor
---

refactor: fix name and state inconsistency in `<ThemedLayoutV2>`

`useSiderVisible` is deprecated, instead we created a new hook `useThemedLayoutContext` for it. `useThemedLayoutContext` similar to `useSiderVisible` but it returns more meaningful state names. However, `useSiderVisible` is still available for backward compatibility.

Updated `Sider` and `HamburgerMenu` components using `useThemedLayoutContext`.

```tsx
import { useThemedLayoutContext } from '@refinedev/mantine';

const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
} = useThemedLayoutContext();
```
