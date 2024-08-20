---
"@refinedev/cli": patch
---

feat: added scripts for Remix SPA Mode

It is now possible to execute the Remix SPA Mode script by selecting it from the platform options.

Two new project types are added `remix-vite` and `remix-spa`. `remix-vite` is Remix + Vite and `remix-spa` is Remix + Vite SPA Mode. While `remix-vite` type can be inferred from the project configuration without needing to specify it in the command, `remix-spa` type needs to be specified explicitly.

[Resolves #6127](https://github.com/refinedev/refine/issues/6127)
