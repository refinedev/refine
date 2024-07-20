---
"@refinedev/cli": minor
---

feat(cli): improve the resource add command to generate page files for Next.js

When using the add resource command in a project using Next.js, a page will be generated to perform the selected actions for that resource.

These pages simply display generated components that perform actions on the resource. The placement of page files assumes operation with the App Router. If you prefer to use the Page Router instead, you'll need to move them manually.

[Resolves #6091](https://github.com/refinedev/refine/issues/6091)
