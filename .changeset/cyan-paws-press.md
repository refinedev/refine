---
"@refinedev/cli": patch
---

chore(cli): remove unused command

Previously `@refinedev/cli` had a `proxy` command that is no longer in use and not required in any of the projects. This change removes the command from the CLI without a fallback.
