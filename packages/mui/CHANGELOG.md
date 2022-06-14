# @pankod/refine-mui

## 3.30.1

### Patch Changes

-   [#1936](https://github.com/pankod/refine/pull/1936) [`0695c6fa01`](https://github.com/pankod/refine/commit/0695c6fa01716620dda842e1dd44222e06650d51) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated `secondary` color to `#2A132E`

-   Updated dependencies [[`4012d3c4ae`](https://github.com/pankod/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679)]:
    -   @pankod/refine-react-hook-form@3.27.1

## 3.30.0

### Minor Changes

-   Added default `sx` property for Material UI buttons.

    ```tsx
    const { sx, ...restProps } = rest;

    <Button sx={{ minWidth: 0, ...sx }} {...restProps} />;
    ```

### Patch Changes

-   Fixed the `useDataGrid` filter bug that the selected filter was not displayed.

*   Applied `refine`'s base theme to `@pankod/refine-mui` package with dark and light options.

-   Refactor default `<Sider>` component of `@pankod/refine-mui`

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.27.0

## 3.29.0

### Minor Changes

-   Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

-   We are fixed the buttons' icon fontSize when hideText prop passed

*   Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

-   Fixed Material UI `ReadyPage` to be responsive for any screen

*   Added missing exports from `notistack` package.

-   Added `svgButtonProps` property for Material UI buttons.

    ```tsx
    <CreateButton svgButtonProps={{ size: "small" }} />
    ```

*   Fixed Material UI `<ErrorComponent />` to be responsive for any screen

*   Updated dependencies []:
    -   @pankod/refine-core@3.29.0

## 3.28.0

### Minor Changes

-   Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

-   We are fixed the buttons' icon fontSize when hideText prop passed

*   Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

-   Fixed Material UI `ReadyPage` to be responsive for any screen

*   Added missing exports from `notistack` package.

-   Added `svgButtonProps` property for Material UI buttons.

    ```tsx
    <CreateButton svgButtonProps={{ size: "small" }} />
    ```

*   Fixed Material UI `<ErrorComponent />` to be responsive for any screen

*   Updated dependencies []:
    -   @pankod/refine-core@3.28.0

## 3.27.0

### Minor Changes

-   Added new provider. `<RefineSnackbarProvider/>` for notifications.

### Patch Changes

-   We are fixed the buttons' icon fontSize when hideText prop passed

*   Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

-   Fixed Material UI `ReadyPage` to be responsive for any screen

*   Added missing exports from `notistack` package.

-   Added `svgButtonProps` property for Material UI buttons.

    ```tsx
    <CreateButton svgButtonProps={{ size: "small" }} />
    ```

*   Fixed Material UI `<ErrorComponent />` to be responsive for any screen

*   Updated dependencies []:
    -   @pankod/refine-core@3.27.0

## 3.26.0

### Minor Changes

-   [#1911](https://github.com/pankod/refine/pull/1911) [`6aa09d34b8`](https://github.com/pankod/refine/commit/6aa09d34b8756d22b76cb9804814594e730587b0) Thanks [@biskuvit](https://github.com/biskuvit)! - Added new provider. `<RefineSnackbarProvider/>` for notifications.

## 3.25.2

### Patch Changes

-   [#1909](https://github.com/pankod/refine/pull/1909) [`0170b1306d`](https://github.com/pankod/refine/commit/0170b1306d38d20891a189e3103a7a8bddd3a3dc) Thanks [@aliemir](https://github.com/aliemir)! - Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

*   [#1896](https://github.com/pankod/refine/pull/1896) [`2ba2a96fd2`](https://github.com/pankod/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Added missing exports from `notistack` package.

*   Updated dependencies [[`2ba2a96fd2`](https://github.com/pankod/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
    -   @pankod/refine-core@3.26.0

## 3.25.1

### Patch Changes

-   [#1898](https://github.com/pankod/refine/pull/1898) [`906cf51eca`](https://github.com/pankod/refine/commit/906cf51eca72201d4469a5e2f5cbd7842b9a2796) Thanks [@ozkalai](https://github.com/ozkalai)! - We are fixed the buttons' icon fontSize when hideText prop passed

*   [#1889](https://github.com/pankod/refine/pull/1889) [`683fd6f932`](https://github.com/pankod/refine/commit/683fd6f932624e284195005c8408935a89da73d3) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `ReadyPage` to be responsive for any screen

-   [#1878](https://github.com/pankod/refine/pull/1878) [`07a2c48157`](https://github.com/pankod/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `svgButtonProps` property for Material UI buttons.

    ```tsx
    <CreateButton svgButtonProps={{ size: "small" }} />
    ```

*   [#1890](https://github.com/pankod/refine/pull/1890) [`607de3446b`](https://github.com/pankod/refine/commit/607de3446ba314a05e9deca88dd41a09f343e7b9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `<ErrorComponent />` to be responsive for any screen

## 3.18.0-next.1

### Minor Changes

-   [#1877](https://github.com/pankod/refine/pull/1877) [`5bc54c25d6`](https://github.com/pankod/refine/commit/5bc54c25d60bce9af44ae3feb1c9e4cb38c8b866) Thanks [@aliemir](https://github.com/aliemir)! - Add `useDataGrid` hook documentation.

### Patch Changes

-   [#1878](https://github.com/pankod/refine/pull/1878) [`07a2c48157`](https://github.com/pankod/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Passed svgButtonProps to mui buttons

## 3.17.1-next.0

### Patch Changes

-   [#1755](https://github.com/pankod/refine/pull/1755) [`a81836bc36`](https://github.com/pankod/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.

*   [#1755](https://github.com/pankod/refine/pull/1755) [`a81836bc36`](https://github.com/pankod/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Notistack toast mobile view fixed

## 3.17.0-next.0

### Minor Changes

-   [#1867](https://github.com/pankod/refine/pull/1867) [`da2e12314d`](https://github.com/pankod/refine/commit/da2e12314de122405268d07982aa27998c127de4) Thanks [@ozkalai](https://github.com/ozkalai)! - Notistack toast mobile view fixed

### Patch Changes

-   [#1850](https://github.com/pankod/refine/pull/1850) [`40b3faca10`](https://github.com/pankod/refine/commit/40b3faca10d420d5ac21fb9a591db86c009439b8) Thanks [@ozkalai](https://github.com/ozkalai)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.
