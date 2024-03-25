---
"@refinedev/chakra-ui": patch
"@refinedev/inferencer": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
"@refinedev/antd": patch
---

fix: broken eslint plugin for removing test ids from components

Eslint plugin to remove test ids from components was broken and might miss some test ids to be included in the bundles.
