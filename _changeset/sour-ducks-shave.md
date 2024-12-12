---
"@refinedev/codemod": patch
---

feat: React Router v6 to v7 codemod added.

For `@refinedev/react-router-v6` to `@refinedev/react-router`:

```bash
npx @refinedev/codemod@latest refine-react-router-v6-to-refine-react-router
```

```diff
 import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
- from "@refinedev/react-router-v6";
 import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
+ from "@refinedev/react-router";

```

For `react-router-dom` to `react-router`:

```bash
npx @refinedev/codemod@latest react-router-dom-to-react-router"
```

```diff
-import { RouterProvider } from "react-router-dom";
+import { RouterProvider } from "react-router";
```

See the [migration guide React Router v6 to v7](https://refine.dev/docs/routing/integrations/react-router/migration-guide-v6-to-v7) for more information.
