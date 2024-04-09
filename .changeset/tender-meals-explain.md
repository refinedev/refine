---
"@refinedev/devtools": patch
---

fix: devtools selector was breaking the esm builds

Fixed the issue with `@aliemir/dom-to-fiber-utils` not being correctly interpreted as ESM in ESM environments, causing `@refinedev/devtools` to throw an unexpected error. Latest release of `@aliemir/dom-to-fiber-utils` (0.5.0) now correctly exports ESM and CJS builds fixing the issue.

Resolves [#5831](https://github.com/refinedev/refine/issues/5831)
