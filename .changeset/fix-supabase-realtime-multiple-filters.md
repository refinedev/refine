---
"@refinedev/supabase": patch
---

fix(supabase): handle multiple filters in liveProvider by using only the first filter and logging a warning

Supabase Realtime only supports a single filter per subscription. When multiple filters are provided, the liveProvider will now use only the first filter and log a warning to inform developers about this limitation.

[Resolves #6360](https://github.com/refinedev/refine/issues/6360)
