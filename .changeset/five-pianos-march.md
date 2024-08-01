---
"@refinedev/react-router-v6": minor
---

feat: [`<DocumentTitleHandler/>`](https://refine.dev/docs/routing/integrations/react-router/#documenttitlehandler) should populated `resource.meta.label` field if it's not provided on the Refine's resource definition.
From now on, users be able to use the `resource.meta.label` field to customize document title more easily.

```tsx
import {
  BrowserRouter,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { Refine } from "@refinedev/core";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
      /* ... */
      >
        {/* ... */}
        <DocumentTitleHandler
          handler={({ action, params, resource }) => {
            const id = params?.id ?? "";

            const actionPrefixMatcher = {
              create: "Create new ",
              clone: `#${id} Clone ${resource?.meta?.label}`,
              edit: `#${id} Edit ${resource?.meta?.label}`,
              show: `#${id} Show ${resource?.meta?.label}`,
              list: `${resource?.meta?.label}`,
            };

            const suffix = " | <Company Name>";
            const title = actionPrefixMatcher[action || "list"] + suffix;

            return title;
          }}
        />
      </Refine>
    </BrowserRouter>
  );
};
```
