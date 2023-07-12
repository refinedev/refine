---
"@refinedev/nestjsx-crud": minor
---

feat: added error handling to support server-side validation errors.

When the server returns default validation errors, `useForm` will automatically set the error message for each field that has a validation error.
