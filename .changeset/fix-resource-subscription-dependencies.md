---
"@refinedev/core": patch
---

fix: refresh `useResourceSubscription` when the channel, live provider, parameters, event types, resource, metadata, or liveMode change. The previous subscription is cleaned up before subscribing with updated values. Equivalent serialized parameters, types, and metadata keep the existing subscription.
