---
"@refinedev/core": patch
---

fix: `useResourceSubscription` now resubscribes when its channel, resource, params, types, meta, live mode or live provider change, instead of keeping the first subscription until `enabled` changes. The latest `onLiveEvent` is kept in a ref, so inline callbacks don't cause a resubscription on every render.

Fixes [#7662](https://github.com/refinedev/refine/issues/7662)
