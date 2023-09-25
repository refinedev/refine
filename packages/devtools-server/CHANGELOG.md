# @refinedev/devtools-server

## 1.1.3

### Patch Changes

-   [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the versions of `@refinedev/devtools-ui` and `@refinedev/devtools-shared` dependencies to avoid breaking projects in mismatching releases.

-   Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
    -   @refinedev/devtools-ui@1.1.3

## 1.1.2

### Patch Changes

-   [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Add Project ID warning and auto-fix action for broken projects

-   [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed package descriptions and usage instructions

-   Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
    -   @refinedev/devtools-ui@1.1.2

## 1.1.1

### Patch Changes

-   [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Add Project ID warning and auto-fix action for broken projects

-   [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed package descriptions and usage instructions

-   Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
    -   @refinedev/devtools-ui@1.1.1

![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

## 1.0.2

### Patch Changes

-   [#4976](https://github.com/refinedev/refine/pull/4976) [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@refinedev/devtools-ui`

-   Updated dependencies [[`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb), [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb)]:
    -   @refinedev/devtools-ui@1.0.2

## 1.0.1

### Patch Changes

-   [#4968](https://github.com/refinedev/refine/pull/4968) [`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b) Thanks [@aliemir](https://github.com/aliemir)! - Fix feed content url with main github branch

-   Updated dependencies [[`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b)]:
    -   @refinedev/devtools-ui@1.0.1

## 1.0.0

### Major Changes

-   [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Initial beta release of refine devtools.🎉

    We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

    ## Usage

    Install the dependencies using your package manager.

    ```bash
    npm i @refinedev/devtools@next @refinedev/cli@next @refinedev/core@next
    ```

    Add `<DevtoolsProvider />` and `<DevtoolsPanel />` components to your app:

    You'll need to wrap your app with `<DevtoolsProvider />` component and add `<DevtoolsPanel />` component to your app to access the devtools UI.

    ```tsx
    import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

    const App = () => {
        return (
            <DevtoolsProvider>
                <Refine
                // ...
                >
                    {/* ... */}
                </Refine>
                <DevtoolsPanel />
            </DevtoolsProvider>
        );
    };
    ```

    Then you're good to go 🙌, `<DevtoolsProvider />` will tell refine to connect to the devtools server and track your queries and mutations. `<DevtoolsPanel />` will render the devtools UI in your app.

    note: Devtools only works in development mode and have no overhead on production builds. You don't need to do anything special to exclude DevTools from your bundle.

    Devtools is integrated with `@refinedev/cli` and it will be started automatically in development mode if you have `@refinedev/devtools` installed.

    If you want to start devtools manually or have a custom dev script, you can run `refine devtools` in your project directory or add the following scripts to your `package.json`:

    ```js
    {
        "scripts": {
            // If you have not customized the start script.
            "start": "refine dev", // The devtools server runs automatically; you don't need to do anything.

            // If you have customized the start script.
            "start": "my-custom-dev-script & refine devtools" // Run the devtools server manually.

            // other scripts
        }
    }
    ```

    If you don't have `@refinedev/cli` installed already, you can follow the [installation guide](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project) to add it to your project.

    These commands will start the devtools server. If you want to access the devtools UI outside of your app without depending on the `<DevtoolsPanel />` component, you can go to `http://localhost:5001` in your browser. 🚀

### Patch Changes

-   Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
    -   @refinedev/devtools-shared@1.0.0
    -   @refinedev/devtools-ui@1.0.0
