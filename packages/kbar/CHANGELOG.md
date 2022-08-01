# @pankod/refine-kbar

## 0.8.0

### Minor Changes

-   Add React@18 support 🚀

## 0.7.0

### Minor Changes

-   [#1718](https://github.com/pankod/refine/pull/1718) [`b38620d842`](https://github.com/pankod/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 0.6.0

### Minor Changes

-   Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

    ```ts
    const App: React.FC = () => {
        <Refine
            // other providers and props
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    if (resource === "posts" && action === "edit") {
                        return Promise.resolve({
                            can: false,
                            reason: "Unauthorized",
                        });
                    }

                    // or you can access directly *resource object
                    // const resourceName = params?.resource?.name;
                    // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                    // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                    //     return Promise.resolve({
                    //         can: false,
                    //         reason: "Unauthorized",
                    //     });
                    // }

                    return Promise.resolve({ can: true });
                },
            }}
        />;
    };
    ```

## 0.5.0

### Minor Changes

-   [`e78b181b12`](https://github.com/pankod/refine/commit/e78b181b12adb35e516c19b5382a211e10476add) Thanks [@omeraplak](https://github.com/omeraplak)! - Pass the full `resource` to the `accessControlProvider` can method. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

    ```ts
    const App: React.FC = () => {
        <Refine
            // other providers and props
            accessControlProvider={{
                can: async ({ resource, action, params }) => {
                    if (resource === "posts" && action === "edit") {
                        return Promise.resolve({
                            can: false,
                            reason: "Unauthorized",
                        });
                    }

                    // or you can access directly *resource object
                    // const resourceName = params?.resource?.name;
                    // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
                    // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
                    //     return Promise.resolve({
                    //         can: false,
                    //         reason: "Unauthorized",
                    //     });
                    // }

                    return Promise.resolve({ can: true });
                },
            }}
        />;
    };
    ```

## 0.4.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.3.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 0.2.2

### Patch Changes

-   Fixed `react-dom` dependency version

    ```diff
    - "react-dom": "^17.0.4"
    + "react-dom": "^17.0.0 || ^18.0.0"
    ```

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
