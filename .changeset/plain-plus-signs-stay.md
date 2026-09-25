---
"@refinedev/react-router": patch
---

fix(react-router): encode query values so synced filters keep `+`, `&` and `#`

`routerProvider.go` built the query string with `encode: false`, so values went into the URL as-is. When `useTable` synced filters with the location, a search like `alice+amazon@gmail.com` came back from `parse` as `alice amazon@gmail.com`, `Tom & Jerry` was cut to `Tom `, and `issue #42` was cut at the hash. Values are now encoded (keys such as `filters[0][value]` stay readable), and the `to` param keeps the same URL form as before.

Fixes #6659
