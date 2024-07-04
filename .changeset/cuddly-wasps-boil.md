---
"@refinedev/devtools-server": patch
"@refinedev/devtools-ui": patch
---

refactor(devtools): updated flow for login callbacks

Previously, when the login flow had an error, the Devtools UI was displaying it in the secondary window, which was not user-friendly and lead to multiple clients to connect unnecessarily. This change updates the flow to display the error message in the main Devtools window.
