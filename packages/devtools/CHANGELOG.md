# @refinedev/devtools

## 1.1.4

### Patch Changes

-   [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the versions of the dependencies:

    -   `@refinedev/devtools-shared`
    -   `@refinedev/devtools-server` (peer)
    -   `@refinedev/cli` (peer)
    -   `@refinedev/core` (peer)

    to avoid breaking the projects due to mismatching releases.

-   Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
    -   @refinedev/cli@2.15.4
    -   @refinedev/devtools-server@1.1.4

## 1.1.3

### Patch Changes

-   [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the versions of the dependencies:

    -   `@refinedev/devtools-shared`
    -   `@refinedev/devtools-server` (peer)
    -   `@refinedev/cli` (peer)
    -   `@refinedev/core` (peer)

    to avoid breaking the projects due to mismatching releases.

-   Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94), [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
    -   @refinedev/cli@2.15.3
    -   @refinedev/devtools-server@1.1.3

![refine devtools](https://github.com/refinedev/refine/assets/1110414/15ed6907-d0c8-4213-9024-2f6b0a09968f)

## 1.0.0

### Major Changes

-   [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Initial beta release of refine devtools.🎉

    We're releasing refine devtools in beta. refine devtools is designed to help you debug and develop your refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating refine packages from the UI and more. 🤯

    ## Usage

    Install latest version of `@refinedev/cli`:

    ```bash
    npm install @refinedev/cli@latest
    ```

    > 🚨 If you don't have `@refinedev/cli` installed already, you can follow the [installation guide](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project) to add it to your project.

    Install `@refinedev/devtools` with `@refinedev/cli`

    ```bash
    npm run refine devtools init
    ```

    ![devtools-install](https://github.com/refinedev/refine/assets/23058882/7d7341cc-1edd-4cf3-b330-1796c6a8afc5)

    Ta-da! 🎉 Everything is ready now, you can use the refine devtools in your project! 🕶

    > Devtools only works in development mode and have no overhead on production builds. You don't need to do anything special to exclude DevTools from your bundle.
