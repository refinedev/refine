---
"@refinedev/antd": minor
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/mui": minor
"@refinedev/ui-types": minor
---

feat: `isSiderCollapsedByDefault` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `isSiderCollapsedByDefault` prop to `<ThemedLayoutV2>`.

```tsx
<ThemedLayoutV2
    isSiderCollapsedByDefault={true} // This will make the sider collapsed by default
>
    {/* .. */}
</ThemedLayoutV2>
```
