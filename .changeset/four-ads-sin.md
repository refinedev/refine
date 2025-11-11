---
"@refinedev/core": patch
---

fix(core): correct `useCustom` return type to reflect undefined data during loading #7088

Fixed a type safety issue where `useCustom` returned an empty object (`{}`) while loading but TypeScript type was `CustomResponse<TData>["data"]`. This caused runtime errors like `result.data.map is not a function` when accessing data without proper checks. Now `result.data` returns `undefined` while loading with type `CustomResponse<TData>["data"] | undefined`, requiring proper null checks like `result.data?.map()`.

Resolves #7088
