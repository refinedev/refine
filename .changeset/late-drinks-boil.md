---
"@refinedev/rest": patch
---

fix: `getMany` `mapResponse` return value is wrong.

Now `getMany` properly handles both array and object response formats by checking if the response is an array and returning the appropriate data structure.
