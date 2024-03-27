---
"@refinedev/mui": patch
---

fix: `@mui/icons-material` imports from ESM builds.

`@mui/icons-material` imports from ESM builds were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.
