# @refinedev/devtools

## 1.1.10

### Patch Changes

-   [#26](https://github.com/TheRakeshPurohit/refine/pull/26) [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17) Thanks [@pull](https://github.com/apps/pull)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

-   Updated dependencies [[`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17), [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17)]:
    -   @refinedev/cli@2.16.4
    -   @refinedev/devtools-server@1.1.9

## 1.1.9

### Patch Changes

-   [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

-   Updated dependencies [[`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b), [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
    -   @refinedev/cli@2.16.3
    -   @refinedev/devtools-server@1.1.8

## 1.1.8

### Patch Changes

-   [#5056](https://github.com/refinedev/refine/pull/5056) [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8) Thanks [@aliemir](https://github.com/aliemir)! - Use the proper devtools url coming from the websocket handshake rather than using the hardcoded port.

-   Updated dependencies [[`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b), [`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
    -   @refinedev/cli@2.16.2
    -   @refinedev/devtools-server@1.1.7

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
