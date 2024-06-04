---
"@refinedev/devtools-internal": patch
---

fix(devtools-internal): broken env conditional in useQuerySubscription hook

When using Refine with React Native, `process.env.NODE_ENV !== "development" ? () => ({}) : () => {...}` conditional in `useQuerySubscription` hook was causing a syntax error. This PR fixes the issue by explicitly returning an empty object on non-development environments.
