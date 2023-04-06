---
"@refinedev/antd": minor
---

Updated `useModalForm` and `useDrawerForm` hook's `show` method to check if there's an `id` present or provided. If there is, it will continue to show the modal/drawer. If not, the modal/drawer will not show. (Resolves #4062)
