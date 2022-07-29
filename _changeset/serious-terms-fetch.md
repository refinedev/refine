---
"@pankod/refine-core": minor
---
Added config parameter to useCustomMutationHook to send headers.

```
const apiUrl = useApiUrl();

const { mutate } = useCustomMutation<ICategory>();

mutate({
    url: `${API_URL}/categories`,
    method: "post",
    values: {
      title: "New Category",
    },
    config: {
      headers: {
          Authorization: "Bearer ****",
      },
    },
});
```