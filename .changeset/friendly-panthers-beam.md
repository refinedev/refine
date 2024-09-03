---
"@refinedev/antd": patch
---

fix(antd): rtl support for mobile sider trigger and drawer placement

`<ThemedLayoutV2 />` has RTL support but it lacks the mobile sider trigger and drawer placement. This change places the drawer depending on the preferred direction. It also adds RTL support for the styling of the mobile sider trigger.

[Fixes #6263](https://github.com/refinedev/refine/issues/6263)
