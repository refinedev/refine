---
"@refinedev/cli": patch
---

Fixed the version of `node-emoji` to `2.1.0`. Since `v2.1.1` depends on an ESM-only package, it breaks the build.
