---
"@pankod/refine-core": minor
---

Updated the generation of type declarations, moved the declarations from `tsup` to `tsc` for a better experience with `Peek Definition` and `Go to Definition` features. After this change, it's expected to navigate to the source code of the `refine` packages instead of the `dist` directory with combined declarations.
