---
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
"@refinedev/antd": patch
"@refinedev/mui": patch
---

fix(auth-page): fix wrong translation keys in `type="register"` and `type="forgotPassword"`

In `type="forgotPassword"`:

- `"pages.register.buttons.haveAccount"` is replaced with `"pages.forgotPassword.buttons.haveAccount"`
- `"pages.login.signin"` is replaced with `"pages.forgotPassword.signin"`

In `type="register"`:

- `"pages.login.divider"` is replaced with `"pages.register.divider"`
- `"pages.login.buttons.haveAccount"` is replaced with `"pages.register.buttons.haveAccount"`
- `"pages.login.signin"` is replaced with `"pages.register.signin"`

Wrong keys are kept as fallbacks in case the new keys are not found in the translation file. If you are using those keys in your project, make sure to update them accordingly. Fallback keys will be removed in future releases.

[Resolves #5816](https://github.com/refinedev/refine/issues/5816)
