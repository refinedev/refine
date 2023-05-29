---
"@refinedev/core": patch
---

Fixed the issue of `label` not taken into account with auto generated document titles. `label` will be prioritized over the resource name when generating the document title and the `label` will not be capitalized.
