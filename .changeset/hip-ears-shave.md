---
"@refinedev/devtools-server": patch
"@refinedev/devtools-ui": patch
---

fix(devtools-server): missing header check on auth requests

Devtools was failing to determine the auth status and always end up redirecting to the login page regardless of the actual auth status. This was due to the missing check on the auth request that was causing all valid responses treated as unauthenticated.

Resolves [#6047](https://github.com/refinedev/refine/issues/6047)
