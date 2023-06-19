---
"@refinedev/react-hook-form": patch
---

fix: prioritization of forgotten `identifier`

If `identifier` is provided, it will be used instead of `name`.

```tsx
import { useModalForm } from "@refinedev/react-hook-form";

useModalForm({
    refineCoreProps: {
        resource: "identifier-value",
    },
});
```
