---
"@refinedev/devtools-server": patch
"@refinedev/devtools-shared": patch
"@refinedev/devtools-ui": patch
---

feat: make devtools publicly accessible without authentication

DevTools no longer requires authentication to use. Removed Ory client integration,
login/logout/onboarding flows, project ID management, and related API endpoints.
Users can now access DevTools directly without signing in.
