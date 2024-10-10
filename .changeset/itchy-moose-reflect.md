---
"@refinedev/core": minor
---

chore: From now on, [`useLink`](https://refine.dev/docs/routing/hooks/use-link/) returns [`<Link />`](https://refine.dev/docs/routing/components/link/) component instead of returning [`routerProvider.Link`](https://refine.dev/docs/routing/router-provider/#link).

Since the `<Link />` component uses `routerProvider.Link` under the hood with leveraging `useGo` hook to generate the URL there is no breaking change. It's recommended to use the `<Link />` component from the `@refinedev/core` package instead of `useLink` hook. This hook is used mostly for internal purposes and is only exposed for customization needs.

[Fixes #6329](https://github.com/refinedev/refine/issues/6329)
