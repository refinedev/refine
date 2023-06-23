---
id: serverSideFormValidation
title: Server-Side Form Validation
example-tags: [form, antd]
---

You can make server-side form validation out-of-the-box with [Ant Design useForm][antd-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][antd-use-form] automatically display the error messages in the form with the corresponding fields.

[Refer to the server-side Form Validation documentation for more information. →](/docs/advanced-tutorials/forms/server-side-form-validation/)

<CodeSandboxExample path="server-side-form-validation-antd" />

[antd-use-form]: /docs/api-reference/antd/hooks/form/useForm/
