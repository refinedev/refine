---
"@refinedev/core": patch
---

fix(core): fixed type issue in useSelect. #6223

Previously, the types would not allow functions to be passed as props. After this change, it will be possible.

[Resolves #6223](https://github.com/refinedev/refine/issues/6223)
