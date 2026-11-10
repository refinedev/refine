---
"@refinedev/core": patch
---

fix: refresh `useSubscription` when the channel, live provider, callback, parameters, event types, or metadata change. The previous subscription is cleaned up before subscribing with the updated values. Equivalent serialized parameters, types, and metadata keep the existing subscription.

Fixes [#7658](https://github.com/refinedev/refine/issues/7658).
