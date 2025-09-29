---
"@refinedev/core": patch
---

test: add comprehensive tests for useForm queryOptions.enabled behavior

- Added 5 comprehensive test cases covering all scenarios for queryOptions.enabled behavior
- Tests verify the AND operator logic that combines internal conditions with external enabled settings
- Ensures the bug fix for issue #6867 continues to work correctly
- Covers edge cases including create mode, undefined IDs, and various enabled combinations
