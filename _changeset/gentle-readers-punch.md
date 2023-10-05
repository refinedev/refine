---
"@refinedev/altogic": patch
"@refinedev/medusa": patch
"@refinedev/nestjsx-crud": patch
"@refinedev/strapi": patch
"@refinedev/strapi-v4": patch
---

Now `useCustomMutation` can modify headers for each individual call, without setting the default headers. Previously the default headers was included in all subsequent API calls.
