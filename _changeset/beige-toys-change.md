---
"@refinedev/antd": minor
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/mui": minor
"@refinedev/ui-types": minor
---

feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

```tsx
<ThemedLayoutV2
    initialSiderCollapsed={true} // This will make the sider collapsed by default
>
    {/* .. */}
</ThemedLayoutV2>
```
