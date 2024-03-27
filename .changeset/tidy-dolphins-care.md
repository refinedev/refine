---
"@refinedev/chakra-ui": minor
---

Migrated from outdated `@tabler/icons@1` to `@tabler/icons-react@3` to make sure we're using the latest available version of the library without requiring users to pin to a deprecated version.

If your project doesn't include `@tabler/icons` you won't be affected by this change. If you're using `@tabler/icons@1` in your project, you may need to update your dependency to latest version of `@tabler/icons-react` to avoid conflicting dependencies. Practically, this should not introduce any breaking changes to your project and all the icons in `@tabler/icons@1` should also be available in the latest version of `@tabler/icons-react`.
