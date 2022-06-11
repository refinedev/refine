---
"@pankod/refine-mui": minor
---

Added default `sx` property for Material UI buttons.

```tsx
const { sx, ...restProps } = rest;

<Button sx={{ minWidth: 0, ...sx }} {...restProps} />;
```
