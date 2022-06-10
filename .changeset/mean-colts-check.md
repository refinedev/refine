---
"@pankod/refine-react-router-v6": patch
---

Now `<ErrorComponent/>` is rendered when `<Refine>` has resources and resource has only name.

```tsx
            <Refine
                ...
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                    },
                ]}
            />
```
