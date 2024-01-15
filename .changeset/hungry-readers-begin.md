---
"@refinedev/your-package": patch
---

fix(utils): handle nested fields in generateSorting

This changeset addresses an issue with nested fields in the generateSorting utility function. The fix ensures that sorting works correctly when dealing with nested fields in the GraphQL query generation.

Resolves #5348
