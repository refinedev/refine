---
"@refinedev/cli": patch
---

fix: When the project type is vite, the `refine dev` command was running `vite start`. It is now changed to `vite dev`, because there is no `start` command in vite.
