---
"@refinedev/core": patch
---

fix: `useResourceSubscription` now resubscribes when `channel`, `resource`, `params`, `types`, `meta`, `liveMode` or `liveProvider` change, instead of keeping the first subscription until `enabled` changes. The latest `onLiveEvent` is delivered through an effect-updated ref, so inline callbacks never force a resubscribe, and `types` is compared order-insensitively.

Fixes [#7666](https://github.com/refinedev/refine/issues/7666)
