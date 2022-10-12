---
"@pankod/refine-core": minor
---

Marked `getMany`, `createMany`, `updateMany` and `deleteMany` functions as optional and substituted with `getOne`, `create`, `update` and `deleteOne` respectively. Now users can choose to skip implementing `getMany`, `createMany`, `updateMany` and `deleteMany` functions and use `getOne`, `create`, `update` and `deleteOne` functions instead.

**Breaking Change**

-   `getMany`, `createMany`, `updateMany` and `deleteMany` functions are now optional and may cause type issues if used outside of the **refine** hooks.