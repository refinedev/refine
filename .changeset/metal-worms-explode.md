---
"@refinedev/core": patch
---

Update `authBindings` error type to provide changeable error messages on notifcations.

Example for `login` method:

```ts
import { AuthBindings } from "@refinedev/core";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        ...
        return {
            success: false,
            error: {
                message: "Login Failed!",
                name:
                    "The email or password that you've entered doesn't match any account.",
            },
        };
    },
    ...
};
```
