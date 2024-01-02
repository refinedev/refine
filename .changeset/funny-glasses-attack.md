---
"@refinedev/inferencer": patch
---

Show and List type inferencers were failing to provide a preview when there's a relational property without a presentational key. Updated generated code blocks to handle fields with no accessor keys and display a placeholder message instead. Fixes #5184
