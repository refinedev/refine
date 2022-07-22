---
"@pankod/refine-core": minor
---

Update notification props in data hooks of `@pankod/refine-core` to cover dynamic notifications.

Now users will be able to show notifications according to the API response by assigning a function which returns `OpenNotificationParams` instead of an `OpenNotificationParams` object.

**Example**

```tsx
{
    const { mutate } = useCreate({
        /* ... */
        successNotification: (data, values, resource) => ({
            message: data?.message ?? "Success!",
            type: "success",
            description: data?.description;
        }),
        errorNotification: (error, values, resource) => ({
            message: error?.message ?? error?.code ?? "Error!",
            type: "error",
            description: error?.reason;
        })
        /* ... */
    });
}
```
