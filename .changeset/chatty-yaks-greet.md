---
"@refinedev/kbar": minor
---

feat: added shortcuts to kbar actions #5750

To utilize full potential of kbar, you can now use shortcuts to perform actions.

Shortcuts applied by default:

- List: First letter from resource name
- Create: "c" (from list page)
- Edit: "e"
- Delete: "d" (opens delete group)

Shortcuts can be customized by passing shortcuts object to resource meta like this.

```tsx
resources={[
    {
      name: "categories",
      list: "/categories",
      create: "/categories/create",
      meta: {
        shortcuts: {
          create: ["n"], // Now, pressing "n" triggers the creation of a category.
        },
      },
    },
  }]}
```

Resolves #5750
