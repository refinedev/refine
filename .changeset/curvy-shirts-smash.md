---
"@refinedev/inferencer": patch
---

fixed: Inferencer assumes `id` is number in custom pages.
From now on, if `id` is `typeof string`, and `inferencer` will infer it as `string`.
