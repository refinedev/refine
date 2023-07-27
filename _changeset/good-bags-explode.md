---
"@refinedev/core": minor
---

Removed `@tanstack/react-query-devtools` package and its usage from refine's core. This means that you will no longer see the dev tools icon in the bottom right corner of your app by default. If you want to use the dev tools, you can install the package (`@tanstack/react-query-devtools`) and use it in your app. 

`options.reactQuery.devtoolConfig` property has been removed from the `<Refine>` components props. This option will no longer be functional and will be removed in the next major release. If you have any configuration for the dev tools, you can pass it to the `ReactQueryDevtools` component directly.