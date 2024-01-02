---
"@refinedev/core": patch
---

Added the ability to pass `meta` properties when using `useGo`'s `go` function with `to` as a resource object. This allows you to pass additional path parameters to the path defined in the resources array within the `<Refine />` component. Resolves [#5451](https://github.com/refinedev/refine/issues/5451)

Assume we have the following resource defined in the `<Refine />` component:

```tsx
{
    name: "posts",
    list: "/posts",
    edit: "/:foo/posts/:id/edit",
}
```

```tsx
import { useGo } from "@refinedev/core";

const MyButton = () => {
  const go = useGo();

  return (
    <Button
      onClick={() => {
        go({
          to: {
            resource: "posts",
            action: "edit",
            id: "1",
            meta: {
              foo: "bar",
            },
          },
          type: "push",
        });
        // generated path will be "/bar/posts/1/edit"
      }}
    >
      Go Posts
    </Button>
  );
};
```
