---
"@refinedev/core": minor
---

feat: The `go` function returned by `useGo` now accepts a `resource` object as the `to` parameter.
From now now, you can provide either a string or a resource object to the `go` function. When a resource object is passed, it will be transformed into the path defined within the resources array of the `<Refine />` component.

`to` accepts an object with the following shape to navigate to a resource:

| Name     | Type                                                        | Description                                                 |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| resource | `string`                                                    | resource name or identifier.                                |
| id       | [`BaseKey`][basekey]                                        | required when `action` is `"edit"`, `"show"`, or `"clone"`. |
| action   | `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"` | action name.                                                |

```tsx
import { useGo } from "@refinedev/core";

const MyComponent = () => {
    const go = useGo();

    return (
        <Button
            onClick={() => {
                go({
                    to:  {
                        resource: "posts", // resource name or identifier
                        action: "edit",
                        id: "1",
                    }
                    query: {
                         foo: "bar",
                    },
                    type: "push",
                });
            }}
        >
            Go Posts With Default Filters
        </Button>
    );
};
```
