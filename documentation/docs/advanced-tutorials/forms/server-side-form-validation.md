---
id: server-side-form-validation
title: Server-Side Form Validation
---

import MantineLivePreview from "./partials/\_mantine-server-side-form-validation.md";

Server-side form validation is a technique used to validate form data on the server before processing it. Unlike client-side validation, which is performed in the user's browser using JavaScript, server-side validation occurs on the server-side code, typically in the backend of the application.

## Why Server-Side Validation?

Client-side validation offers a responsive user experience by providing immediate feedback without server round trips. However, it should not be considered a substitute for server-side validation due to its vulnerability to bypassing. Server-side form validation is essential for ensuring data integrity, security, and consistency. It acts as an additional layer that complements client-side validation, preventing malicious or incorrect data from being processed. While client-side validation is valuable, it should not be relied upon exclusively, as server-side validation provides a more robust and reliable validation mechanism.

## Server-Side Validation with **refine**

**refine** supports server-side validation out of the box for all supported UI frameworks (Ant Design, Material UI, Mantine, Chakra UI).
It requires that the `dataProvider` returning rejected promise with the following shape:

```ts
import { HttpError } from "@refinedev/core";

const error: HttpError = {
    message: "Update is not supported in this example.",
    statusCode: 400,
    // the errors field is required for server-side validation.
    // when the errors field is set, useForm will automatically display the error messages in the form with the corresponding fields.
    errors: {
        title: ["Title is required"],
        content: {
            key: "form.error.content",
            message: "Content is required.",
        },
        tags: true,
    },
};
```

> Refer to the `HttpError` type [here][http-error].

`errors` fields can be `string` or `string[]` or `boolean` or `{ key: string; message: string }`

-   `string` or `string[]`: If the field is an array, multiple error messages will be displayed. If the field is a string, only one error message will be displayed.
-   `boolean`: If the field is `true`, "This field is required." message will be displayed. If the field is `false`, no error message will be displayed.
-   `{ key: string; message: string }`: If the field is an object, the `key` field will be used as a translation key. If the `key` is not found in the translation, the `message` field will be displayed.

### How does it work?

When `dataProvider` returns rejected promise with [`errors`][http-error] field, **refine** will automatically display the error messages in the form with the corresponding fields.

This will handled in the `useForm` hook, when the `dataProvider` returns rejected promise with [`errors`][http-error] field, the `useForm` hook will set the [`errors`][http-error] state with the error messages returned from the `dataProvider`.

## Example with Core useForm

> You can find more information about the `useForm` hook [here][core-use-form].

Due to the fact that [`useForm`][core-use-form] hook is framework agnostic, you need to render the `errors` returned from the `dataProvider` manually.

When `dataProvider` returns rejected promise with [`errors`][http-error] field, [`useForm`][core-use-form] hook will return `errors` state, which is an object with the following shape:

```ts
const form = useForm({
    // ...
});

// you can access the errors state from the useForm hook
console.log(form.mutationResult.error?.errors);
```

## Example with Mantine useForm

<MantineLivePreview />

> You can find more information about the `useForm` hook [here][mantine-use-form].

For this example, we mock data provider to return rejected promise with `errors` field.
You can see full example [here](/docs/examples/form/mantine/serverSideFormValidation/)

When `dataProvider` returns rejected promise with [`errors`][http-error] field, [`useForm`][mantine-use-form] automatically set the `form.errors` state with the error messages returned from the `dataProvider`.
You can pass [`getInputProps(<field-name>)`](https://mantine.dev/form/use-form/#getinputprops) to the input component to display the error messages.

Here is the example of how you can return errors from the `dataProvider`:

```ts
import { HttpError, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const App = () => {
    return (
        // ---
        <Refine
            // ---
            dataProvider={{
                ...dataProvider("https://api.fake-rest.refine.dev"),
                // highlight-start
                // this is demonstration of how you can handle errors from API
                update: async () => {
                    const error: HttpError = {
                        message: "Update is not supported in this example.",
                        statusCode: 400,
                        errors: {
                            title: ["Title is required."],
                            "category.id": ["Category is required."],
                            status: ["Status is required."],
                            content: {
                                key: "form.error.content",
                                message: "Content is required.",
                            },
                            tags: ["Tags is required."],
                        },
                    };

                    return Promise.reject(error);
                },
                create: async () => {
                    // this is demonstration of how you can handle errors from API
                    const error: HttpError = {
                        message: "Update is not supported in this example.",
                        statusCode: 400,
                        errors: {
                            title: ["Title is required."],
                            "category.id": ["Category is required."],
                            status: ["Status is required."],
                            content: {
                                key: "form.error.content",
                                message: "Content is required.",
                            },
                            tags: ["Tags is required."],
                        },
                    };
                    return Promise.reject(error);
                },
                // highlight-end
            }}
            // ---
        >
            // ---
        </Refine>
    );
};
```

[core-use-form]: /docs/api-reference/core/hooks/useForm/
[mantine-use-form]: /docs/api-reference/mantine/hooks/form/useForm/
[http-error]: /docs/api-reference/core/interfaceReferences/#httperror
