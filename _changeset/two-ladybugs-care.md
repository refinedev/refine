---
"@refinedev/core": minor
---

feat: allow access control provider to be configured globally.

Now `accessControlProvider` accepts `options.buttons` parameter to globally configure UI buttons' behaviour.

These configuration will be used as a fallback, if no configuration on button prop level is found.

Default values:

`options.buttons.enableAccessControl` => `true`
`options.buttons.hideIfUnauthorized` => `false`

```ts
const accessControlProvider: IAccessControlContext = {
    can: async (params: CanParams): Promise<CanReturnType> => {
        return { can: true };
    },
    options: {
        buttons: {
            enableAccessControl: true,
            hideIfUnauthorized: false,
        },
    },
};
```
