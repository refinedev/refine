---
"@refinedev/antd": patch
---

Due to the bug fix made in the `@refinedev/core`, `onFinishAutoSave`'s returned promise can now reject and should be handled accordingly. Updated `useForm`'s auto save handler to catch the rejection without breaking the application.
