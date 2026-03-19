---
"@refinedev/mui": patch
---

fix(mui): respect custom `startIcon` when `hideText` is true on all button components

When `hideText={true}` is used with a custom `startIcon`, all MUI button components (`ShowButton`, `EditButton`, `DeleteButton`, `CloneButton`, `CreateButton`, `ListButton`, `RefreshButton`, `SaveButton`, `ExportButton`, `ImportButton`) ignored the custom icon and always showed the default one. This also caused two icons to appear at the same time.

Now the custom `startIcon` is used when provided, and the default icon is only used as a fallback.

Resolves #7343
