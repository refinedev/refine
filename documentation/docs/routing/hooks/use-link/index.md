---
title: useLink
---

`useLink` is a hook that leverages the `Link` property of the [`routerProvider`][routerprovider] to create links compatible with the user's router library.

:::simple Good to know

It's recommended to use the `Link` component from your router library instead of this hook. This hook is used mostly for internal purposes and is only exposed for customization needs.

The `Link` components or the equivalents from the router libraries has better type support and lets you use the full power of the router library.

:::

## Usage

```tsx
import { useLink } from "@refinedev/core";

const MyComponent = () => {
  const Link = useLink();

  return <Link to="/posts">Posts</Link>;
};
```

## Parameters

### to

This is the path that the link will navigate to. It should be a string.

[routerprovider]: /docs/routing/router-provider
