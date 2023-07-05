---
"@refinedev/mantine": patch
---

fixed: `description` prop does not show up in Mantine notification.
With this fix, you can now use `description` prop to show a description in the notification.

```tsx
import { useNotification } from "@refinedev/core";

const { open } = useNotification();

open?.({
    description: "This is a description",
    message: "This is a message",
    type: "progress",
});
```
