---
"@refinedev/supabase": patch
---

fix: fixed 'in'-filter when used inside 'or' not generating correct supabase syntax

When using the 'in'-filter inside a Conditional 'or' Filter the syntax being pushed to supabase would be incorrect.

This resolves #
