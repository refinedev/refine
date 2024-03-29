---
"@refinedev/cli": patch
---

Removed redundant usage of `IResourceComponentsProps` type in component templates of `add resource` command. This type only works with legacy routers and `<RefineRoutes />` component, its usage outside of these scopes are unnecessary.
