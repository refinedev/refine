---
"@refinedev/mantine": patch
"@refinedev/antd": patch
"@refinedev/core": patch
"@refinedev/kbar": patch
"@refinedev/cli": patch
---

fix(types): remove path aliases from type imports

Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

This change removes the path aliases from the type imports and replaces them with relative imports.
