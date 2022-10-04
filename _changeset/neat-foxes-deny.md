---
"@pankod/refine-mui": minor
---

- Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

- Deprecated `LoginPage`.

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
  LoginPage={AuthPage}
  ...
/>
```
