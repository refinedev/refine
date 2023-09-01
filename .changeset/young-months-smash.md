---
"@refinedev/core": minor
---

Fine-tuning the invalidation process by setting up additional filters and options for the invalidation.

Now after a successful mutation, refine will invalidate all the queries in the scope but trigger a refetch only for the active queries. If there are any ongoing queries, they will be kept as they are.

After receiving a realtime subscription event, refine will invalidate and refetch only the active queries.

These settings can be changed via `options.invalite` prop of the `<Refine>` component or while using the `useInvalidate` hook.
