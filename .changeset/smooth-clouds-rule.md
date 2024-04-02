---
"@refinedev/antd": patch
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/mui": patch
---

refactor: moved internal logic of buttons to respective hooks from `@refinedev/core`

We've moved the internal logic of buttons to their respective hooks in the `@refinedev/core` package to ensure consistency and reduce duplication. This change will make it easier to manage and maintain the buttons across different UI integrations of Refine. This will also benefit the users who want to customize the buttons via `swizzle` option or create their own buttons withouth having to duplicate the logic.
