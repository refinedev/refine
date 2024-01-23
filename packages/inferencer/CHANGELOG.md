# @refinedev/mantine

## 4.5.17

### Patch Changes

-   [#5373](https://github.com/refinedev/refine/pull/5373) [`dff476ca41`](https://github.com/refinedev/refine/commit/dff476ca4193fdfa35b73deafa58e75334de9af1) Thanks [@aliemir](https://github.com/aliemir)! - Show and List type inferencers were failing to provide a preview when there's a relational property without a presentational key. Updated generated code blocks to handle fields with no accessor keys and display a placeholder message instead. Fixes #5184

-   [#5373](https://github.com/refinedev/refine/pull/5373) [`dff476ca41`](https://github.com/refinedev/refine/commit/dff476ca4193fdfa35b73deafa58e75334de9af1) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the issue of wrongfully assuming `id` key of relational fields in Chakra UI and Headless edit inferencers. Fixes #5274

-   [#5373](https://github.com/refinedev/refine/pull/5373) [`dff476ca41`](https://github.com/refinedev/refine/commit/dff476ca4193fdfa35b73deafa58e75334de9af1) Thanks [@aliemir](https://github.com/aliemir)! - Even though `id` is required for Refine to work properly, in some list queries there may not be an `id` field. Material UI Datagrid requires an identifier for each row, if there's no `id` field, we're fallbacking to the first key of the row. Fixes the errors thrown for this case in Material UI List inferencers.

-   [#5373](https://github.com/refinedev/refine/pull/5373) [`dff476ca41`](https://github.com/refinedev/refine/commit/dff476ca4193fdfa35b73deafa58e75334de9af1) Thanks [@aliemir](https://github.com/aliemir)! - Updated the object field inferencer to check for fields end with `name` and `label` and use them as the display name for the field. Previously the check was done for a predefined set of properties, now it's done for any property that ends with `name` or `label` which results with more accurate code generation.

-   Updated dependencies [[`75bb61dd3b`](https://github.com/refinedev/refine/commit/75bb61dd3b781e69f198f4e928ccffddb997fdc5), [`93e00fd770`](https://github.com/refinedev/refine/commit/93e00fd7701bce9e7201d04a6dd8f1419baeb68d), [`e5888b6b9c`](https://github.com/refinedev/refine/commit/e5888b6b9c9cc41546152f5b4d9adaf4405aa51c), [`b621223bfb`](https://github.com/refinedev/refine/commit/b621223bfbc2bed569e41766f60b9687ddba9013), [`19ceffbe9f`](https://github.com/refinedev/refine/commit/19ceffbe9f217fd354207b96610c25e8a7f3dcf3)]:
    -   @refinedev/core@4.46.2

## 4.5.16

### Patch Changes

-   [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 4.5.15

### Patch Changes

-   [#5335](https://github.com/refinedev/refine/pull/5335) [`9321a02a8f`](https://github.com/refinedev/refine/commit/9321a02a8f909d933088374d33a486bb9330512e) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: Material UI snapshots tests.

-   Updated dependencies [[`17aa8c1cd6`](https://github.com/refinedev/refine/commit/17aa8c1cd6858c5a2b0c996c97230047e049bf3b), [`dd8f1270f6`](https://github.com/refinedev/refine/commit/dd8f1270f692d1eec279973e53fcc5a7e650b983), [`4c49ef0a06`](https://github.com/refinedev/refine/commit/4c49ef0a0660c2941c983025a187d45b521aa27c), [`3bdb9cb1cb`](https://github.com/refinedev/refine/commit/3bdb9cb1cb4cdcfaf363e7e9938737ed6f8e634e), [`f8e407f850`](https://github.com/refinedev/refine/commit/f8e407f85054bccf1e6ff45c84928bc01db7f5eb)]:
    -   @refinedev/core@4.46.0

## 4.5.14

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

-   Updated dependencies []:
    -   @refinedev/core@4.42.4

## 4.5.13

### Patch Changes

-   [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

    -   fix grammar errors.
    -   make all README.md files consistent.
    -   add code example code snippets.

-   Updated dependencies []:
    -   @refinedev/core@4.42.3

## 4.5.12

### Patch Changes

-   [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

-   Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
    -   @refinedev/core@4.42.0

## 4.5.11

### Patch Changes

-   [#4975](https://github.com/refinedev/refine/pull/4975) [`ff66a862e46`](https://github.com/refinedev/refine/commit/ff66a862e46d3ae89c2f848ba71f2d8d77650d6a) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@tabler/icons` to `v1.119.0` to fix the issue of using misconfigured versions. (Fixes #4921)

## 4.5.10

### Patch Changes

-   [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 4.5.9

### Patch Changes

-   [#4964](https://github.com/refinedev/refine/pull/4964) [`85b1ac0db5f`](https://github.com/refinedev/refine/commit/85b1ac0db5f8e61c7a78137aed0adf4bf2871848) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update @refinedev/core peer dependency versions.

## 4.5.8

### Patch Changes

-   [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
    -   Fix the lodash replacement plugin to skip redundant files.
-   Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
    -   @refinedev/core@4.38.4

## 4.5.7

### Patch Changes

-   [#4951](https://github.com/refinedev/refine/pull/4951) [`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea) Thanks [@aliemir](https://github.com/aliemir)! - - Update build configuration for `esbuild` to use the shared plugins.
    -   Fix the lodash replacement plugin to skip redundant files.
-   Updated dependencies [[`04837c62077`](https://github.com/refinedev/refine/commit/04837c6207758a7460cfb7a5aff2a104967e20ea)]:
    -   @refinedev/core@4.38.3

## 4.5.6

### Patch Changes

-   [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

-   Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
    -   @refinedev/core@4.38.2

## 4.5.5

### Patch Changes

-   [#4948](https://github.com/refinedev/refine/pull/4948) [`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4) Thanks [@aliemir](https://github.com/aliemir)! - Keep the hook and component names in builds for better debugging.

-   Updated dependencies [[`8e5efffbb23`](https://github.com/refinedev/refine/commit/8e5efffbb231bc3163c56f8e823ccb649755a9d4)]:
    -   @refinedev/core@4.38.1

## 4.5.4

### Patch Changes

-   [#4797](https://github.com/refinedev/refine/pull/4797) [`a680aea865b`](https://github.com/refinedev/refine/commit/a680aea865bff11c4b52f2aecbb2a51c769a1599) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: relation fields are not correctly inferred for `show` views

    Shows `title` for `category` without using the `useOne` hook when showing the `category` key.

    ```
    {
        "title": "My title",
        "description": "My description",
        "category": {
            "id": 1,
            "name": "My category"
        }
    }
    ```

## 4.5.3

### Patch Changes

-   [#4797](https://github.com/refinedev/refine/pull/4797) [`a680aea865b`](https://github.com/refinedev/refine/commit/a680aea865bff11c4b52f2aecbb2a51c769a1599) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: relation fields are not correctly inferred for `show` views

    Shows `title` for `category` without using the `useOne` hook when showing the `category` key.

    ```
    {
        "title": "My title",
        "description": "My description",
        "category": {
            "id": 1,
            "name": "My category"
        }
    }
    ```

## 4.5.2

### Patch Changes

-   [#4774](https://github.com/refinedev/refine/pull/4774) [`030a9dda75a`](https://github.com/refinedev/refine/commit/030a9dda75a7903e3c9ce3233e3b570b7cbe2dab) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: unlock and upgrade `@mui/material` to `^5.14.2`

-   Updated dependencies [[`e3e38de4114`](https://github.com/refinedev/refine/commit/e3e38de4114209fe43fe35ac3622d44e355694bd)]:
    -   @refinedev/core@4.32.2

## 4.5.1

### Patch Changes

-   [#4774](https://github.com/refinedev/refine/pull/4774) [`030a9dda75a`](https://github.com/refinedev/refine/commit/030a9dda75a7903e3c9ce3233e3b570b7cbe2dab) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: unlock and upgrade `@mui/material` to `^5.14.2`

-   Updated dependencies [[`e3e38de4114`](https://github.com/refinedev/refine/commit/e3e38de4114209fe43fe35ac3622d44e355694bd)]:
    -   @refinedev/core@4.32.1

## 4.5.0

### Minor Changes

-   [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

-   Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
    -   @refinedev/core@4.32.0

## 4.4.0

### Minor Changes

-   [#4741](https://github.com/refinedev/refine/pull/4741) [`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1) Thanks [@aliemir](https://github.com/aliemir)! - Added `sideEffects: false` to `package.json` to help bundlers tree-shake unused code.

### Patch Changes

-   Updated dependencies [[`026ccf34356`](https://github.com/refinedev/refine/commit/026ccf34356bc621183894c0ee4518a6645369d1)]:
    -   @refinedev/core@4.31.0

## 4.3.4

### Patch Changes

-   [#4717](https://github.com/refinedev/refine/pull/4717) [`c1c10e5d7bd`](https://github.com/refinedev/refine/commit/c1c10e5d7bdd492ebb3a9ed969961e8f0db94206) Thanks [@aliemir](https://github.com/aliemir)! - Added a classname to the inferencer's code viewer component to determine a simple selector for the code viewer.

## 4.3.3

### Patch Changes

-   [#4717](https://github.com/refinedev/refine/pull/4717) [`c1c10e5d7bd`](https://github.com/refinedev/refine/commit/c1c10e5d7bdd492ebb3a9ed969961e8f0db94206) Thanks [@aliemir](https://github.com/aliemir)! - Added a classname to the inferencer's code viewer component to determine a simple selector for the code viewer.

## 4.3.2

### Patch Changes

-   [#4634](https://github.com/refinedev/refine/pull/4634) [`5de50a6af75`](https://github.com/refinedev/refine/commit/5de50a6af75475fbdb46b7b72484fd01f708f33a) Thanks [@aliemir](https://github.com/aliemir)! - Added an additional info log and a link to the documentation into the inferencer components after relation requests are made.

-   Updated dependencies [[`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9)]:
    -   @refinedev/core@4.26.4

## 4.3.1

### Patch Changes

-   [#4634](https://github.com/refinedev/refine/pull/4634) [`5de50a6af75`](https://github.com/refinedev/refine/commit/5de50a6af75475fbdb46b7b72484fd01f708f33a) Thanks [@aliemir](https://github.com/aliemir)! - Added an additional info log and a link to the documentation into the inferencer components after relation requests are made.

-   Updated dependencies [[`03597ed8a9a`](https://github.com/refinedev/refine/commit/03597ed8a9ad1bd2a6d51e6d7181de76b16c38f9)]:
    -   @refinedev/core@4.26.3

## 4.3.0

### Minor Changes

-   [#4582](https://github.com/refinedev/refine/pull/4582) [`2edadc3a2aa`](https://github.com/refinedev/refine/commit/2edadc3a2aa46f193179279e29f0625b3287191f) Thanks [@rasitcolakel](https://github.com/rasitcolakel)! - fix: added predefined relationInfer control

### Patch Changes

-   [#4601](https://github.com/refinedev/refine/pull/4601) [`090653717d6`](https://github.com/refinedev/refine/commit/090653717d6356cd67a27bb6e5b0ec51e87315cf) Thanks [@aliemir](https://github.com/aliemir)! - Updated inferencer functions to check for relational fields with representable values. If the inferencer type is `show` or `list`, the inferencer will use the available properties to show the field instead of trying to fetch the relational data.

    ```tsx
    // posts/1
    {
        id: 1,
        name: "Post 1",
        tags: [
            {
                id: 5,
                name: "Tag 5"
            },
            {
                id: 6,
                name: "Tag 6"
            }
        ],
        content: "...",
    }
    ```

    Above structure will show the `tags` field in list and show inferencers using the `name` property instead of trying to fetch the relational data. But `edit` and `create` inferencers will still work with the relational data.

-   Updated dependencies [[`c3c0deed564`](https://github.com/refinedev/refine/commit/c3c0deed564bdbded58c615357a55e666473923a), [`8c2b3be35b0`](https://github.com/refinedev/refine/commit/8c2b3be35b0132fc9a7b79287d281a9f922424d0), [`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5)]:
    -   @refinedev/core@4.26.0

## 4.2.0

### Minor Changes

-   [#4582](https://github.com/refinedev/refine/pull/4582) [`2edadc3a2aa`](https://github.com/refinedev/refine/commit/2edadc3a2aa46f193179279e29f0625b3287191f) Thanks [@rasitcolakel](https://github.com/rasitcolakel)! - fix: added predefined relationInfer control

### Patch Changes

-   [#4601](https://github.com/refinedev/refine/pull/4601) [`090653717d6`](https://github.com/refinedev/refine/commit/090653717d6356cd67a27bb6e5b0ec51e87315cf) Thanks [@aliemir](https://github.com/aliemir)! - Updated inferencer functions to check for relational fields with representable values. If the inferencer type is `show` or `list`, the inferencer will use the available properties to show the field instead of trying to fetch the relational data.

    ```tsx
    // posts/1
    {
        id: 1,
        name: "Post 1",
        tags: [
            {
                id: 5,
                name: "Tag 5"
            },
            {
                id: 6,
                name: "Tag 6"
            }
        ],
        content: "...",
    }
    ```

    Above structure will show the `tags` field in list and show inferencers using the `name` property instead of trying to fetch the relational data. But `edit` and `create` inferencers will still work with the relational data.

-   Updated dependencies [[`5bb6f47a4d4`](https://github.com/refinedev/refine/commit/5bb6f47a4d4e29a7de5426879754fcd78e3fa4d5)]:
    -   @refinedev/core@4.25.1

## 4.1.4

### Patch Changes

-   [#4561](https://github.com/refinedev/refine/pull/4561) [`9812a3d874a`](https://github.com/refinedev/refine/commit/9812a3d874ad7c7246d10ae1ff994201c822b655) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: select current value on `<Select>` component for `Chakra-UI` and `headless`

-   Updated dependencies [[`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42), [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf)]:
    -   @refinedev/core@4.24.0

## 4.1.3

### Patch Changes

-   [#4561](https://github.com/refinedev/refine/pull/4561) [`9812a3d874a`](https://github.com/refinedev/refine/commit/9812a3d874ad7c7246d10ae1ff994201c822b655) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: select current value on `<Select>` component for `Chakra-UI` and `headless`

-   Updated dependencies [[`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf), [`ceadcd29fc9`](https://github.com/refinedev/refine/commit/ceadcd29fc9e42c875a4b0a78622e9fc14b4ce42), [`18d446b1069`](https://github.com/refinedev/refine/commit/18d446b1069c75b5033d0ce8defcb8c32fcce5cf)]:
    -   @refinedev/core@4.23.0

## 4.1.2

### Patch Changes

-   [#4499](https://github.com/refinedev/refine/pull/4499) [`b120a0394f8`](https://github.com/refinedev/refine/commit/b120a0394f89474e5d2c0c085dadf264a36e6607) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: show code button for inferencers was not visible in smaller screens.

## 4.1.1

### Patch Changes

-   [#4499](https://github.com/refinedev/refine/pull/4499) [`b120a0394f8`](https://github.com/refinedev/refine/commit/b120a0394f89474e5d2c0c085dadf264a36e6607) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: show code button for inferencers was not visible in smaller screens.

## 4.1.0

### Minor Changes

-   [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - According to the changes made in `@refinedev/mui` to support the latest version of the `@mui/x-data-grid` package, we've updated the `@refinedev/inferencer` package to support the changes in the generated codes. While the usage of the components did not change, the generated code in Material UI inferencer components have changed.

    **Breaking Changes**

    With this release, the peer dependency of `@refinedev/mui` is updated to `^5.0.0` and the peer dependency of `@mui/x-data-grid` is updated to `^6.6.0`.

### Patch Changes

-   [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `ListInferencer` logic to check for `canDelete` property in resource definitions to decide whether to include `DeleteButton` in the actions column of the `List` view or not.

-   Updated dependencies [[`c82006f712a`](https://github.com/refinedev/refine/commit/c82006f712a875b1af308fec66e4e1187cdd9c0c)]:
    -   @refinedev/core@4.20.0

## 4.0.0

### Major Changes

-   [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - According to the changes made in `@refinedev/mui` to support the latest version of the `@mui/x-data-grid` package, we've updated the `@refinedev/inferencer` package to support the changes in the generated codes. While the usage of the components did not change, the generated code in Material UI inferencer components have changed.

    **Breaking Changes**

    With this release, the peer dependency of `@refinedev/mui` is updated to `^5.0.0` and the peer dependency of `@mui/x-data-grid` is updated to `^6.6.0`.

### Patch Changes

-   [#4454](https://github.com/refinedev/refine/pull/4454) [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0) Thanks [@aliemir](https://github.com/aliemir)! - Updated the `ListInferencer` logic to check for `canDelete` property in resource definitions to decide whether to include `DeleteButton` in the actions column of the `List` view or not.

-   Updated dependencies [[`c82006f712a`](https://github.com/refinedev/refine/commit/c82006f712a875b1af308fec66e4e1187cdd9c0c), [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0), [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0), [`4bae8add99f`](https://github.com/refinedev/refine/commit/4bae8add99fa4717fb205263a5550cc0fcfe30c0)]:
    -   @refinedev/core@4.19.0
    -   @refinedev/mui@5.0.0

## 3.5.8

### Patch Changes

-   [#4427](https://github.com/refinedev/refine/pull/4427) [`b4298166b6f`](https://github.com/refinedev/refine/commit/b4298166b6f3f4260129c0171891f9203e3d4183) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Inferencer assumes `id` is number in custom pages.
    From now on, if `id` is `typeof string`, and `inferencer` will infer it as `string`.
-   Updated dependencies [[`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527), [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f), [`0602f4cdf1c`](https://github.com/refinedev/refine/commit/0602f4cdf1c38f2b9dea8a293680a1872f4a448d), [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527)]:
    -   @refinedev/core@4.18.0

## 3.5.7

### Patch Changes

-   [#4427](https://github.com/refinedev/refine/pull/4427) [`b4298166b6f`](https://github.com/refinedev/refine/commit/b4298166b6f3f4260129c0171891f9203e3d4183) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: Inferencer assumes `id` is number in custom pages.
    From now on, if `id` is `typeof string`, and `inferencer` will infer it as `string`.
-   Updated dependencies [[`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527), [`c29a3618cf6`](https://github.com/refinedev/refine/commit/c29a3618cf6b577c36e90ec514f3a691c87aad8f), [`0602f4cdf1c`](https://github.com/refinedev/refine/commit/0602f4cdf1c38f2b9dea8a293680a1872f4a448d), [`cf07d59587f`](https://github.com/refinedev/refine/commit/cf07d59587fae2adce97a79b40fdb60b9d9a9527)]:
    -   @refinedev/core@4.17.0

## 3.5.6

### Patch Changes

-   [#4402](https://github.com/refinedev/refine/pull/4402) [`4c41be2a2ae`](https://github.com/refinedev/refine/commit/4c41be2a2ae294cb5a7e18754c63b0c0c504300d) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `translate` function dependency to the table hooks if `i18n` is enabled.

-   Updated dependencies [[`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389), [`473bbe5b31d`](https://github.com/refinedev/refine/commit/473bbe5b31de91f338733aeb34571dba8e44e389)]:
    -   @refinedev/core@4.16.2

## 3.5.5

### Patch Changes

-   [#4402](https://github.com/refinedev/refine/pull/4402) [`4c41be2a2ae`](https://github.com/refinedev/refine/commit/4c41be2a2ae294cb5a7e18754c63b0c0c504300d) Thanks [@aliemir](https://github.com/aliemir)! - Added missing `translate` function dependency to the table hooks if `i18n` is enabled.

## 3.5.4

### Patch Changes

-   [#4398](https://github.com/refinedev/refine/pull/4398) [`8a424c227a8`](https://github.com/refinedev/refine/commit/8a424c227a8c14d5a1d227bf50b96af1f625cc82) Thanks [@aliemir](https://github.com/aliemir)! - Updated the type imports in the files to get the `tsc` working for the type definitions in the `dist` folder. This will fix the issue with the components not being properly typed in user projects.

## 3.5.3

### Patch Changes

-   [#4398](https://github.com/refinedev/refine/pull/4398) [`8a424c227a8`](https://github.com/refinedev/refine/commit/8a424c227a8c14d5a1d227bf50b96af1f625cc82) Thanks [@aliemir](https://github.com/aliemir)! - Updated the type imports in the files to get the `tsc` working for the type definitions in the `dist` folder. This will fix the issue with the components not being properly typed in user projects.

## 3.5.2

### Patch Changes

-   [#4381](https://github.com/refinedev/refine/pull/4381) [`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: support i18n

    Supports i18n if [`i18nProvider`](https://refine.dev/docs/api-reference/core/providers/i18n-provider/) is defined.

-   Updated dependencies [[`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873), [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657)]:
    -   @refinedev/core@4.16.0

## 3.5.1

### Patch Changes

-   [#4381](https://github.com/refinedev/refine/pull/4381) [`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: support i18n

    Supports i18n if [`i18nProvider`](https://refine.dev/docs/api-reference/core/providers/i18n-provider/) is defined.

-   Updated dependencies [[`500cf2becc2`](https://github.com/refinedev/refine/commit/500cf2becc242e01d93a5576957f003851190873), [`28fe67047a0`](https://github.com/refinedev/refine/commit/28fe67047a084dff37fbdbee6a132f85f9413657)]:
    -   @refinedev/core@4.15.0

## 3.5.0

### Minor Changes

-   [#4382](https://github.com/refinedev/refine/pull/4382) [`83ff1076f5c`](https://github.com/refinedev/refine/commit/83ff1076f5c25257b4a8a0c7f3695eab046be452) Thanks [@aliemir](https://github.com/aliemir)! - Updated the inference process for `list` and `create` actions to use all items in the list instead of just the first item. This is done to avoid breaking the output when a single record is corrupted or wrongfully inferred.

    Now, for the `list` and `create` actions, each item in the list response will be used to infer the fields then the most repeated fields will be accepted as the type for the field.

### Patch Changes

-   [#4383](https://github.com/refinedev/refine/pull/4383) [`8b3137e9e9d`](https://github.com/refinedev/refine/commit/8b3137e9e9ddeb81ed10c77327662f52f87d19da) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the code generation issue with Mantine's `create` and `edit` inferencers when used with `meta` values.

## 3.4.0

### Minor Changes

-   [#4382](https://github.com/refinedev/refine/pull/4382) [`83ff1076f5c`](https://github.com/refinedev/refine/commit/83ff1076f5c25257b4a8a0c7f3695eab046be452) Thanks [@aliemir](https://github.com/aliemir)! - Updated the inference process for `list` and `create` actions to use all items in the list instead of just the first item. This is done to avoid breaking the output when a single record is corrupted or wrongfully inferred.

    Now, for the `list` and `create` actions, each item in the list response will be used to infer the fields then the most repeated fields will be accepted as the type for the field.

### Patch Changes

-   [#4383](https://github.com/refinedev/refine/pull/4383) [`8b3137e9e9d`](https://github.com/refinedev/refine/commit/8b3137e9e9ddeb81ed10c77327662f52f87d19da) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the code generation issue with Mantine's `create` and `edit` inferencers when used with `meta` values.

## 3.3.6

### Patch Changes

-   [#4355](https://github.com/refinedev/refine/pull/4355) [`bf4011f1d00`](https://github.com/refinedev/refine/commit/bf4011f1d00b6b5ce85f9cd67d58afb78fc9c924) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@mui/material` and `@mui/icons-material` imports to use subpath imports.

## 3.3.5

### Patch Changes

-   [#4355](https://github.com/refinedev/refine/pull/4355) [`bf4011f1d00`](https://github.com/refinedev/refine/commit/bf4011f1d00b6b5ce85f9cd67d58afb78fc9c924) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@mui/material` and `@mui/icons-material` imports to use subpath imports.

## 3.3.4

### Patch Changes

-   [#4293](https://github.com/refinedev/refine/pull/4293) [`7fa008b7ff7`](https://github.com/refinedev/refine/commit/7fa008b7ff7a46d34bbd513f1ac654ccebed9cf3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: minimized the packages scope

## 3.3.3

### Patch Changes

-   [#4293](https://github.com/refinedev/refine/pull/4293) [`7fa008b7ff7`](https://github.com/refinedev/refine/commit/7fa008b7ff7a46d34bbd513f1ac654ccebed9cf3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - refactor: minimized the packages scope

## 3.3.2

### Patch Changes

-   [#4265](https://github.com/refinedev/refine/pull/4265) [`ff43684f787`](https://github.com/refinedev/refine/commit/ff43684f787880d120a66d5747bb3e4cbade5ea6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed an issue that caused the duplicate field error

## 3.3.1

### Patch Changes

-   [#4265](https://github.com/refinedev/refine/pull/4265) [`ff43684f787`](https://github.com/refinedev/refine/commit/ff43684f787880d120a66d5747bb3e4cbade5ea6) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: fixed an issue that caused the duplicate field error

## 3.3.0

### Minor Changes

-   [#4141](https://github.com/refinedev/refine/pull/4141) [`e7188abba8b`](https://github.com/refinedev/refine/commit/e7188abba8baa8d19c93496fe0deb724bd492406) Thanks [@aliemir](https://github.com/aliemir)! - ## `meta` property for inferencer components

    Added `meta` property to the inferencer components. This allows you to pass `meta` to the data hooks included in the inferencer's generated code. This is useful when your data provider relies on the `meta` property which made `@refinedev/inferencer` unusable before. Now you will be able to pass `meta` properties and generate code that will work with your data provider.

    `meta` property of the inferencer components has a nested structure unlike the rest of the refine codebase. This is because the inferencer components are designed to infer the relational data as well which may require different `meta` values for each of their methods (such as `getList` and `getOne`).

    ### Type

    ```tsx
    <AntdListInferencer
        meta={{
            [resourceNameOrIdentifier: string]: {
                [methodName: "default" | "getList" | "getMany" | "getOne" | "update"]: Record<string, unknown>,
            }
        }}
    />
    ```

    `default` is the default `meta` value for all the methods. In the absence of a specific `meta` value for a method for a resource, the `default` value will be used.

    ### Example Usage

    ```tsx
    <AntdListInferencer
        meta={{
            posts: {
                getList: {
                    fields: [
                        "id",
                        "title",
                        "content",
                        "category_id",
                        "created_at",
                    ],
                },
            },
            categories: {
                default: {
                    fields: ["id", "title"],
                },
            },
        }}
    />
    ```

    ## Using the appropriate method to infer the relational data

    The inferencer components were using the `getOne` method of the data providers to infer the relational field data in a record. This has a chance of breaking the generated code and the preview if the data provider implements a `getMany` and `getOne` in a different manner which may not be compatible with each other.

    In the generated code, fields with multiple values are handled via `useMany` hook but the inference was using the `getOne` method regardless of the field's cardinality. This has been fixed and the inferencer components will now use the `getMany` method for fields with multiple values and `getOne` method for fields with single values.

    ## Redesigned code viewer components

    Updated the code viewers components and the bottom buttons and unified the design. The code viewers now use the same components.

    ## Sortable actions in Material UI list inferencer

    Fixed the actions column in the Material UI list inferencer to be sortable.

    ## Repeated relational fields

    Added a check for repeated relational fields and excluded the duplicate fields from the generated code according to the context of the inferencer. In `list` and `show` actions fields with displayable values are preferred over the fields with relational values. In `edit` and `create` actions, fields with relational values are preferred over the fields with displayable values.

    For example, if a `posts` resource item has both `category_id` (`number` or `string`) and `category` (record with key `title` and `id`) fields. The `list` and `show` actions will use the `category` field and the `edit` and `create` actions will use the `category_id` field.

    ## Ability to hide code viewer in production

    Added an option `hideCodeViewerInProduction` to hide code viewer components in production environments. This is added for presentational purposes and keep in mind that the Inferencer components are not meant for production use and may generate broken code.

## 3.2.0

### Minor Changes

-   [#4141](https://github.com/refinedev/refine/pull/4141) [`e7188abba8b`](https://github.com/refinedev/refine/commit/e7188abba8baa8d19c93496fe0deb724bd492406) Thanks [@aliemir](https://github.com/aliemir)! - ## `meta` property for inferencer components

    Added `meta` property to the inferencer components. This allows you to pass `meta` to the data hooks included in the inferencer's generated code. This is useful when your data provider relies on the `meta` property which made `@refinedev/inferencer` unusable before. Now you will be able to pass `meta` properties and generate code that will work with your data provider.

    `meta` property of the inferencer components has a nested structure unlike the rest of the refine codebase. This is because the inferencer components are designed to infer the relational data as well which may require different `meta` values for each of their methods (such as `getList` and `getOne`).

    ### Type

    ```tsx
    <AntdListInferencer
        meta={{
            [resourceNameOrIdentifier: string]: {
                [methodName: "default" | "getList" | "getMany" | "getOne" | "update"]: Record<string, unknown>,
            }
        }}
    />
    ```

    `default` is the default `meta` value for all the methods. In the absence of a specific `meta` value for a method for a resource, the `default` value will be used.

    ### Example Usage

    ```tsx
    <AntdListInferencer
        meta={{
            posts: {
                getList: {
                    fields: [
                        "id",
                        "title",
                        "content",
                        "category_id",
                        "created_at",
                    ],
                },
            },
            categories: {
                default: {
                    fields: ["id", "title"],
                },
            },
        }}
    />
    ```

    ## Using the appropriate method to infer the relational data

    The inferencer components were using the `getOne` method of the data providers to infer the relational field data in a record. This has a chance of breaking the generated code and the preview if the data provider implements a `getMany` and `getOne` in a different manner which may not be compatible with each other.

    In the generated code, fields with multiple values are handled via `useMany` hook but the inference was using the `getOne` method regardless of the field's cardinality. This has been fixed and the inferencer components will now use the `getMany` method for fields with multiple values and `getOne` method for fields with single values.

    ## Redesigned code viewer components

    Updated the code viewers components and the bottom buttons and unified the design. The code viewers now use the same components.

    ## Sortable actions in Material UI list inferencer

    Fixed the actions column in the Material UI list inferencer to be sortable.

    ## Repeated relational fields

    Added a check for repeated relational fields and excluded the duplicate fields from the generated code according to the context of the inferencer. In `list` and `show` actions fields with displayable values are preferred over the fields with relational values. In `edit` and `create` actions, fields with relational values are preferred over the fields with displayable values.

    For example, if a `posts` resource item has both `category_id` (`number` or `string`) and `category` (record with key `title` and `id`) fields. The `list` and `show` actions will use the `category` field and the `edit` and `create` actions will use the `category_id` field.

    ## Ability to hide code viewer in production

    Added an option `hideCodeViewerInProduction` to hide code viewer components in production environments. This is added for presentational purposes and keep in mind that the Inferencer components are not meant for production use and may generate broken code.

## 3.1.7

### Patch Changes

-   [#4093](https://github.com/refinedev/refine/pull/4093) [`c6637089837`](https://github.com/refinedev/refine/commit/c6637089837dfc0e27629afa763e4a8d2b6847c8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed the warning about using the `isOptionEqualToValue` props of the `Autocomplete` component.

## 3.1.6

### Patch Changes

-   [#4092](https://github.com/refinedev/refine/pull/4092) [`f973878dc47`](https://github.com/refinedev/refine/commit/f973878dc47b4d27293df96f6cdea3d1f81ae420) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fix the wrong import path for Mui `Checkbox` component.

## 3.1.5

### Patch Changes

-   [#4092](https://github.com/refinedev/refine/pull/4092) [`f973878dc47`](https://github.com/refinedev/refine/commit/f973878dc47b4d27293df96f6cdea3d1f81ae420) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fix the wrong import path for Mui `Checkbox` component.

## 3.1.4

### Patch Changes

-   [#4025](https://github.com/refinedev/refine/pull/4025) [`a82937e9296`](https://github.com/refinedev/refine/commit/a82937e92961f380c85e62d7edf327c8f2a9e18d) Thanks [@aliemir](https://github.com/aliemir)! - Fix wrong resource data usage and key conflicts on route change.

## 3.1.3

### Patch Changes

-   [#4025](https://github.com/refinedev/refine/pull/4025) [`a82937e9296`](https://github.com/refinedev/refine/commit/a82937e92961f380c85e62d7edf327c8f2a9e18d) Thanks [@aliemir](https://github.com/aliemir)! - Fix wrong resource data usage and key conflicts on route change.

## 3.1.2

### Patch Changes

-   [#3871](https://github.com/refinedev/refine/pull/3871) [`2a0cb4ed5a0`](https://github.com/refinedev/refine/commit/2a0cb4ed5a0f065a5dccba50fc7abecfa1167682) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: wrong import for controller

-   Updated dependencies [[`5ed083a8050`](https://github.com/refinedev/refine/commit/5ed083a805082f2c24c3afe0eb285c8f8485e3df)]:
    -   @refinedev/core@4.1.2

## 3.1.1

### Patch Changes

-   [#3871](https://github.com/refinedev/refine/pull/3871) [`2a0cb4ed5a0`](https://github.com/refinedev/refine/commit/2a0cb4ed5a0f065a5dccba50fc7abecfa1167682) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: wrong import for controller

-   Updated dependencies [[`5ed083a8050`](https://github.com/refinedev/refine/commit/5ed083a805082f2c24c3afe0eb285c8f8485e3df)]:
    -   @refinedev/core@4.1.1

## 3.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Inferecer uses the resource `meta` instead of `options` to pick which data provider to use. If `meta` is not defined, it will use `options` as fallback.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Upgrade `@ant-design/icons` to `^5.0.1` for consistency.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `AuthProvider` is renamed to `LegacyAuthProvider` with refine@4. Components and functions are updated to support `LegacyAuthProvider`.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 2.10.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-core@3.103.0

## 2.9.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-core@3.102.0

## 2.8.2

### Patch Changes

-   [#3636](https://github.com/refinedev/refine/pull/3636) [`f4f4c38a0ea`](https://github.com/refinedev/refine/commit/f4f4c38a0eacb37b1130ffc0a4717ee5f2003475) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Updated date inferencer to check existence of date separators.

## 2.8.1

### Patch Changes

-   [#3636](https://github.com/refinedev/refine/pull/3636) [`f4f4c38a0ea`](https://github.com/refinedev/refine/commit/f4f4c38a0eacb37b1130ffc0a4717ee5f2003475) Thanks [@BatuhanW](https://github.com/BatuhanW)! - Updated date inferencer to check existence of date separators.

## 2.8.0

### Minor Changes

-   [#3622](https://github.com/refinedev/refine/pull/3622) [`499e9ccc2f6`](https://github.com/refinedev/refine/commit/499e9ccc2f6d8f2404d1515841cd26a299b64426) Thanks [@aliemir](https://github.com/aliemir)! - Additional checks are added for `number` field types. Now, number check still works if the field value is a string.

## 2.7.0

### Minor Changes

-   [#3622](https://github.com/refinedev/refine/pull/3622) [`499e9ccc2f6`](https://github.com/refinedev/refine/commit/499e9ccc2f6d8f2404d1515841cd26a299b64426) Thanks [@aliemir](https://github.com/aliemir)! - Additional checks are added for `number` field types. Now, number check still works if the field value is a string.

## 2.6.0

### Minor Changes

-   [#3600](https://github.com/refinedev/refine/pull/3600) [`c733eeb7449`](https://github.com/refinedev/refine/commit/c733eeb7449bc8235a99eba428730a99c0b29484) Thanks [@aliemir](https://github.com/aliemir)! - Updated Error components of inferencer to reflect the errors in a more descriptive way. #3596

### Patch Changes

-   [#3592](https://github.com/refinedev/refine/pull/3592) [`ea015a22797`](https://github.com/refinedev/refine/commit/ea015a22797127ddd5f87c4d2476e0948c7d0e7e) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the syntax error at `MuiListInferencer` in `@pankod/refine-inferencer/mui`

## 2.5.0

### Minor Changes

-   [#3600](https://github.com/refinedev/refine/pull/3600) [`c733eeb7449`](https://github.com/refinedev/refine/commit/c733eeb7449bc8235a99eba428730a99c0b29484) Thanks [@aliemir](https://github.com/aliemir)! - Updated Error components of inferencer to reflect the errors in a more descriptive way. #3596

## 2.4.1

### Patch Changes

-   [#3592](https://github.com/refinedev/refine/pull/3592) [`ea015a22797`](https://github.com/refinedev/refine/commit/ea015a22797127ddd5f87c4d2476e0948c7d0e7e) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the syntax error at `MuiListInferencer` in `@pankod/refine-inferencer/mui`

## 2.4.0

### Minor Changes

-   [#3502](https://github.com/refinedev/refine/pull/3502) [`92c052a8d92`](https://github.com/refinedev/refine/commit/92c052a8d92a157025a98945de9b11f0ae2042e9) Thanks [@aliemir](https://github.com/aliemir)! - Export utilities used in inferencer components to let users create their own inferencer components through `createInferencer` function and utilities.

## 2.3.0

### Minor Changes

-   [#3502](https://github.com/refinedev/refine/pull/3502) [`92c052a8d92`](https://github.com/refinedev/refine/commit/92c052a8d92a157025a98945de9b11f0ae2042e9) Thanks [@aliemir](https://github.com/aliemir)! - Export utilities used in inferencer components to let users create their own inferencer components through `createInferencer` function and utilities.

## 2.2.4

### Patch Changes

-   [#3441](https://github.com/refinedev/refine/pull/3441) [`68eeacdbc15`](https://github.com/refinedev/refine/commit/68eeacdbc15695d419a4ac557b375acbdb216856) Thanks [@aliemir](https://github.com/aliemir)! - Update component name generation for non-latin characters with a fallback value to the resource name.

-   Updated dependencies [[`8f2954611fa`](https://github.com/refinedev/refine/commit/8f2954611fa1dd1ebcc7519c416c6ef2554ca395), [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3), [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c)]:
    -   @pankod/refine-core@3.97.0

## 2.2.3

### Patch Changes

-   [#3441](https://github.com/refinedev/refine/pull/3441) [`68eeacdbc15`](https://github.com/refinedev/refine/commit/68eeacdbc15695d419a4ac557b375acbdb216856) Thanks [@aliemir](https://github.com/aliemir)! - Update component name generation for non-latin characters with a fallback value to the resource name.

-   Updated dependencies [[`8f2954611fa`](https://github.com/refinedev/refine/commit/8f2954611fa1dd1ebcc7519c416c6ef2554ca395), [`ea74f3a8408`](https://github.com/refinedev/refine/commit/ea74f3a8408bb53097f0e4a6b3b733d515b2a4d3), [`96d93eb2d71`](https://github.com/refinedev/refine/commit/96d93eb2d714d2559faf25c7eab5b4db31f1bf4c)]:
    -   @pankod/refine-core@3.96.0

## 2.2.2

### Patch Changes

-   [#3376](https://github.com/refinedev/refine/pull/3376) [`7de42162c6b`](https://github.com/refinedev/refine/commit/7de42162c6ba42fb4afe94972ffcee26a2634d43) Thanks [@aliemir](https://github.com/aliemir)! - Remove repeated `React` import from `headless/list` inferencer.

## 2.2.1

### Patch Changes

-   [#3376](https://github.com/refinedev/refine/pull/3376) [`7de42162c6b`](https://github.com/refinedev/refine/commit/7de42162c6ba42fb4afe94972ffcee26a2634d43) Thanks [@aliemir](https://github.com/aliemir)! - Remove repeated `React` import from `headless/list` inferencer.

## 2.2.0

### Minor Changes

-   [#3361](https://github.com/refinedev/refine/pull/3361) [`abcd9a7ed6b`](https://github.com/refinedev/refine/commit/abcd9a7ed6bc0070b386a9fdc4bf95d9187bf7c3) Thanks [@aliemir](https://github.com/aliemir)! - - fix: updated date inference logic to have a minimum length limit
    -   feat: added headless inferencer using `@pankod/refine-react-table` and `@pankod/refine-react-hook-form` packages. exported from `/headless` path.

### Patch Changes

-   Updated dependencies [[`98a1fbec65a`](https://github.com/refinedev/refine/commit/98a1fbec65abd38da9d6081e04c23b5fe4174acd), [`310ebd05990`](https://github.com/refinedev/refine/commit/310ebd05990dd629e64d0a2afcd2b371fe42440f)]:
    -   @pankod/refine-core@3.94.2

## 2.1.0

### Minor Changes

-   [#3361](https://github.com/refinedev/refine/pull/3361) [`abcd9a7ed6b`](https://github.com/refinedev/refine/commit/abcd9a7ed6bc0070b386a9fdc4bf95d9187bf7c3) Thanks [@aliemir](https://github.com/aliemir)! - - fix: updated date inference logic to have a minimum length limit
    -   feat: added headless inferencer using `@pankod/refine-react-table` and `@pankod/refine-react-hook-form` packages. exported from `/headless` path.

### Patch Changes

-   Updated dependencies [[`98a1fbec65a`](https://github.com/refinedev/refine/commit/98a1fbec65abd38da9d6081e04c23b5fe4174acd), [`310ebd05990`](https://github.com/refinedev/refine/commit/310ebd05990dd629e64d0a2afcd2b371fe42440f)]:
    -   @pankod/refine-core@3.94.1

## 2.0.2

### Patch Changes

-   [#3340](https://github.com/refinedev/refine/pull/3340) [`52489a0d8bc`](https://github.com/refinedev/refine/commit/52489a0d8bc746ad23eb1af984370a8222959c8d) Thanks [@aliemir](https://github.com/aliemir)! - Update `useInferFetch` hook logic to work without `id` in `list` and `create` type of inferencer.

-   [#3339](https://github.com/refinedev/refine/pull/3339) [`8c764ecc566`](https://github.com/refinedev/refine/commit/8c764ecc566a0bdb9c7455c7b06680a93f1a8305) Thanks [@aliemir](https://github.com/aliemir)! - Fix type inconsistency in `useInferFetch` due to changes in `@pankod/refine-core`'s `useResource` hook.

-   Updated dependencies [[`ce6acf2b3d4`](https://github.com/refinedev/refine/commit/ce6acf2b3d4c181a87cbdb6c1264fd6e59a504f5)]:
    -   @pankod/refine-core@3.94.0

## 2.0.1

### Patch Changes

-   [#3340](https://github.com/refinedev/refine/pull/3340) [`52489a0d8bc`](https://github.com/refinedev/refine/commit/52489a0d8bc746ad23eb1af984370a8222959c8d) Thanks [@aliemir](https://github.com/aliemir)! - Update `useInferFetch` hook logic to work without `id` in `list` and `create` type of inferencer.

-   [#3339](https://github.com/refinedev/refine/pull/3339) [`8c764ecc566`](https://github.com/refinedev/refine/commit/8c764ecc566a0bdb9c7455c7b06680a93f1a8305) Thanks [@aliemir](https://github.com/aliemir)! - Fix type inconsistency in `useInferFetch` due to changes in `@pankod/refine-core`'s `useResource` hook.

-   Updated dependencies [[`ce6acf2b3d4`](https://github.com/refinedev/refine/commit/ce6acf2b3d4c181a87cbdb6c1264fd6e59a504f5)]:
    -   @pankod/refine-core@3.93.0

## 2.0.0

### Patch Changes

-   Updated dependencies [[`fd2e1882e06`](https://github.com/refinedev/refine/commit/fd2e1882e060135674f53350f2fe1d22347543d7), [`214ea79c81c`](https://github.com/refinedev/refine/commit/214ea79c81c2f21573f999083612d30256be76a9)]:
    -   @pankod/refine-antd@4.0.0

## 1.6.1

### Patch Changes

-   [#3200](https://github.com/refinedev/refine/pull/3200) [`8c9efbd40db`](https://github.com/refinedev/refine/commit/8c9efbd40dba7b6a2bb4e9060942cdc0cfe6d056) Thanks [@aliemir](https://github.com/aliemir)! - Handle kebab-case relation suffixes for a wider case support. (e.g. `category-id`,`category-ids`)

## 1.6.0

### Minor Changes

-   [#3173](https://github.com/refinedev/refine/pull/3173) [`15402d3a70f`](https://github.com/refinedev/refine/commit/15402d3a70fead18bb7d49eae75fe5afa6b9b4f3) Thanks [@aliemir](https://github.com/aliemir)! - - Added `fieldTransformer` prop to inferencer components to let users transform or hide the field to be rendered.
    -   Hide networks errors caused by the relation detection process.
    -   Added the ability to detect relations from basic types like `"text"` and `"number"`.

## 1.5.0

### Minor Changes

-   [#3173](https://github.com/refinedev/refine/pull/3173) [`15402d3a70f`](https://github.com/refinedev/refine/commit/15402d3a70fead18bb7d49eae75fe5afa6b9b4f3) Thanks [@aliemir](https://github.com/aliemir)! - - Added `fieldTransformer` prop to inferencer components to let users transform or hide the field to be rendered.
    -   Hide networks errors caused by the relation detection process.
    -   Added the ability to detect relations from basic types like `"text"` and `"number"`.

## 1.4.0

### Minor Changes

-   [#3166](https://github.com/refinedev/refine/pull/3166) [`b41e89ea7eb`](https://github.com/refinedev/refine/commit/b41e89ea7eb9c2a930dcf41713c527a875de7cbf) Thanks [@aliemir](https://github.com/aliemir)! - Replaced `react-live` package with a maintained fork `@aliemir/react-live` with TypeScript support.

## 1.3.0

### Minor Changes

-   [#3166](https://github.com/refinedev/refine/pull/3166) [`b41e89ea7eb`](https://github.com/refinedev/refine/commit/b41e89ea7eb9c2a930dcf41713c527a875de7cbf) Thanks [@aliemir](https://github.com/aliemir)! - Replaced `react-live` package with a maintained fork `@aliemir/react-live` with TypeScript support.

## 1.2.2

### Patch Changes

-   [#3123](https://github.com/refinedev/refine/pull/3123) [`5e480338852`](https://github.com/refinedev/refine/commit/5e48033885273a05f3eebbcb4bcf1d28220bb6b3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Removed the requirement to define resource for relations.
    -   Component names and variable names are now generated primarily by label after the resource name.
    -   Added a new base interface component
        > ```diff
        > - import {
        > -    AntdShowInferencer,
        > -    AntdEditInferencer,
        > -    AntdListInferencer,
        > -    AntdEditInferencer,
        > - } from "@pankod/refine-inferencer/antd";
        > + import { AntdInferencer } from "@pankod/refine-inferencer/antd";
        >
        > <Refine
        >     ...
        >     resources={[
        >         {
        >             name: "samples",
        > -           list: AntdListInferencer,
        > +           list: AntdInferencer,
        > -           edit: AntdEditInferencer,
        > +           edit: AntdInferencer,
        > -           show: AntdShowInferencer,
        > +           show: AntdInferencer,
        > -           create: AntdEditInferencer,
        > +           create: AntdInferencer,
        >         },
        >
        >     ]}
        > />
        >
        > ```

## 1.2.1

### Patch Changes

-   [#3123](https://github.com/refinedev/refine/pull/3123) [`5e480338852`](https://github.com/refinedev/refine/commit/5e48033885273a05f3eebbcb4bcf1d28220bb6b3) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Removed the requirement to define resource for relations.
    -   Component names and variable names are now generated primarily by label after the resource name.
    -   Added a new base interface component
        > ```diff
        > - import {
        > -    AntdShowInferencer,
        > -    AntdEditInferencer,
        > -    AntdListInferencer,
        > -    AntdEditInferencer,
        > - } from "@pankod/refine-inferencer/antd";
        > + import { AntdInferencer } from "@pankod/refine-inferencer/antd";
        >
        > <Refine
        >     ...
        >     resources={[
        >         {
        >             name: "samples",
        > -           list: AntdListInferencer,
        > +           list: AntdInferencer,
        > -           edit: AntdEditInferencer,
        > +           edit: AntdInferencer,
        > -           show: AntdShowInferencer,
        > +           show: AntdInferencer,
        > -           create: AntdEditInferencer,
        > +           create: AntdInferencer,
        >         },
        >
        >     ]}
        > />
        >
        > ```

## 1.2.0

### Minor Changes

-   [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Initial release of the **Inferencer** package.

    This package provides series of components per each UI integration to generate **list**, **show** and **edit** pages for your resources. The fields and their representation are inferred from your resource's API response. Code is generated and presented with a preview and option to copy and edit in your project.

    **Note:** It's highly advised to only use this package in development environments. While generating the sample code, multiple requests are made to the API and the result might not be the best application for your data.

    ## Usage

    Components for UI integrations are exported in sub directories. For example, to use the components for Ant Design integration, you can import them like this:

    ```tsx

    ```

    After importing the component, you can directly use it in `<Refine/>` component's `resources` prop.

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: AntdListInferencer,
                show: AntdShowInferencer,
                edit: AntdEditInferencer,
            },
        ]}
    />
    ```

    **Tip:** Relation data is only handled if the resource is present in the `resources` array. For example, if you have a `posts` resource with a `users` relation, you need to add `users` resource to the `resources` array as well. Otherwise, inferencer will try to show the relation data as a simple field like string or a number.

### Patch Changes

-   [#3064](https://github.com/refinedev/refine/pull/3064) [`27df262dd0a`](https://github.com/refinedev/refine/commit/27df262dd0acf6cfefac1518b4133668384a89ac) Thanks [@aliemir](https://github.com/aliemir)! - Added `undefined` check for date field values in `@pankod/refine-inferencer/antd`'s `EditInferencer` component to prevent setting it to current date when it's not provided.

## 1.1.0

### Minor Changes

-   [#3027](https://github.com/refinedev/refine/pull/3027) [`177d0a764fe`](https://github.com/refinedev/refine/commit/177d0a764feb60fe9235a36debc052133dc72fa8) Thanks [@aliemir](https://github.com/aliemir)! - Initial release of the **Inferencer** package.

    This package provides series of components per each UI integration to generate **list**, **show** and **edit** pages for your resources. The fields and their representation are inferred from your resource's API response. Code is generated and presented with a preview and option to copy and edit in your project.

    **Note:** It's highly advised to only use this package in development environments. While generating the sample code, multiple requests are made to the API and the result might not be the best application for your data.

    ## Usage

    Components for UI integrations are exported in sub directories. For example, to use the components for Ant Design integration, you can import them like this:

    ```tsx

    ```

    After importing the component, you can directly use it in `<Refine/>` component's `resources` prop.

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: AntdListInferencer,
                show: AntdShowInferencer,
                edit: AntdEditInferencer,
            },
        ]}
    />
    ```

    **Tip:** Relation data is only handled if the resource is present in the `resources` array. For example, if you have a `posts` resource with a `users` relation, you need to add `users` resource to the `resources` array as well. Otherwise, inferencer will try to show the relation data as a simple field like string or a number.

### Patch Changes

-   [#3064](https://github.com/refinedev/refine/pull/3064) [`27df262dd0a`](https://github.com/refinedev/refine/commit/27df262dd0acf6cfefac1518b4133668384a89ac) Thanks [@aliemir](https://github.com/aliemir)! - Added `undefined` check for date field values in `@pankod/refine-inferencer/antd`'s `EditInferencer` component to prevent setting it to current date when it's not provided.

## 1.6.11

### Patch Changes

-   Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.10

### Patch Changes

-   [#2758](https://github.com/pankod/refine/pull/2758) [`3960549907`](https://github.com/pankod/refine/commit/39605499074d73a75d73f8bfce03088f63915027) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add primary color to `<SaveButton/>`'s `<ActionIcon/>` component.

## 1.6.9

### Patch Changes

-   Fixed incorrectly used hooks in AuthPage component

## 1.6.8

### Patch Changes

-   [#2769](https://github.com/pankod/refine/pull/2769) [`501aebe997`](https://github.com/pankod/refine/commit/501aebe9974520c30093cc9cec781ee58129d053) Thanks [@dgelineau](https://github.com/dgelineau)! - Fixed incorrectly used hooks in AuthPage component

## 1.6.7

### Patch Changes

-   Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.6

### Patch Changes

-   [#2748](https://github.com/pankod/refine/pull/2748) [`0eaddb65ee`](https://github.com/pankod/refine/commit/0eaddb65ee77777fd1e6b9e5501c18d69bef4be8) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed <ErrorComponent /> responsive design for mobile devices

## 1.6.5

### Patch Changes

-   -   Added `<LoadingOverlay />` component to basic view components.
    -   Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
    -   Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
    -   Default title size decreased from `h2` to `h3`.
-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.4

## 1.6.4

### Patch Changes

-   [#2718](https://github.com/pankod/refine/pull/2718) [`d78d2a2a99`](https://github.com/pankod/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63) Thanks [@salihozdemir](https://github.com/salihozdemir)! - - Added `<LoadingOverlay />` component to basic view components.
    -   Update `goBack` prop usage, now it can be passed to `<ActionButton />`'s children.
    -   Fixed the issue that when `title` prop is passed to basic views, the back button is not shown.
    -   Default title size decreased from `h2` to `h3`.
-   Updated dependencies [[`d78d2a2a99`](https://github.com/pankod/refine/commit/d78d2a2a99adb508094069cda23deaba55c25b63)]:
    -   @pankod/refine-ui-types@0.11.3

## 1.6.3

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.2

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.1

### Patch Changes

-   [#2712](https://github.com/pankod/refine/pull/2712) [`c434055011`](https://github.com/pankod/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 1.6.0

### Minor Changes

-   Updated `formProps` property on `<AuthPage />` component

### Patch Changes

-   Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.5.0

### Minor Changes

-   [#2663](https://github.com/pankod/refine/pull/2663) [`c624a52b23`](https://github.com/pankod/refine/commit/c624a52b2310db1349ec556a7671f23779cc3622) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated `formProps` property on `<AuthPage />` component

### Patch Changes

-   [#2701](https://github.com/pankod/refine/pull/2701) [`ddd9eb3aff`](https://github.com/pankod/refine/commit/ddd9eb3aff961fcedf354f2c77c1844131d713a1) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added `clearable` prop to `useSelect` hook that is `true` by default.

## 1.4.0

### Minor Changes

-   -   Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.3.0

### Minor Changes

-   [#2627](https://github.com/pankod/refine/pull/2627) [`c5fb45d61f`](https://github.com/pankod/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 1.2.0

### Minor Changes

-   First release of `@pankod/refine-mantine` 🎉

## 1.1.0

### Minor Changes

-   [#2505](https://github.com/pankod/refine/pull/2505) [`a4dbb63c88`](https://github.com/pankod/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - First release of `@pankod/refine-mantine` 🎉

## 1.0.6

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.0

## 1.0.5

### Patch Changes

-   Updated dependencies [[`a65525de6f`](https://github.com/pankod/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
    -   @pankod/refine-ui-types@0.10.0

## 1.0.4

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.9.0

## 1.0.3

### Patch Changes

-   Updated dependencies [[`ad99916d6d`](https://github.com/pankod/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
    -   @pankod/refine-ui-types@0.8.0

## 1.0.2

### Patch Changes

-   Fixed version of react-router to `6.3.0`

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.7.0

## 1.0.1

### Patch Changes

-   [#2501](https://github.com/pankod/refine/pull/2501) [`4095a578d4`](https://github.com/pankod/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`
