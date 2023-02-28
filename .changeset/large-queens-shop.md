---
"@pankod/refine-core": major
---

exports items for `@pankod/refine-core`

All `@tanstack/react-query` components re-exported by `refine` are removed. You should import them from `@tanstack/react-query` directly.

Before:

```tsx
import { QueryClient, Refine } from "@pankod/refine-core";
```

After:

```tsx
import { Refine } from "@pankod/refine-core";
import { QueryClient } from "@tanstack/react-query";
```
