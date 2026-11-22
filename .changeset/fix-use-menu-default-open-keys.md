---
"@refinedev/core": patch
---

Fixed `useMenu`'s `defaultOpenKeys` not updating when navigating to a different resource without unmounting (e.g. a persistent sidebar in a single-page app).

The value was memoized with an empty dependency array even though it depends on the active `resource` and `resources`, so it was only ever computed once on mount. Added `resource` and `resources` to the dependency array so the open keys stay correct after client-side navigation.
