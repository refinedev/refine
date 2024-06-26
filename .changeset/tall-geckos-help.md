---
"@refinedev/devtools-server": patch
---

fix(devtools-server): lodash import from root

`@refinedev/devtools-server` was using `lodash` imports from root which are interpreted as CJS imports in the ESM bundle. To avoid any future issues, lodash imports have been replaced with subdirectory imports.
