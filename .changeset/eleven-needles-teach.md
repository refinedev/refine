---
"@refinedev/cli": patch
---

fix: resolve bin path from cwd to support monorepo workspace hoisting

`resolveBin()` now walks up from `process.cwd()` to find `node_modules/.bin/<name>`, fixing `MODULE_NOT_FOUND` errors when running `refine dev` in npm/bun/yarn workspaces where packages are hoisted to a parent `node_modules`.
