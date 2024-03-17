---
"@refinedev/react-router-v6": patch
---

Fixed the wrong type declaration for legacy router subexport at `/legacy`. Previously imports from `@refinedev/react-router-v6/legacy` used type declarations from new router, which caused type errors. Now it's fixed and the correct type declarations are used.
