---
"@pankod/refine-antd": minor
---

Remove `getContainer: false` from `useModalForm` and `useDrawerForm` and let it fallback to the default value. Users wanting to override the default value can still do so by passing `getContainer` prop to the `Modal` and `Drawer` components.
