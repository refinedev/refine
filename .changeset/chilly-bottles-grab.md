---
"@refinedev/core": minor
---

feat: add [`<Link />`](https://refine.dev/docs/routing/components/link/) component to navigate to a resource with a specific action. Under the hood, It uses [`useGo`](https://refine.dev/docs/routing/hooks/use-go/) to generate the URL.

## Usage

```tsx
import { Link } from "@refinedev/core";

const MyComponent = () => {
  return (
    <>
      {/* simple usage, navigates to `/posts` */}
      <Link to="/posts">Posts</Link>
      {/* complex usage with more control, navigates to `/posts` with query filters */}
      <Link
        go={{
          query: {
            // `useTable` or `useDataGrid` automatically use this filters to fetch data if `syncWithLocation` is true.
            filters: [
              {
                operator: "eq",
                value: "published",
                field: "status",
              },
            ],
          },
          to: {
            resource: "posts",
            action: "list",
          },
        }}
      >
        Posts
      </Link>
    </>
  );
};
```

[Fixes #6329](https://github.com/refinedev/refine/issues/6329)
