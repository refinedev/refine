---
"@refinedev/core": patch
---

fix: The `label` and `route` fields in `useMenu().menuItems` were marked as deprecated, but they are not actually deprecated. This issue was caused by `menuItems` extending from `IResourceItem`, however, `menuItems` populates these fields and handles deprecation of these fields internally. This change removes the deprecation warning for these fields.

```tsx
export const Sider = () => {
  const { menuItems } = useMenu();
  menuItems.map((item) => {
    // these are safe to use
    console.log(item.label);
    console.log(item.route);
    item.children.map((child) => {
      // these are safe to use
      console.log(child.label);
      console.log(child.route);
    });
  });

  return <div>{/* ... */}</div>;
};
```

[Fixes #6352](https://github.com/refinedev/refine/issues/6352)
