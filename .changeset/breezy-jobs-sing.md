---
"@refinedev/core": patch
---

Bug fix: Prevent unnecessary re-executions of the select function passed to useQuery in useList

Problem:

- Select function passed to useQuery was recreated on each render
- This caused unnecessary re-execution of the select function or even infinite loops

Solution:

- Memoize the select function passed to useQuery in useList hook
- Now triggers only when:
  1. useQuery data changes
  2. pagination prop changes in useList

BREAKING CHANGE: No
