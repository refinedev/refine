---
"@pankod/refine-core": patch
---

Updated `<Refine/>` component with memoization to prevent unwanted effects.

-   Fixed the issue: `react-query`'s `queryClient` was re-initializing on every render which was causing it to reset the query cache.
-   Memoized the `notificationProvider` prop to prevent unnecessary re-renders.
-   Memoized the `resources` prop to prevent unnecessary transform calls on every render.
