---
id: serverSideFormValidation
title: Server-Side Form Validation
example-tags: [form, chakra-ui, react-hook-form]
---

You can handle server-side form validation errors out-of-the-box with [React Hook Form useForm][react-hook-form-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-chakra-ui" />

[react-hook-form-use-form]: /docs/packages/list-of-packages
