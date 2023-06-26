---
"@refinedev/inferencer": patch
---

Updated inferencer functions to check for relational fields with representable values. If the inferencer type is `show` or `list`, the inferencer will use the available properties to show the field instead of trying to fetch the relational data.

```tsx
// posts/1
{
    id: 1,
    name: "Post 1",
    tags: [
        {
            id: 5,
            name: "Tag 5"
        },
        {
            id: 6,
            name: "Tag 6"
        }
    ],
    content: "...",
}
```

Above structure will show the `tags` field in list and show inferencers using the `name` property instead of trying to fetch the relational data. But `edit` and `create` inferencers will still work with the relational data.