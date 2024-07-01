---
"@refinedev/cli": patch
---

fix(cli): type imports are breaking the code structure on swizzle

When exporting elements with `swizzle` command, it will try to replace and combine imports from Refine packages. This process was broken if the target file was using `import type` syntax. This PR updates swizzle command to handle `import type` syntax separately.

Resolves [#6035](https://github.com/refinedev/refine/issues/6035)
