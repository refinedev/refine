---
"@pankod/refine-mantine": major
---

All `Mantine` components re-exported by `refine` are removed. You should import them from `Mantine` directly.

Before:

```tsx
import { useTable, Button } from "@pankod/refine-mantine";
```

After:

```tsx
import { useTable } from "@pankod/refine-mantine";
import { Button } from "@mantine/core";
```
