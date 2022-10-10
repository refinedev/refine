---
"@pankod/refine-core": minor
---

Marked `getMany`, `createMany`, `updateMany` and `deleteMany` functions as optional and substituted with `getOne`, `create`, `update` and `deleteOne` respectively. Now users can choose to skip implementing `getMany`, `createMany`, `updateMany` and `deleteMany` functions and use `getOne`, `create`, `update` and `deleteOne` functions instead.