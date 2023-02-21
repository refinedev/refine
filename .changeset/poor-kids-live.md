---
"@pankod/refine-mui": patch
---

All `MUI` components re-exported by `refine` are removed. You should import them from `MUI` directly.

Before:

```tsx
import { Box, NumberField, Stack, Typography } from "@pankod/refine-mui";
```

After:

```tsx
import { NumberField } from "@pankod/refine-mui";
import { Box, Stack, Typography } from "@mui/material";
```

## Breaking Changes

### Theme

```ts
declare module "@pankod/refine-mui" {
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    interface ThemeOptions
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
```

to

```ts
declare module "@mui/material/styles" {
    interface Theme extends import("@pankod/refine-mui").Theme, CustomTheme {}
    interface ThemeOptions
        extends import("@pankod/refine-mui").ThemeOptions,
            CustomTheme {}
}
```
