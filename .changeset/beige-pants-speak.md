---
"@refinedev/core": patch
---

Use `fetch` for telemetry calls as a fallback for `Image` when it's not available. This fixes an issue where telemetry calls would fail in some environments.
