---
"@refinedev/chakra-ui": patch
"@refinedev/inferencer": patch
"@refinedev/mantine": patch
---

fix: `@tabler/icons-react` imports in CJS builds

imports from `@tabler/icons-react` end up requiring the ESM build in CJS environments, to prevent this we've added added an esbuild plugin to replace the imports with the correct path for CJS bundles.
