---
"@refinedev/antd": patch
---

feat(antd): search form in useTable should work with syncWithLocation

Even though the form is managed by `useTable` hook from `@refinedev/antd`. It wasn't respecting the `syncWithLocation` prop to set values accordingly at initial render when registered fields are matching with the query params. Now it will look for matching fields and set values accordingly from synced filters.
