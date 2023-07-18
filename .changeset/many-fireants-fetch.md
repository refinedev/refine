---
"@refinedev/nestjsx-crud": minor
---

feat: added error handling to support server-side validation errors.

When the server returns default validation errors, `update`, `create`, `updateMany`, and `createMany` methods will throw an error with the validation errors. This allows the `useForm` update the error state with the validation errors.
