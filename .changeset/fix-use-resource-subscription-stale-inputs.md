---
"@refinedev/core": patch
---

fix: refresh `useResourceSubscription` when its inputs change

The effect in `useResourceSubscription` previously only listed `enabled` as a dependency. Changing `channel`, `liveMode`, `params`, `types`, `meta`, or the live provider while a component was mounted kept the original subscription alive — the new inputs were silently ignored.

After this fix, the hook tracks all consumed values. The old subscription is unsubscribed before a new one is created with the updated inputs. Object and array inputs (`params`, `types`, `meta`) are compared by their serialized value so equivalent data does not trigger a resubscription. `onLiveEvent` and the context callback are stored in refs so that inline arrow functions do not cause unnecessary resubscriptions on every render.

Fixes [#7662](https://github.com/refinedev/refine/issues/7662).
