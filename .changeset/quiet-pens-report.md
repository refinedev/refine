---
"create-refine-app": patch
---

`create-refine-app --example` no longer reports success when `npm install` fails.

Previously the CLI printed a green `Success!` box with `npm run dev` instructions even when installing the example's dependencies failed, so a project that could not run looked like a working one. The box now says `Incomplete`, lists `npm install` before `npm run dev`, and the process exits with a non-zero code.

Fixes #7687
