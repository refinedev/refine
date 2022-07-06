---
"@pankod/refine-core": patch
---

The redirect method that return from `useForm` updated to be avaiable for passing `id`.

```
const { redirect } = useForm();

redirect("edit", id);
```
