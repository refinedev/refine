---
"@refinedev/ably": patch
"@refinedev/airtable": patch
"@refinedev/antd": patch
"@refinedev/appwrite": patch
"@refinedev/chakra-ui": patch
"@refinedev/cli": patch
"@refinedev/core": patch
"@refinedev/devtools": patch
"@refinedev/devtools-internal": patch
"@refinedev/devtools-server": patch
"@refinedev/devtools-shared": patch
"@refinedev/devtools-ui": patch
"@refinedev/graphql": patch
"@refinedev/hasura": patch
"@refinedev/inferencer": patch
"@refinedev/kbar": patch
"@refinedev/mantine": patch
"@refinedev/medusa": patch
"@refinedev/nestjs-query": patch
"@refinedev/nestjsx-crud": patch
"@refinedev/nextjs-router": patch
"@refinedev/react-hook-form": patch
"@refinedev/react-router-v6": patch
"@refinedev/react-table": patch
"@refinedev/remix-router": patch
"@refinedev/simple-rest": patch
"@refinedev/strapi": patch
"@refinedev/strapi-v4": patch
"@refinedev/supabase": patch
"@refinedev/ui-tests": patch
"@refinedev/ui-types": patch
---

refactor: package bundles and package.json configuration for exports

Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.
