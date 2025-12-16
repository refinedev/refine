---
"@refinedev/antd": patch
---

fix(antd): replace Card variant prop with bordered for compatibility

Replaced deprecated `variant="borderless"` with `bordered={false}` in Create, Edit, and Show components to maintain compatibility with Ant Design 5.21+ where the variant prop is deprecated.

**Changes:**
- Updated Create component Card to use `bordered={false}`
- Updated Edit component Card to use `bordered={false}`
- Updated Show component Card to use `bordered={false}`

**Impact:**
- Removes deprecation warnings in Ant Design 5.21+
- Maintains visual consistency (borderless appearance)
- Fully backward compatible with older Ant Design versions

Resolves #7138
