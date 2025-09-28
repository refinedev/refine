---
"@refinedev/core": patch
---

fix: use stable array to prevent memoization issue in useList. #7019

Fixed an issue where `useList`, `useMany`, `useTable`, and `useCustom` hooks created new empty arrays/objects on every render. This caused `useEffect` and `useMemo` to trigger unnecessarily.

Now these hooks use stable references for better performance.

Fixes #7019
