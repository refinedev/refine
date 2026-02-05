---
"@refinedev/devtools-server": minor
"@refinedev/devtools-shared": minor
"@refinedev/devtools-ui": minor
---

feat: make devtools publicly accessible without authentication

DevTools no longer requires authentication to use. Removed Ory client integration,
login/logout/onboarding flows, project ID management, and related API endpoints.
Users can now access DevTools directly without signing in.
