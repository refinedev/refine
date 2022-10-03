---
"@pankod/refine-mui": minor
---

Deprecated `LoginPage`.

**Before**

```tsx
import { LoginPage } from "@pankod/refine-mui";

<Refine
  LoginPage={LoginPage}
  ...
/>
```

**After**

```tsx
import { AuthPage } from "@pankod/refine-mui";

<Refine
  LoginPage={<AuthPage />}
  ...
/>
```
