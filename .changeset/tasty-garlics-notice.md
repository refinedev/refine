---
"@refinedev/appwrite": minor
---

fixing an issue which didn't allow users to override the default `readPermissions` / `writePermissions` values `Role.any()`, by passing `defaultReadPermissions` / `defaultWritePermissions` OR by passing `meta?.readPermissions` / `meta?.writePermissions`.
