---
"@refinedev/core": patch
---

Added missing `clone` action for document title generation. This fixes the issue of the document title not being generated when the `clone` action is used.

This change introduces the `documentTitle.{resourceName}.clone` key to the list of `i18n` keys that are used to generate the document title.

Default title for the `clone` action is `"#{{id}} Clone {{resourceName}} | refine"`.
