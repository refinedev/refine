---
"@refinedev/simple-rest": patch
---

fix(simple-rest): send correct body and headers when `deleteOne` uses a `meta.method` override

When `meta.method` was set to "post", "put" or "patch", `deleteOne` sent the axios config object as the request body, so `meta.headers` were not applied and the payload was wrapped in `{ data, headers }`. The body and headers are now passed correctly for body-carrying methods.

Resolves #7613
