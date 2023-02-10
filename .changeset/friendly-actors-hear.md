---
"@pankod/refine-core": minor
---

added: A helper function for picking a not undefined first value from an array.

```ts
const sorter = undefined;
const sorters = [{ id: 1 }];

const value = pickNotDeprecated(sorter, sorters) ?? 10; // [{ id: 1 }]
```
