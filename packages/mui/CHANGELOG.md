# @pankod/refine-mui

## 3.39.1

### Patch Changes

-   [#2223](https://github.com/pankod/refine/pull/2223) [`0a215f2000`](https://github.com/pankod/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.39.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.29.0

## 3.38.0

### Minor Changes

-   [#2217](https://github.com/pankod/refine/pull/2217) [`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Updated dependencies [[`b4aae00f77`](https://github.com/pankod/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5)]:
    -   @pankod/refine-react-hook-form@3.28.0

## 3.37.2

### Patch Changes

-   Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.0

## 3.37.1

### Patch Changes

-   [#2106](https://github.com/pankod/refine/pull/2106) [`10a20d8714`](https://github.com/pankod/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies [[`9d77c63a92`](https://github.com/pankod/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/pankod/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
    -   @pankod/refine-core@3.37.0

## 3.37.0

### Minor Changes

-   The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

    ```diff
    export const PostsList: React.FC = () => {
    -    const { dataGridProps } = useDataGrid<IPost>({
    -        columns,
    -    });
    +    const { dataGridProps } = useDataGrid<IPost>();

        return (
            <List>
    -            <DataGrid {...dataGridProps} autoHeight />
    +            <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        );
    };
    ```

## 3.36.0

### Minor Changes

-   [#2072](https://github.com/pankod/refine/pull/2072) [`bbca622ede`](https://github.com/pankod/refine/commit/bbca622eded117271350aa178b3e757c890c5bc4) Thanks [@salihozdemir](https://github.com/salihozdemir)! - The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

    ```diff
    export const PostsList: React.FC = () => {
    -    const { dataGridProps } = useDataGrid<IPost>({
    -        columns,
    -    });
    +    const { dataGridProps } = useDataGrid<IPost>();

        return (
            <List>
    -            <DataGrid {...dataGridProps} autoHeight />
    +            <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        );
    };
    ```

## 3.34.0

### Minor Changes

-   Updated `useDataGrid` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useDataGrid` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.33.0

### Minor Changes

-   [#2050](https://github.com/pankod/refine/pull/2050) [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useDataGrid` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useDataGrid` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   [#2061](https://github.com/pankod/refine/pull/2061) [`0237725cf3`](https://github.com/pankod/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/pankod/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/pankod/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.32.0

### Minor Changes

-   -   Created `<Breadcrumb>` component from [`<Breadcrumbs>`](https://mui.com/material-ui/react-breadcrumbs/#api)
    -   Added `<Breadcrumb>` component to `CRUD` components. (`<List>`, `<Create>`, `<Edit>`, `<Show>`)
    -   Added breadcrumb props to all `CRUD` components. We can use `breadcrumbs` prop to add custom breadcrumbs.

### Patch Changes

-   Fixed missing imports (`DefaultColorScheme`, `ExtendedColorScheme` and `ThemeInput`) in `@mui/material/styles` in `@pankod/refine-mui` package.

-   Updated dependencies []:
    -   @pankod/refine-core@3.34.2

## 3.31.0

### Minor Changes

-   [#2027](https://github.com/pankod/refine/pull/2027) [`fe2df4b788`](https://github.com/pankod/refine/commit/fe2df4b788ceb367db4e949507b9f6a9f8174582) Thanks [@biskuvit](https://github.com/biskuvit)! - - Created `<Breadcrumb>` component from [`<Breadcrumbs>`](https://mui.com/material-ui/react-breadcrumbs/#api)
    -   Added `<Breadcrumb>` component to `CRUD` components. (`<List>`, `<Create>`, `<Edit>`, `<Show>`)
    -   Added breadcrumb props to all `CRUD` components. We can use `breadcrumbs` prop to add custom breadcrumbs.

### Patch Changes

-   [#2063](https://github.com/pankod/refine/pull/2063) [`2067ac6bcb`](https://github.com/pankod/refine/commit/2067ac6bcba93bc98c91e7e0a012e203120d42dc) Thanks [@aliemir](https://github.com/aliemir)! - Fixed missing imports (`DefaultColorScheme`, `ExtendedColorScheme` and `ThemeInput`) in `@mui/material/styles` in `@pankod/refine-mui` package.

-   Updated dependencies [[`0338ce9d6b`](https://github.com/pankod/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
    -   @pankod/refine-core@3.34.1

## 3.30.9

### Patch Changes

-   [#2039](https://github.com/pankod/refine/pull/2039) [`6c8e1c9be2`](https://github.com/pankod/refine/commit/6c8e1c9be273ade2ba918490f319880ddd4d60ed) Thanks [@ozkalai](https://github.com/ozkalai)! - Added the `description` property to the notifications

## 3.30.8

### Patch Changes

-   We have fixed texts with translations of default login pages in Material UI and Headless.

*   Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

-   dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

-   Updated dependencies []:
    -   @pankod/refine-core@3.34.0

## 3.30.7

### Patch Changes

-   [#2029](https://github.com/pankod/refine/pull/2029) [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

*   [#2033](https://github.com/pankod/refine/pull/2033) [`14e14709ec`](https://github.com/pankod/refine/commit/14e14709ecd8f2c5106cbcaca3a1acd966d69a07) Thanks [@ozkalai](https://github.com/ozkalai)! - Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

-   [#2022](https://github.com/pankod/refine/pull/2022) [`01f8631953`](https://github.com/pankod/refine/commit/01f8631953c17f7e5ef2c6b7aa20aed825b7f235) Thanks [@biskuvit](https://github.com/biskuvit)! - dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

-   Updated dependencies [[`d96ba1e9c8`](https://github.com/pankod/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/pankod/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/pankod/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
    -   @pankod/refine-core@3.33.0

## 3.30.6

### Patch Changes

-   Add Dashboard item to default `<Sider/>`

-   Updated dependencies []:
    -   @pankod/refine-core@3.32.0

## 3.30.5

### Patch Changes

-   [#2009](https://github.com/pankod/refine/pull/2009) [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Add Dashboard item to default `<Sider/>`

-   Updated dependencies [[`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/pankod/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/pankod/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
    -   @pankod/refine-core@3.31.0

## 3.30.4

### Patch Changes

-   Deprecated `useMenu` from `@pankod/refine-antd` and replaced with the `useMenu` from `@pankod/refine-core`

*   Remove unused `transition` property from `@pankod/refine-mui`'s `<Layout/>`

*   Updated dependencies []:
    -   @pankod/refine-core@3.30.0

## 3.30.4

### Patch Changes

-   Fix styling for buttons in loading state

*   Fix the spacing of header and footer actions in crud components and updated their snapshot tests.

*   Updated dependencies []:
    -   @pankod/refine-core@3.29.2

## 3.30.3

### Patch Changes

-   We've updated `secondary` color to `#2A132E`

*   Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

*   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.27.2

## 3.30.2

### Patch Changes

-   [#1945](https://github.com/pankod/refine/pull/1945) [`592a401924`](https://github.com/pankod/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

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
