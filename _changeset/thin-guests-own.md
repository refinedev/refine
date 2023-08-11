---
"@refinedev/inferencer": patch
---

fix: relation fields are not correctly inferred for `show` views

Shows `title` for `category` without using the `useOne` hook when showing the `category` key.

```
{
    "title": "My title",
    "description": "My description",
    "category": {
        "id": 1,
        "name": "My category"
    }
}
```
