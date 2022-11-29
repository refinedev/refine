---
"@pankod/refine-cli": patch
---

Added: Warning command description changed according `refine CLI` installed or not.

-   If `refine CLI` is installed, It will be shown as `npm run refine update` command.
-   IF `refine CLI` is not installed, It will be shown as `npx refine update` command.
    -   package manager will be detected automatically.
