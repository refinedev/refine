---
"@refinedev/core": patch
---

fixed: `to` query parameter is not working after login. #6582
From now on, the `to` query parameter will work after login. If the URL includes a `to` query parameter, the user will be redirected to the specified path after logging in.

Example:

After logout, Refine will automatically appends `to` query param to URL.

```
http://localhost:3000/login?to=/any-path
```

After login, it will redirect to `http://localhost:3000/any-path`

Resolves [#6582](https://github.com/refinedev/refine/issues/6582)
