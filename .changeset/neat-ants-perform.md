---
"@refinedev/core": patch
---

fix: use relative path instead of path alias to import FlatTreeItem

Using path alias causes imported types being any during build/compilation process which is it should be TreeMenuItem[]
