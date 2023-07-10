---
"@refinedev/mantine": minor
---

feat: After the `onMutationError` callback is triggered, `useForm` will automatically set the thrown errors to the corresponding form fields.
From know, when the `dataProvider` throws an `HttpError` with an `errors` field, the form will display the errors in the appropriate fields. With this feature users can handle server-side validation errors out-of-the-box.

[Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)
