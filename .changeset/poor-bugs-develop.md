---
"@refinedev/antd": minor
---

feat: allow passing function to `useCheckBoxGroup`, `useRadioGroup` and `useSelect` hooks.

```tsx
const { options } = useSelect({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

```tsx
const { options } = useCheckBoxGroup({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

```tsx
const { options } = useRadioGroup({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```
