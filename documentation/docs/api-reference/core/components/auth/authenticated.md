---
id: authenticated
title: <Authenticated>
---

`<Authenticated>` is the component form of [`useAuthenticated`][useauthenticated]. It internally uses [`useAuthenticated`][useauthenticated] to provide it's functionality.

```tsx
import { Authenticated } from "@pankod/refine-core";

<Authenticated>
    <YourComponent />
</Authenticated>;
```

For an example use, see [Custom Pages Example][custom pages example] and [it's explanation][custom pages explanation].

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/Authenticated"/>

| Property | Description                                                           | Type        | Default |
| -------- | --------------------------------------------------------------------- | ----------- | ------- |
| fallback | Content to show if user is not logged in. If undefined, routes to `/` | `ReactNode` |         |
| loading  | Content to show while checking whether user is logged in              | `ReactNode` |         |

[useauthenticated]: /api-reference/core/hooks/auth/useAuthenticated.md
[custom pages explanation]: /advanced-tutorials/custom-pages.md#authenticated-custom-pages
[custom pages example]: /examples/custom-pages.md
