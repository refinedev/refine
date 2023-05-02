---
"@refinedev/supabase": minor
---

feat: added select field capability to data provider mutation methods

Now you can pass `select` field to `create`, `update` `createMany` and `updateMany` methods of data provider to get fields you need from the response.

For example:


```tsx
useCreate({
    resource: "posts",
    variables: {
        title: "Hello World",
        content: "Lorem ipsum dolor sit amet",
    },
    meta: {
        select: "title, content",
    },
});
```
