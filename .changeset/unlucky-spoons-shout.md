---
"@refinedev/core": patch
---

fix: Priority logic between `to` and `go` props.
From now on, the `to` prop has priority over the `go` prop. If both are passed, the `to` prop will be used.

```tsx
// Before fix - go would override to
<Link to="/posts" go={{ resource: "categories" }} />

// After fix - to overrides go
<Link to="/posts" go={{ resource: "categories" }} />
```
