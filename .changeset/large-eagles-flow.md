---
"@refinedev/antd": minor
"@refinedev/chakra-ui": minor
"@refinedev/mantine": minor
"@refinedev/mui": minor
---

fixed: `<RefreshButton />` does not refresh content #4618.
From now, `<RefreshButton />` uses `useInvalidate` hook to refresh data instead of `useOne`.
