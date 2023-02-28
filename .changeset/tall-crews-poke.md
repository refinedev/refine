---
"@pankod/refine-core": minor
---

added: `optionLabel` and `optionValue` type changed for better type inference

```diff
- optionLabel?: string;
- optionValue?: string;
+ optionLabel?: keyof TData extends string ? keyof TData : never;
+ optionValue?: keyof TData extends string ? keyof TData : never;
```
