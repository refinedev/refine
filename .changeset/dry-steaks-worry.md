---
"@refinedev/mantine": patch
---

fix: prioritization of forgotten `identifier`

If `identifier` is provided, it will be used instead of `name`.

```tsx
import { DeleteButton } from "@refinedev/mantine";

<DeleteButton resource="identifier-value" recordItemId="123" />;
```
