---
"@refinedev/antd": minor
---

chore: update `@ant-design/icons` and `@ant-design/pro-layout` versions

Updated previously pinned versions of `@ant-design/icons` from `5.0.1` and `@ant-design/pro-layout` from `7.17.12` to latest versions. This minor update resolves the previous issues with `React@18` types and conflicting type ranges with `@ant-design/pro-layout` package.

After `@ant-design/icons` version `5.4.0` build issues and type issues are resolved. Following this release `@ant-design/pro-layout` also updated its dependency range to match the latest `@ant-design/icons` version.

Previously `@ant-design/icons` were pinned to `5.0.1` and recommended to pin in projects as well. After this update, you may also need to update the `@ant-design/icons` version in your project to match the latest version. (A range above `^5.5.1` is required to match `@refinedev/antd`).

[Resolves #6363](https://github.com/refinedev/refine/issues/6363)
[Resolves #5931 - previously resolved by #5934](https://github.com/refinedev/refine/issues/5931)
[Accompanies #6354 - `@ant-design/pro-layout` also depends on `express` dependency and updated its version in the latest release](https://github.com/refinedev/refine/pull/6354)
