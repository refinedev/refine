---
"@refinedev/devtools-server": patch
"@refinedev/devtools-ui": patch
---

refactor(devtools): updated auth flow

Previously, a proxy in the Devtools Server was used as an auth server to handle sign-ins in the localhost (Devtools Server). This change updates the flow and moves the authentication flow to `https://auth.refine.dev` to handle sign-ins and sign-outs. Now the Devtools Server is only responsible for the connection between the auth server and the user interface while also managing the user's session.
