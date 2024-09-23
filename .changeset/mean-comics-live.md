---
"@refinedev/cli": patch
---

chore(cli): remove unused express dependency

Removed `express` dependency which triggers a vulnerability warning from `serve-static`.

[Resolves #6321](https://github.com/refinedev/refine/issues/6321)
