---
"@refinedev/core": minor
---

feat: The following changes implemented to improve `useCustom` hook's developer experience. #5600

- `url` prop is now optional. If not provided, the hook will use the data provider's URL.

- From now on, at least one of the `gqlQuery`, `gqlMutation`, or `method` props must be required.
  - If user provides `method`, `gqlQuery` and `gqlMutation` props type will be `never`.
  - If user provides `gqlQuery`, or `gqlMutation`, `method` prop type will be `never`.

```tsx
import { useCustom } from "@refinedev/core";

useCustom({}); // ❌ At least one of the `gqlQuery`, `gqlMutation`, or `method` props must be required.

useCustom({ method: "GET" }); // ✅

useCustom({ gqlQuery: "query { ... }" }); // ✅
useCustom({ gqlMutation: "mutation { ... }" }); // ✅
useCustom({ gqlMutation: "mutation { ... }", gqlQuery: "query { ... }" }); // ✅

useCustom({ method: "GET", gqlQuery: "query { ... }" }); // ❌ `method` prop type should be `never`.
useCustom({ method: "GET", gqlMutation: "mutation { ... }" }); // ❌ `method` prop type should be `never`.
```
