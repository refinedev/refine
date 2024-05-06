---
"@refinedev/antd": patch
---

fix: lock `antd` version to `5.16.5` due to broken builds in `5.17.0`

In the latest release of `antd` package, Next.js apps are failing to build or taking extremely long time to build. Until this issue is fixed in the `antd` package, we are locking the version to `5.16.5` to prevent any build issues.

Related issue [antd/#48758](https://github.com/ant-design/ant-design/issues/48758)
