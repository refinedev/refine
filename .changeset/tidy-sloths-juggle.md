---
"@refinedev/nextjs-router": minor
---

feat: add `react@^19.0.0-rc.0` and `react-dom@^19.0.0-rc.0` as peer dependencies for `@refinedev/nextjs-router`

From now on, users can install `@refinedev/nextjs-router` with Next.js 15 without warnings.

Next.js 15 example project is available in the [examples/with-nextjs-headless](https://github.com/refinedev/refine/tree/master/examples/with-nextjs-headless) directory.

> 🚨 `@refinedev/core` and `@refinedev/nextjs-router` has no breaking change however, to use Next@15, you need to update your project to be compatible with React 19. See the migration guides below:
>
> - [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
> - [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
>
> 🚨 Also, if you are using `@refinedev/antd`, `@refinedev/chakra-ui`, `@refinedev/mantine` or `@refinedev/mui`, you need to check their compatibility with React@19.

See the issue for known issues, migration guide and more: [6430](https://github.com/refinedev/refine/issues/6430)
