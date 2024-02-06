---
"@refinedev/core": minor
---

feat: The following changes implemented to improve `useCustom` hook's developer experience. #5600

- `url` prop is now optional. If not provided, the hook will use the data provider URL.

- From now on, at least one of the `gqlQuery`, `gqlMutation`, or `method` props must be required.
  - If user provides `method`, `gqlQuery` and `gqlMutation` props type will be `never`.
  - If user provides `gqlQuery`, or `gqlMutation`, `method` prop type will be `never`.

```tsx
import { useCustom } from "@refinedev/core";

useCustom({}); // Error: At least one of the `gqlQuery`, `gqlMutation`, or `method` props must be required.

useCustom({ method: "GET" }); // OK

useCustom({ gqlQuery: "query { ... }" }); // OK
useCustom({ gqlMutation: "mutation { ... }" }); // OK
useCustom({ gqlMutation: "mutation { ... }", gqlQuery: "query { ... }" }); // OK

useCustom({ method: "GET", gqlQuery: "query { ... }" }); // Error: `method` prop type should be `never`.
useCustom({ method: "GET", gqlMutation: "mutation { ... }" }); // Error: `method` prop type should be `never`.
```
