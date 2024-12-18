---
"@refinedev/supabase": patch
---

fix: handle multiple filters in Supabase liveProvider.
This update addresses the handling of multiple filters in the Supabase liveProvider. It ensures only the first filter is applied and introduces a configurable `meta.realtimeFilter` option for custom filter behavior. A warning is logged when multiple filters are detected.

Resolves [#6360](https://github.com/refinedev/refine/issues/6360)
