---
"@refinedev/devtools-server": patch
"@refinedev/devtools-shared": patch
---

refactor: use same port for ws and http servers

This PR merges WebSocket and Http server ports into one (5001) to simplify the configuration and avoid port conflicts. Previously the WebSocket server was running on port 5002 and the Http server on port 5001. Now both servers are running on port 5001.
