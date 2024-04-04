---
"@refinedev/devtools": patch
"@refinedev/devtools-server": patch
"@refinedev/devtools-ui": patch
---

fix: broken lodash imports in ESM builds

Fixed lodash imports in ESM builds which requires `lodash-es` imports to use `.js` extension to work properly unless the bundler is configured to handle non-fully-specified imports.

Resolves [#5822](https://github.com/refinedev/refine/issues/5822)
