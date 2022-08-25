---
"@pankod/refine-core": minor
---

Added a new redirect feature. It is now possible to set default redirects.

By default, when a form is submitted, it will redirect to the "list" page of the current resource. You can change this behavior by setting the `redirect` parameter like this:

```tsx
<Refine
    ...
    options={{ redirect: { create: "show", clone: "edit", edit: false }, }}
/>
```
