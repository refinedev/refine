---
"@pankod/refine-core": patch
---

The redirect method that return from `useForm` updated to be avaiable for passing `id`.

```
const { redirect } = useForm();

redirect("edit", id);
```

The data is resolved in the `onSuccess` of the `onFinishCreate` method.
