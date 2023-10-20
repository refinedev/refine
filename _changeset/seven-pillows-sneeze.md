---
"@refinedev/core": patch
---

Prevent `authProvider.getIdentity` to be called in `useLog` if `auditLogProvider` is not defined.
