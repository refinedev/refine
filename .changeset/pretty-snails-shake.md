---
"@refinedev/devtools-internal": patch
---

fix(devtools-internal): fix noop return on hooks for production builds

Currently, `@refinedev/devtools-internal` returns noop function when bundled for production, yet the notation is not correctly interpreted by some bundlers. This PR fixes the issue by moving the empty return and noop functions to a separate definition.

[Resolves #6030](https://github.com/refinedev/refine/issues/6030)
