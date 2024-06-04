---
"@refinedev/core": patch
---

refactor: omit `to` parameter if at root when unauthenticated

If user is not authenticated, `<Authenticated />` redirects to the provided route and appends the current route to the `to` parameter. With this change, if the current route is the root (`/`), the `to` parameter will be omitted.
