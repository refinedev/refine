---
"@refinedev/core": patch
---

fix(core): correct useCustom return type to reflect empty object during loading

The `useCustom` hook returns an empty object for `result.data` while loading, but the TypeScript type only indicated it would be `CustomResponse<TData>["data"]`. This caused the type system to not catch potential runtime errors when accessing properties on `result.data` during the loading state.

Updated the return type to `CustomResponse<TData>["data"] | Record<string, never>` to accurately represent that `result.data` can be an empty object while loading.

[Resolves #7088](https://github.com/refinedev/refine/issues/7088)
