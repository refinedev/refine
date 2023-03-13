---
"@refinedev/core": major
---

Added a helper function to pick not deprecated value. Gives priority according to the order of the arguments.

```ts
const sorter = undefined;
const sorters = [{ id: 1 }];

const value = pickNotDeprecated(sorter, sorters) ?? 10; // [{ id: 1 }]
```
