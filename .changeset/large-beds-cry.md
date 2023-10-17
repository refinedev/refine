---
"@refinedev/mui": patch
---

fix: map missing operators for useDataGrid hook.

-   number field, added `isAnyOf` operator.
-   string field, added `startsWith`, `endsWith` and `isAnyOf` operators.

fix: `isNull` and `isNotNull` doesn't trigger request.

When filter has a value `""`, it's ignored and doesn't trigger request.
Previously `isNull` and `isNotNull` operators weren't handled correctly and had value `""` by default.
With this change, these operators has `true` value, so they won't be ignored.
