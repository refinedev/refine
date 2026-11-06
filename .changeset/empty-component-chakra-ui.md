---
"@refinedev/chakra-ui": minor
---

feat: add `<Empty>` component for customizable empty states in tables and lists

Added a presentational `<Empty>` component that can be rendered in place of an empty table or list. It accepts `title`, `description`, `action`, and `icon` so you can show a message and an action (e.g. a "Create" button) that fits your context - whether the resource has no records at all, a search returned no results, or filters have hidden every record.

`<Empty>` does not try to detect _why_ the data is empty - you decide what to show based on state you already have.

```tsx
import { List, CreateButton, Empty } from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { Center, Spinner } from "@chakra-ui/react";

const PostList = () => {
  const {
    reactTable: { getRowModel },
    refineCore: {
      tableQuery: { isLoading },
    },
  } = useTable({ columns });

  if (isLoading) {
    return (
      <List>
        <Center py={10}>
          <Spinner />
        </Center>
      </List>
    );
  }

  if (getRowModel().rows.length === 0) {
    return (
      <List>
        <Empty title="No posts yet" action={<CreateButton />} />
      </List>
    );
  }

  // ...render the table
};
```

[Resolves #7638](https://github.com/refinedev/refine/issues/7638)
