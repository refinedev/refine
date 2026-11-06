---
"@refinedev/supabase": patch
---

fix(supabase): add support for missing query filter operators

Added support for negative and boundary query operators (`nin`, `ncontains`, `ncontainss`, `nstartswith`, `nendswith`, `nnull`, `nbetween`) in `generateFilter`. Corrected array serialization for `nin` and wildcard string wrapping for negative search operators in composite `or` filters to ensure compliance with PostgREST query syntax.
