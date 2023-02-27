---
"@pankod/refine-chakra-ui": major
---

All `Chakra-UI` components re-exported by `refine` are removed. You should import them from `Chakra-UI` directly.

Before:

```tsx
import { Box, NumberField, Stack, Typography } from "@pankod/refine-chakra-ui";
```

After:

```tsx
import { NumberField } from "@pankod/refine-chakra-ui";
import { Box, Stack, Typography } from "@chakra-ui/react";
```
