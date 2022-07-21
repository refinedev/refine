---
"@pankod/refine-kbar": minor
---

Command palette for the refine. this package use [kbar](https://github.com/timc1/kbar) to generate the command palette.

💡 How use the refine-kbar command palette?

1.  Import the package

```tsx
import { RefineKbarProvider } from "@pankod/refine-kbar";
```

2. Wrap the `<Refine>` component with the `<RefineKbarProvider>`.

```tsx
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
const App: React.FC = () => {
    return (
        <RefineKbarProvider>
            <Refine />
        </RefineKbarProvider>
    );
};
```

1. Create `<OffLayoutArea/>` component for the Refine component and use the `refine-kbar` command palette in `<OffLayoutArea>`

We have the `<RefineKbar>` component to provide the command palette to the `<Refine>` component.

```tsx
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider, RefineKbar } from "@pankod/refine-kbar";

const OffLayoutArea: React.FC = () => {
    return <RefineKbar />;
};
const App: React.FC = () => {
    return (
        <RefineKbarProvider>
            <Refine OffLayoutArea={OffLayoutArea} />
        </RefineKbarProvider>
    );
};
```

> **Note** 📢
> Q: Why we need to wrap the `<Refine>` component with the `<RefineKbarProvider>`?
> A: The `<RefineKbarProvider>` is a wrapper component that provides the command palette to the `<Refine>` component.
> Q: Why we need to add `<OffLayoutArea>` to the `<Refine>` component?
> A: Because we need to reach the `resources` property of the `<Refine>` component.
