---
id: serverSideFormValidation
title: Server-Side Form Validation
example-tags: [form, material-ui]
---

You can make server-side form validation out-of-the-box with [React Hook Form useForm][react-hook-form-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] automatically display the error messages in the form with the corresponding fields.

[Refer to the server-side Form Validation documentation for more information. →](/docs/advanced-tutorials/forms/server-side-form-validation/)

<CodeSandboxExample path="server-side-form-validation-material-ui" />

[react-hook-form-use-form]: /docs/packages/documentation/react-hook-form/useForm/
