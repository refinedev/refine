---
"@refinedev/cli": patch
---

feat(cli): prompt to update all in `update` command

Previously, if users doesn't provide `--all` option, `update` command will display an interactive prompt to pick which packages to update. Now, before displaying the prompt, it will ask if users want to update all packages.
