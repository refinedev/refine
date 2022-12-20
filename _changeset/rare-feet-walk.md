---
"@pankod/refine-hasura": patch
---

`contains`, `ncontains`, `containss` and `ncontainss` filters were passing the value without wrapping it to `%` characters. This caused the filters to not work as expected. Added a case to the filter value handler to wrap the value with `%` characters. (Resolves #3245)
