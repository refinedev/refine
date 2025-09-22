---
"@refinedev/core": patch
---

fix: ensure `useForm` does not allow external `queryOptions.enabled` to bypass
internal ID safety checks.

- Combine internal check with external flag via AND operation:
  `enabled = !isCreate && id !== undefined && (props.queryOptions?.enabled ?? true)`
- Prevents requests with undefined IDs while preserving external control

Fixes #6867

