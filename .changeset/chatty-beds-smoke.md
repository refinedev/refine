---
"@refinedev/cli": patch
---

fix(cli): prevent exit on devtools error

Updated the `dev` command's devtools runner logic to prevent the process from exiting when devtools server fails to start. Previously, the process would exit if devtools server failed to start regardless of the development server's status.
