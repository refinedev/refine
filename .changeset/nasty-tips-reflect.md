---
"@refinedev/mantine": minor
---

feat: allow passing function to `optionLabel` and `optionValue` props for `useSelect` hook.

```tsx
const { options } = useSelect({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

feat: add `searchField` prop to `useSelect` hook.

Can be used to specify which field will be searched with value given to `onSearch` function.

```tsx
const { onSearch } = useSelect({ searchField: "name" });

onSearch("John"); // Searchs by `name` field with value John.
```

By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

```tsx
// When `optionLabel` is string.
const { onSearch } = useSelect({ optionLabel: "name" });

onSearch("John"); // Searchs by `name` field with value John.

// When `optionLabel` is function.
const { onSearch } = useSelect({
  optionLabel: (item) => `${item.id} - ${item.name}`,
});

onSearch("John"); // Searchs by `title` field with value John.
```
