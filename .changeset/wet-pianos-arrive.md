---
"@refinedev/cli": patch
"@refinedev/devtools": patch
---

fix(devtools): failing authentication checks

Devtools was failing on determining the auth status and always ended up redirecting to the login page or the onboarding step regardless of the actual authentication status.
