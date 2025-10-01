---
"@refinedev/core": patch
---

fix: prevent external queryOptions.enabled from overriding internal ID check in useForm (#7031)

Fixed a bug where the `useForm` hook allowed external `queryOptions.enabled` to bypass internal ID safety checks, causing API calls with undefined IDs.

Added comprehensive tests covering create mode, undefined IDs, and various enabled combinations to ensure the fix works correctly.

Fixes #7031
