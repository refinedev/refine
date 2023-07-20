---
"@refinedev/cli": patch
---

feat: added optional prompt for collecting work emails on `refine dev` command.
This prompt will be asked once per machine. Once the user has entered their email, it will be stored in a file in the user's home directory (`~/.config/refine/skip-prompt`). This file will be used to determine whether or not to ask the user for their email in the future.

Can be disabled with ENV variable `REFINE_PROJECT_PROMPT_DISABLED=true`.
