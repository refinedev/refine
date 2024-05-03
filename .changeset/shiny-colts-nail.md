---
"@refinedev/core": patch
---

fix: exclude internal button hook calls from devtools trace

Removed internal button hook calls from devtools trace to avoid crowding the trace with unnecessary information.
