---
"@pankod/refine-antd": patch
---

Fixed the `Unhandled Promise` error on console for `useForm` with failed requests (Resolves #2156).

This fix only catches the errors triggered by submitting the form, requests by invoking `onFinish` function should be handled by the user.
