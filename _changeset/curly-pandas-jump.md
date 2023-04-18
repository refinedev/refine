---
"@refinedev/cli": minor
---

refactor: use `require.resolve` to find script executables.

Updated the runner command to use `require.resolve` to find the script executable. This allows the script to be run from anywhere in the project and allow mono-repos with workspaces to work.