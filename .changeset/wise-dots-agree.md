---
"@refinedev/devtools-server": patch
"@refinedev/devtools-ui": patch
---

fix: remove annoying auth error at initial project loads

When users create a new project or their devtools token expires, their console is polluted with network errors due to missing authentication. This PR removes these errors by handling auth requests in a user-friendly way.
