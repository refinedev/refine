---
"@pankod/refine-core": minor
---

`clientConfig` property now accepts `QueryClient` instance - #2670

# Usage

```tsx
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
const App: React.FC = () => (
    <Refine
        ...
        options={{
            reactQuery: {
                clientConfig: queryClient
            },
        }}
    />
);
```
