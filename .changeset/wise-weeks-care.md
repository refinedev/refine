---
"@refinedev/core": minor
---

Added `useResourceParams` hook. This hook initially works similarly to `useResource` but it correctly handles the `id` and `action` params per active route and explicit parameters. In `@refinedev/core` and other Refine packages there was a common logic of handling the `id` since its inference is dependent on the active resource and route. The same also applies to the `action` parameter of forms. This hook handles these cases and provides a more consistent API to share the same logic without duplicating it.

- `id` and `action` values returned from `useResource` is deprecated in favor of `useResourceParams`.
- `useForm` hook is updated to use `useResourceParams` under the hood.
- // TODO: add rest of the changes when done
