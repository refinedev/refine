---
"@refinedev/core": minor
---

feat: added `errros` field to `HttpError` type.
From now on, you can pass `errors` field to `HttpError`. This field will be used to update the `useForm`'s error state.

```ts
export interface ValidationErrors {
    [field: string]:
        | string
        | string[]
        | boolean
        | { key: string; message: string };
}

export interface HttpError extends Record<string, any> {
    message: string;
    statusCode: number;
    errors?: ValidationErrors;
}
```

Usage example:

```tsx
import { HttpError } from "@refinedev/core";

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={{
                // ...
                update: async () => {
                    // assume that the server returns the following error
                    const error: HttpError = {
                        message: "An error occurred while updating the record.",
                        statusCode: 400,
                        //This field will be used to update the `useForm`'s error state
                        errors: {
                            title: [
                                "Title is required.",
                                "Title should have at least 5 characters.",
                            ],
                            "category.id": ["Category is required."],
                            status: true,
                            content: {
                                key: "form.error.content",
                                message: "Content is required.",
                            },
                        },
                    };

                    return Promise.reject(error);
                },
            }}
        >
            {/* ... */}
        </Refine>
    );
};
```

[Refer to the server-side form validation documentation for more information. →](https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/)
