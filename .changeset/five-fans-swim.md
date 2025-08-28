---
"@refinedev/react-hook-form": patch
---

- Add useEffect to set form values from initial query result when modal is visible.
- Compensates for useForm not setting initial modal form values when querying the same resource id back-to-back.

[Resolves #6904](https://github.com/refinedev/refine/issues/6904)
