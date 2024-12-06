---
"@refinedev/nextjs-router": minor
---

**Feature:** Added support for Next.js 15. #6430

To create a new example project with Next.js 15, run the following command:

```bash
npm create refine-app@latest -- --example with-nextjs-headless
```

You can find the source code in the [examples/with-nextjs-headless](https://github.com/refinedev/refine/tree/main/examples/with-nextjs-headless) directory.

> 🚨 While `@refinedev/core` and `@refinedev/nextjs-router` do not introduce breaking changes, upgrading to Next.js 15 requires your project to be compatible with React 19. Please refer to the migration guides below:
>
> - [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
> - [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
>
> 🚨 Additionally, if you're using `@refinedev/antd`, `@refinedev/chakra-ui`, `@refinedev/mantine`, or `@refinedev/mui`, make sure to check their compatibility with React 19.

For known issues, migration guidance, and more details, please refer to issue [#6430](https://github.com/refinedev/refine/issues/6430).
