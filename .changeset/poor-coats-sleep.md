---
"@pankod/refine-core": patch
---

Fix redirection after submit in `useForm`. Both `edit` and `create` will operate to `list` (it was `edit` previously)

Resolves #2123
