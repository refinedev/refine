---
"@refinedev/core": minor
---

feat: ability to pass an argument to usePermissions #5607

Ability to pass an argument or parameters to usePermissions hook

```tsx
const params = { tenantId: "id" };
usePermissions({ params });
```

Resolves #5607
