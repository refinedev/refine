---
"@refinedev/supabase": patch
---

fix(supabase): handle realtime subscriptions with multiple filters #6360

Supabase Realtime `postgres_changes` subscriptions support a single `filter` string.
When multiple filters are provided, `liveProvider` now uses only the first valid filter
and logs a warning instead of generating an invalid subscription payload.

Resolves #6360
