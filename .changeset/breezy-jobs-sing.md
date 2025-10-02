---
"@refinedev/core": patch
---

bug fix: the select function passed to useQuery parameters was recreated on each rerender which triggered the select function each time. Now the select function which is passed to useQuery in useList hook is memoized, which means that the passed select function is triggered only when new data of the useQuery hook changed or when pagination prop passed to useList changes.

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
