---
"@refinedev/devtools-shared": patch
---

chore: prevent websocket closing errors in console

When `<DevtoolsProvider />` component is mounted in apps with React's strict mode, it will try to initialize the websocket connection twice and first one will be closed immediately before the connection is established. This PR will delay closing the websocket connection until it's established properly to prevent these errors from appearing in the console.
