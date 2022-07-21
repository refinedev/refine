# @pankod/refine-kbar

## 0.2.1

### Patch Changes

-   [#2178](https://github.com/pankod/refine/pull/2178) [`7a8e74a0af`](https://github.com/pankod/refine/commit/7a8e74a0afcd6c6d87630f4a5f5102808e4354e9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed `react-dom` dependency version

    ```diff
    - "react-dom": "^17.0.4"
    + "react-dom": "^17.0.0 || ^18.0.0"
    ```

## 0.2.0

### Minor Changes

-   Command palette for the refine. this package use [kbar](https://github.com/timc1/kbar) to generate the command palette.

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

## 0.1.0

### Minor Changes

-   [#2117](https://github.com/pankod/refine/pull/2117) [`e941ac0f47`](https://github.com/pankod/refine/commit/e941ac0f47c7bd3278e7563567ede3813f522988) Thanks [@biskuvit](https://github.com/biskuvit)! - Command palette for the refine. this package use [kbar](https://github.com/timc1/kbar) to generate the command palette.

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
