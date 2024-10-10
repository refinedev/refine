---
"@refinedev/strapi-v4": patch
---

fix: `transformHttpError.ts` and `transformErrorMessages` files are not [swizzling](https://refine.dev/docs/packages/cli/#commands).

From now on, these files will be copied to the project.

[Resolves #6397](https://github.com/refinedev/refine/issues/6397)
