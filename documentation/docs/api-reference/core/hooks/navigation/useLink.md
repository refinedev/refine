---
id: useLink
title: useLink 🆕
---

`useLink` is a hook that leverages the `Link` property of the [`routerProvider`][routerprovider] to create links compatible with the user's router library.

:::info
It's recommended to use the `Link` component from your router library instead of this hook. This hook is used mostly for internal purposes but also exposed for customization needs.

`Link` components or the equivalents from the router libraries has better type support and lets you use the full power of the router library.
:::

## Basic Usage

```tsx
import { useLink } from "@pankod/refine-core";

const MyComponent = () => {
    const Link = useLink();

    return (
        <Button onClick={() => back()}>
            Go Back
        </Button>
    );
};
```

## Parameters

### `to`

This is the path that the link will navigate to. It should be a string.

[routerprovider]: /docs/api-reference/core/providers/router-provider.md



