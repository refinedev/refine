---
"@refinedev/cli": minor
---

refactor: use `require.resolve` to find refine package paths.

Updated the refine package search to use `require.resolve` to find the package path. This allows the package to be run from anywhere in the project and allow mono-repos with workspaces to work.