---
"@refinedev/rest": patch
---

fix: `getMany` method now returns the complete response body

Previously, `getMany` method was returning `body.records` which assumed a specific response structure. Now it returns the complete response body directly, providing more flexibility for different API response formats.
