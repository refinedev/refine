---
"@refinedev/core": patch
---

feat: add `false` return type on `SuccessErrorNotification`

This issue has been fixed in this PR, where the `successNotification` and `errorNotification` methods can now return `false` when a callback function is given. This allows the conditional notification to be displayed.


```
const { mutate } = useCreate<IPost>({});

mutate({
    resource: "posts",
    values: {
        title: "Hello World",
        status: "published",
    },
    successNotification: (data) => {
        if (data?.data.status === "published") {
            return {
                type: "success",
                message: "Post published",
            };
        }

        return false;
    },
});
```