---
"@refinedev/hasura": patch
---

fix(utils): handle nested fields in generateSorting #5348

This change addresses an issue with nested fields in the generateSorting utility function. The fix ensures that sorting works correctly when dealing with nested fields in the GraphQL query generation.
