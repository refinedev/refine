---
"@pankod/refine-core": minor
---

Add object path syntax support for useSelect hook


```tsx
useSelect({
    resource: "posts",
    optionLabel: "nested.title",
    optionLabel: "nested.id",
});
```