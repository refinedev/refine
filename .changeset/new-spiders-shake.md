---
"@refinedev/mui": patch
---

refactor: package bundles and package.json configuration for exports

Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

In context of `@refinedev/mui` these changes may cause unexpected issues due to misconfigured bundlers/compilers in some environments.

In projects using `react-scripts`, you may have issues with import statements in the `@refinedev/mui`'s ESM bundle, this should be resolved by customizing the webpack configuration of the project by allowing imports without fully specifying the extensions.

An example configuration with `@craco/craco` is as follows:

```js
// craco.config.js
module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },
};
```

In Remix projects using `@refinedev/mui` you may encounter issues due to ESM issues from Material UI packages, please refer to this issue if you have any problems related to this: https://github.com/mui/material-ui/issues/39765

If the error is related with `@refinedev/mui` specifically, setting `serverModuleFormat` to `"cjs"` will help getting rid of the related errors.
