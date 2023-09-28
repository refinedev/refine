---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

feat: deprecated `<ThemedLayout />` and `<Layout />` components removed from `swizzle`.
From now on, users can swizzle `<ThemedLayoutV2 />` component instead.

feat: swizzled `<ThemedLayoutV2 />` component destination changed to `src/components/layout/` from `src/components/themedLayout`.
