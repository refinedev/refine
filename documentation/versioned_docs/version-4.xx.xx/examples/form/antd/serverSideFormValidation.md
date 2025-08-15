---
id: serverSideFormValidation
title: Server-Side Form Validation
example-tags: [form, antd]
---

You can handle server-side form validation errors out-of-the-box with [Ant Design useForm][antd-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-antd" />

[antd-use-form]: /docs/ui-integrations/ant-design/hooks/use-form
