---
"@refinedev/core": minor
---

Updated `useSelect` hook to support `optionLabel` and `optionValue` type as `keyof TData` instead of `string`.

So `optionLabel` and `optionValue` have an interface based on the given `TData` type.

```diff
- optionLabel?: string;
- optionValue?: string;
+ optionLabel?: keyof TData extends string ? keyof TData : never;
+ optionValue?: keyof TData extends string ? keyof TData : never;
```
