---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

fix: `dayjs` imports in ESM bundles

dayjs imports in ESM bundles were not being correctly resolved, this has been fixed by adding an esbuild plugin to replace the imports with the correct path for ESM bundles.
