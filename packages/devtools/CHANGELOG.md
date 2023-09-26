# @refinedev/devtools

## 1.1.5

### Patch Changes

-   [#5013](https://github.com/refinedev/refine/pull/5013) [`fdd6ce6ce81`](https://github.com/refinedev/refine/commit/fdd6ce6ce81cac9fbe8ce48aab7449c1e9ff12b3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: devtools button and selector tooltip styles updated

-   [#5016](https://github.com/refinedev/refine/pull/5016) [`d144915cec3`](https://github.com/refinedev/refine/commit/d144915cec3114baeba8041184df6def555bdda2) Thanks [@aliemir](https://github.com/aliemir)! - Update `@aliemir/dom-to-fiber-utils` to latest version to fix issue with selecting elements in the DOM tree that are not handled by React Fiber.

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
