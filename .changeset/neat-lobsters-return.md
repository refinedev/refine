---
"@refinedev/antd": patch
---

fix(antd): use appropriate icons for RTL direction layouts

Previously CRUD components and `<ThemedSiderV2 />` component used hardcoded icons which doesn't fit well for RTL layouts. This PR uses Ant Design's `ConfigProvider` context to use `direction` to determine the appropriate icons for RTL layouts.

**Example**

```tsx
import { ConfigProvider } from 'antd';
import { Refine } from '@refinedev/antd';

const App = () => (
  <ConfigProvider direction="rtl">
    <Refine
        {/* ... */}
    />
  </ConfigProvider>
);
```

When any CRUD component or `<ThemedSiderV2 />` component is rendered, the icons will be rendered with respect to the `direction` prop of `ConfigProvider`.
