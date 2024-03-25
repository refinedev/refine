---
"@refinedev/inferencer": patch
---

Removed redundant usage of `IResourceComponentsProps` type in generated components. This type only works with legacy routers and `<RefineRoutes />` component, its usage outside of these scopes are unnecessary.
