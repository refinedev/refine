---
"@pankod/refine-antd": major
---

All `Ant Design` components re-exported by `refine` are removed. You should import them from `antd` directly.

Before:

```tsx
import { useTable, Button } from "@pankod/refine-antd";
```

After:

```tsx
import { useTable } from "@pankod/refine-antd";
import { Button } from "antd";
```
