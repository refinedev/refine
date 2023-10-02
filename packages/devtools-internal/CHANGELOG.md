# @refinedev/devtools-internal

## 1.1.4

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

-   Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
    -   @refinedev/devtools-shared@1.1.2

## 1.1.3

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

-   Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b)]:
    -   @refinedev/devtools-shared@1.1.1

## 1.1.2

### Patch Changes

-   [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the version of `@refinedev/devtools-shared` dependency to avoid breaking projects in mismatching releases.

## 1.1.1

### Patch Changes

-   [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixing the version of `@refinedev/devtools-shared` dependency to avoid breaking projects in mismatching releases.

## 1.1.0

### Minor Changes

-   [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Initial beta release of refine devtools.🎉

    We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

    ![refine devtools gif](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

    ## Usage

    Install the dependencies using your package manager.

    ```bash
    npm i @refinedev/devtools@latest @refinedev/cli@latest
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
    -   @refinedev/devtools-shared@1.1.0

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
