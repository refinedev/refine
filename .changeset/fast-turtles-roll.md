---
"@pankod/refine-inferencer": patch
---

Added `undefined` check for date field values in `@pankod/refine-inferencer/antd`'s `EditInferencer` component to prevent setting it to current date when it's not provided.