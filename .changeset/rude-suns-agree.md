---
"@refinedev/nextjs-router": patch
"@refinedev/react-router-v6": patch
"@refinedev/remix-router": patch
"@refinedev/strapi-v4": patch
---

fix: replace imports of `qs` with default imports

Updated `qs` imports and usage to prevent issues with ESM builds and to ensure correctly importing the module.
