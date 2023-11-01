---
"@refinedev/core": patch
---

Exported `BaseOption` type as successor of the deprecated `Option` type. `BaseOption` is `{ label: any; value: any; }`.

Usage of the deprecated `Option` type was correctly assuming that the `value` property of the option is of type `string`. This assumption was wrong and now the types are changed to reflect the correct values of options with the ability to change it via 4th generic type `TOption` of `useSelect` hook.
