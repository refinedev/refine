---
"@pankod/refine-react-hook-form": minor
---

Removed `saveButtonProps` exported from `useModalForm` because `saveButtonProps` is already exported from `useForm` hook in `@pankod/refine-react-hook-form`.

```diff
 const {
   modal: {
-    saveButtonProps
   },
+  saveButtonProps
 } = useModalForm();
```
