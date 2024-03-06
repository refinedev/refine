---
"@refinedev/antd": minor
---

feat: allow passing function to `useCheckboxGroup`, `useRadioGroup` and `useSelect` hooks.

```tsx
const { options } = useSelect({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

```tsx
const { options } = useCheckboxGroup({
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
