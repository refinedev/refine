---
id: authenticated
title: <Authenticated>
---

`<Authenticated>` is the component form of [`useAuthenticated`][useAuthenticated]. It internally uses [`useAuthenticated`][useAuthenticated] to provide it's functionality.

```tsx
import { Authenticated } from "@pankod/refine-core"

<Authenticated>
    <YourComponent />
</Authenticated>
```

For an example use, see [Custom Pages Example][Custom Pages Example] and [it's explanation][Custom Pages Explanation].

## API Reference

### Properties

| Property | Description                                                           | Type        | Default |
| -------- | --------------------------------------------------------------------- | ----------- | ------- |
| fallback | Content to show if user is not logged in. If undefined, routes to `/` | `ReactNode` |         |
| loading  | Content to show while checking whether user is logged in              | `ReactNode` |         |

[useAuthenticated]: /core/hooks/auth/useAuthenticated.md
[Custom Pages Explanation]: /guides-and-concepts/custom-pages.md#authenticated-custom-pages
[Custom Pages Example]: /examples/custom-pages.md
