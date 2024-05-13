---
"@refinedev/antd": patch
---

chore: unpin `antd` version that was causing build issues

With `antd`'s `5.17.0` version, Next.js apps were stuck in the build process. To prevent this from breaking all Refine apps with Next.js, we've pinned the version to `5.16.5` as a workaround. Since then, the issue has been resolved by updating an internal dependency of `antd`, we no longer need to pin the version.
