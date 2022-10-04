---
"@pankod/refine-antd": minor
---

Deprecated `LoginPage`.


**Before**

```tsx
import { LoginPage } from "@pankod/refine-antd";

<Refine
  LoginPage={LoginPage}
  ...
/>
```

**After**

```tsx
import { AuthPage } from "@pankod/refine-antd";

<Refine
  LoginPage={AuthPage}
  ...
/>
```

