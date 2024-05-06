---
"@refinedev/core": patch
---

fix: development errors being logged when `useOnError` is called without an auth provider

When there's no `authProvider` set, the `useOnError` hook will log `"no mutationFn found"` to the console in development because of missing `onError` property. This PR fixes the issue by providing a dummy `onError` function when `authProvider` is not set.
