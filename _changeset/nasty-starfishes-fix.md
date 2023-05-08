---
"@refinedev/antd": minor
---

feat: added `autoSubmitClose` prop to `useEditableTable`.
Now you can choose whether to close the table's row after submitting the form or not.

```tsx
const editableTable = useEditableTable({
    autoSubmitClose: false,
});
```
