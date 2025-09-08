---
"@refinedev/core": patch
---

fix(core): error notification infinite render issue

useEffect hook in data query hooks that handles the error notification had whole error object in dependency array, which changes with every request, thus causing infinite re-renders. Changed the dependency to just error message string.

[Resolves #6983](https://github.com/refinedev/refine/issues/6983)
