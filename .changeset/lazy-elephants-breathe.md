---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/core": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
"@refinedev/react-hook-form": patch
---

fix: prioritization of forgotten `identifier`

If `identifier` is provided, it will be used instead of `name`. For example, the translation keys will be generated using `identifier` instead of `name`.
