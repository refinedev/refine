---
"@pankod/refine-core": patch
---

Fix redirection after submit in `useForm`. Both `edit` and `create` will redirect to `list` (it was `edit` previously)

Resolves #2123
