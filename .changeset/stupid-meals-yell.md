---
"@pankod/refine-core": minor
---

Ability to disable server-side pagination on `useTable` and `useList` hooks.

**Implementation**

Added `hasPagination` property to `useTable` to enable/disable pagination. Updated `useList` config with no pagination option. Set `hasPagination` to `false` to disable pagination. `useTable` hook uses the `useList` hook under the hood and propagates the `hasPagination` property to it. Also setting pagination related return values to `undefined` for better type check on the user side.

**Use Cases**

In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.
