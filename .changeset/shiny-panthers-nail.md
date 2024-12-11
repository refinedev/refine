---
"@refinedev/supabase": patch
---

This PR addresses the issue with multiple filters in Supabase liveProvider. It ensures that only the first filter is applied and adds support for the configurable 'meta.realtimeFilter' to handle custom filter behavior.

Resolves #6360 (https://github.com/refinedev/refine/issues/6360)
