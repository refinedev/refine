---
"@refinedev/chakra-ui": patch
---

fix(auth-page): fix wrong translation key in `type="register"`

Previously, sign in link in Register page was using wrong translation key "pages.register.buttons.noAccount". Now it is replaced with "pages.register.buttons.haveAccount".
