---
"@refinedev/cli": patch
---

-   Fixed: When the project type is vite, `refine dev` command was running `vite start` changed `vite dev`. Because there is no `start` command in vite.
