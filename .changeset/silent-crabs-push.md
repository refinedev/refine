---
"@pankod/refine-core": minor
---

Added useCustomMutation for custom mutation.

```tsx
const { mutation } = useCustomMutation();

mutation({
  url: 'https://api.example.com/users',
  method: 'POST',
  values: {
    name: 'John Doe',
    email: 'johndoe@mail.com',
  },
})
```
