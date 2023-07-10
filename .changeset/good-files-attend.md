---
"@refinedev/core": minor
---

feat: added `errros` field to `HttpError` type.
From now on, you can pass `errors` field to `HttpError`. This field will be used to display errors in the corresponding fields in the form.

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
