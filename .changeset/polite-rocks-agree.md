---
"@refinedev/mui": patch
---

fix: prioritization of forgotten `identifier`

If `identifier` is provided, it will be used instead of `name`.

```tsx
import { DeleteButton } from "@refinedev/mui";

<DeleteButton resource="identifier-value" recordItemId="123" />;
```

fix: use translate keys with `identifier`

Previously, the translate keys were generated using resource `name`. This caused issues when you had multiple `resource` usage with the same name. Now the `translate` keys are generated using `identifier` if it's present.
