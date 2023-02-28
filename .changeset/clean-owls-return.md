---
"@pankod/refine-react-hook-form": major
---

All `react-hook-form` components re-exported by `refine` are removed. You should import them from `react-hook-form` directly.

Before:

```tsx
import { useForm, Controller } from "@pankod/refine-react-hook-form";
```

After:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";
import { Controller } from "react-hook-form";
```
