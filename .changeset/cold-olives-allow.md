---
"@refinedev/mui": patch
---

fix(mui): <DataGrid /> horizontal scroll is broken in <ThemedLayoutV2 />

Due to the changes in CSS rendering in latest Google Chrome updates, `<DataGrid />` components are not properly sized when used inside `<ThemedLayoutV2 />` component. The `overflow: clip` property in the layout content is causing either miscalculations on the data grid width or causing an overflow on the container and overlapping with the sidebar.

This change replaces the `overflow: clip` property with `min-height` and `min-width` properties to ensure the layout content is properly rendered and responsive to the content inside it.

[Resolves #6077](https://github.com/refinedev/refine/issues/6077)
