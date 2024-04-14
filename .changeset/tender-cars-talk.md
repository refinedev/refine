---
"@refinedev/nextjs-router": patch
---

fix: replace `next/*` imports with extensions in ESM builds

Updated imports from `next/*` to `next/*.js` to prevent issues with ESM builds and to ensure correctly importing the module.
