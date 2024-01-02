---
"@refinedev/remix-router": major
---

**Upgrade to Remix v2**

Upgraded `@refinedev/remix-router` to use `Remix v2`. This version change **does not** contain any breaking changes on the `@refinedev/remix-router` side. 

Depending on your project's status, if you decide to upgrade to `Remix v2`, you may or may not need to make necessary changes to your project. Please refer to the [Remix v2 upgrade guide](https://remix.run/docs/en/main/start/v2) for more information.

If your project is created with `create-refine-app` which already initializes Remix projects using the v2 routing convention, you'll need to make the below changes to get rid of the warnings:

```diff
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
-  future: {
-    v2_routeConvention: true,
-  },
};
```

Due to the change in its default value, you may also need to set `serverModuleFormat` to `"cjs"` in your `remix.config.js` file:

```diff
/** @type {import('@remix-run/dev').RemixConfig */
module.exports = {
+  serverModuleFormat: "cjs",
};
```

Other than the changes mentioned above, `@refinedev/remix-router` and rest of the Refine packages should work as expected without requiring any changes.
