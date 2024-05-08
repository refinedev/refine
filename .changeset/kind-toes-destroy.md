---
"create-refine-app": patch
---

chore: update `superplate-cli` dependency to latest

This updates the `superplate-cli` and includes a fix for the re-initializing git repository issue. Now when a new project is created, it will check if the current directory is a git repository and if it is, it will not re-initialize it.
