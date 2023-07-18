---
"@refinedev/core": minor
---

feat: added `disableServerSideValidation` to the refine options for globally disabling server-side validation.

```tsx
import { Refine } from "@refinedev/core";

<Refine
    options={{
        disableServerSideValidation: true,
    }}
>
    // ...
</Refine>;
```
