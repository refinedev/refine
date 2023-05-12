# @pankod/refine-mui

## 4.16.2

### Patch Changes

-   [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 4.16.1

### Patch Changes

-   [#4316](https://github.com/refinedev/refine/pull/4316) [`4690c627e05`](https://github.com/refinedev/refine/commit/4690c627e053a7e35eb8bcb1bfca808308bfa89d) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - fix: fixed `className` for easier selection of all buttons and titles of CRUD components

## 4.16.0

### Minor Changes

-   [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
    Now, customization of the header and footer buttons can be achieved without losing the default functionality.

    ```tsx
    import {
        DeleteButton,
        EditButton,
        ListButton,
        RefreshButton,
        Show,
    } from "@refinedev/mui";

    const PostShow = () => {
        return (
            <Show
                headerButtons={({
                    deleteButtonProps,
                    editButtonProps,
                    listButtonProps,
                    refreshButtonProps,
                }) => {
                    return (
                        <>
                            {/* custom components */}
                            {listButtonProps && (
                                <ListButton
                                    {...listButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            {editButtonProps && (
                                <EditButton
                                    {...editButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            {deleteButtonProps && (
                                <DeleteButton
                                    {...deleteButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            <RefreshButton
                                {...refreshButtonProps}
                                meta={{ foo: "bar" }}
                            />
                        </>
                    );
                }}
            >
                {/* ... */}
            </Show>
        );
    };
    ```

### Patch Changes

-   [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

-   Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
    -   @refinedev/ui-types@1.16.0
    -   @refinedev/react-hook-form@4.4.0

## 4.15.0

### Minor Changes

-   [#4303](https://github.com/refinedev/refine/pull/4303) [`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added default button props into the renderer functions `headerButtons` and `footerButtons` in CRUD components.
    Now, customization of the header and footer buttons can be achieved without losing the default functionality.

    ```tsx
    import {
        DeleteButton,
        EditButton,
        ListButton,
        RefreshButton,
        Show,
    } from "@refinedev/mui";

    const PostShow = () => {
        return (
            <Show
                headerButtons={({
                    deleteButtonProps,
                    editButtonProps,
                    listButtonProps,
                    refreshButtonProps,
                }) => {
                    return (
                        <>
                            {/* custom components */}
                            {listButtonProps && (
                                <ListButton
                                    {...listButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            {editButtonProps && (
                                <EditButton
                                    {...editButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            {deleteButtonProps && (
                                <DeleteButton
                                    {...deleteButtonProps}
                                    meta={{ foo: "bar" }}
                                />
                            )}
                            <RefreshButton
                                {...refreshButtonProps}
                                meta={{ foo: "bar" }}
                            />
                        </>
                    );
                }}
            >
                {/* ... */}
            </Show>
        );
    };
    ```

### Patch Changes

-   [#4312](https://github.com/refinedev/refine/pull/4312) [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `className` for easier selection of all buttons and titles of CRUD components

-   Updated dependencies [[`0c569f42b4e`](https://github.com/refinedev/refine/commit/0c569f42b4e7caec75928fd8a1ebeb337c95ff81), [`e6eb4dea627`](https://github.com/refinedev/refine/commit/e6eb4dea6279983d04a9f654ac2cd74915fba075), [`9a5f79186c1`](https://github.com/refinedev/refine/commit/9a5f79186c107d52e12b8ff87558a3c3dd7807b8)]:
    -   @refinedev/ui-types@1.15.0
    -   @refinedev/react-hook-form@4.3.0

## 4.14.7

### Patch Changes

-   [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

-   Updated dependencies [[`dc62abc890f`](https://github.com/refinedev/refine/commit/dc62abc890f68be161c7035c28c0118216a9e0ec)]:
    -   @refinedev/ui-types@1.14.0

## 4.14.6

### Patch Changes

-   [#4295](https://github.com/refinedev/refine/pull/4295) [`7f24a6a2b14`](https://github.com/refinedev/refine/commit/7f24a6a2b14f1e10a2483298b13cc143861fb08f) Thanks [@salihozdemir](https://github.com/salihozdemir)! - chore: bump to latest version of `@refinedev/ui-types`

## 4.14.5

### Patch Changes

-   [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

    To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

    Example:

    ```tsx
    import { Refine } from "@refinedev/core";
    import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

    const App: React.FC = () => {
        return (
            <Refine
                ...
            >
                <ThemedLayoutV2
                    Header={() => <ThemedHeaderV2 sticky />}
                >
                    {/* ... */}
                </ThemedLayoutV2>
            </Refine>
        );
    };
    ```

-   [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.4

### Patch Changes

-   [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

    To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

    Example:

    ```tsx
    import { Refine } from "@refinedev/core";
    import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

    const App: React.FC = () => {
        return (
            <Refine
                ...
            >
                <ThemedLayoutV2
                    Header={() => <ThemedHeaderV2 sticky />}
                >
                    {/* ... */}
                </ThemedLayoutV2>
            </Refine>
        );
    };
    ```

-   [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.3

### Patch Changes

-   [#4277](https://github.com/refinedev/refine/pull/4277) [`7172c1b42d2`](https://github.com/refinedev/refine/commit/7172c1b42d26ade22780527892ce26ceef15c838) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: renamed the `<ThemedHeaderV2/>` prop `isSticky` to `sticky`

    To provide backwards compatibility, the old prop name is still supported, but it is deprecated and will be removed in the next major version.

    Example:

    ```tsx
    import { Refine } from "@refinedev/core";
    import { ThemedLayoutV2, ThemedHeaderV2 } from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine

    const App: React.FC = () => {
        return (
            <Refine
                ...
            >
                <ThemedLayoutV2
                    Header={() => <ThemedHeaderV2 sticky />}
                >
                    {/* ... */}
                </ThemedLayoutV2>
            </Refine>
        );
    };
    ```

-   [#4272](https://github.com/refinedev/refine/pull/4272) [`420d2442741`](https://github.com/refinedev/refine/commit/420d2442741d211561dd48c72bcb143ee5f44e9e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: updated the sider styles to solve issues that occur when there are too many items in the sider

## 4.14.2

### Patch Changes

-   [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 4.14.1

### Patch Changes

-   [#4255](https://github.com/refinedev/refine/pull/4255) [`9694245718c`](https://github.com/refinedev/refine/commit/9694245718cea7812c85aefc4880d165bb4d124d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fixed: `ThemedLayoutContextProvider` import path in internal usage.

## 4.14.0

### Minor Changes

-   [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
    From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

    ```tsx
    <ThemedLayoutV2
        initialSiderCollapsed={true} // This will make the sider collapsed by default
    >
        {/* .. */}
    </ThemedLayoutV2>
    ```

-   [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component. Default is `true`.

    ```tsx
    import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mui";

    const CustomHeader = () => <ThemedHeaderV2 isSticky={false} />;

    const App = () => (
        <Refine>
            // ...
            <ThemedLayoutV2 Header={CustomHeader}>
                <Outlet />
            </ThemedLayoutV2>
            // ...
        </Refine>
    );
    ```

### Patch Changes

-   Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
    -   @refinedev/ui-types@1.12.0

## 4.13.0

### Minor Changes

-   [#4232](https://github.com/refinedev/refine/pull/4232) [`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `initialSiderCollapsed` added to `RefineThemedLayoutV2Props` to control initial state of `<ThemedSiderV2>`.
    From now on, you can control the initial collapsed state of `<ThemedSiderV2>` by passing the `initialSiderCollapsed` prop to `<ThemedLayoutV2>`.

    ```tsx
    <ThemedLayoutV2
        initialSiderCollapsed={true} // This will make the sider collapsed by default
    >
        {/* .. */}
    </ThemedLayoutV2>
    ```

-   [#4209](https://github.com/refinedev/refine/pull/4209) [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `isSticky` prop to `ThemedHeaderV2` component. Default is `true`.

    ```tsx
    import { ThemedHeaderV2, ThemedLayoutV2 } from "@refinedev/mui";

    const CustomHeader = () => <ThemedHeaderV2 isSticky={false} />;

    const App = () => (
        <Refine>
            // ...
            <ThemedLayoutV2 Header={CustomHeader}>
                <Outlet />
            </ThemedLayoutV2>
            // ...
        </Refine>
    );
    ```

### Patch Changes

-   Updated dependencies [[`c99bc0ad7f7`](https://github.com/refinedev/refine/commit/c99bc0ad7f7b71cf47e45a797acdea2325e6fbc8), [`3f4b5fef76f`](https://github.com/refinedev/refine/commit/3f4b5fef76f3558fc4466f455b9f55083cf47fc2)]:
    -   @refinedev/ui-types@1.11.0

## 4.12.0

### Minor Changes

-   [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

    -   **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
    -   **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

    feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

    -   **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
    -   **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

-   Updated dependencies [[`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5)]:
    -   @refinedev/react-hook-form@4.2.2

## 4.11.0

### Minor Changes

-   [#4194](https://github.com/refinedev/refine/pull/4194) [`8df15fe0e4e`](https://github.com/refinedev/refine/commit/8df15fe0e4e0fb2bb81102ed1e3a12a0a9532b80) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: `sorters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the sorting mode of the table. It can be either `server` or `off`.

    -   **"off"**: `sorters` are not sent to the server. You can use the `sorters` value to sort the records on the client side.
    -   **"server"**: Sorting is done on the server side. Records will be fetched by using the `sorters` value.

    feat:`filters.mode` prop added to `useTable` and `useDataGrid` hooks. This prop handles the filtering mode of the table. It can be either `server` or `off`.

    -   **"off"**: `filters` are not sent to the server. You can use the `filters` value to filter the records on the client side.
    -   **"server"**: Filtering is done on the server side. Records will be fetched by using the `filters` value.

### Patch Changes

-   Updated dependencies [[`b992e11e338`](https://github.com/refinedev/refine/commit/b992e11e3387464186d552112460aebbc18d3cc5)]:
    -   @refinedev/react-hook-form@4.2.1

## 4.10.3

### Patch Changes

-   [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

-   Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
    -   @refinedev/ui-types@1.10.0

## 4.10.2

### Patch Changes

-   [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

-   Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
    -   @refinedev/ui-types@1.9.0

## 4.10.1

### Patch Changes

-   [#4198](https://github.com/refinedev/refine/pull/4198) [`6081efbc26b`](https://github.com/refinedev/refine/commit/6081efbc26bad28629d5513d6e7a30c96b0dd080) Thanks [@salihozdemir](https://github.com/salihozdemir)! - fix: `useAutocomplete` now resets the search value when the option is selected

-   Updated dependencies [[`deec38a034a`](https://github.com/refinedev/refine/commit/deec38a034a0b5ab2d7842e428f6fc3a1b8561fa)]:
    -   @refinedev/ui-types@1.8.0

## 4.10.0

### Minor Changes

-   [#4153](https://github.com/refinedev/refine/pull/4153) [`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

    `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

    See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

-   Updated dependencies [[`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb)]:
    -   @refinedev/ui-types@1.7.0

## 4.9.0

### Minor Changes

-   [#4153](https://github.com/refinedev/refine/pull/4153) [`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: add `ThemedLayoutV2` and `HamburgerMenu` component

    `ThemeLayout` is deprecated. Added `ThemedLayoutV2` instead. This update fixed some UI problems in the layout. Also, with the new `<HamburgerMenu />` component, it's easier to collapse/uncollapse the `Sider`.

    See here for detailed [migration guideline](https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2).

### Patch Changes

-   Updated dependencies [[`8d9c408d089`](https://github.com/refinedev/refine/commit/8d9c408d0893f6592709e688432a3274d0bd0fcb)]:
    -   @refinedev/ui-types@1.6.0

## 4.8.0

### Minor Changes

-   [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Added missing third generic parameter to hooks which are using `useQuery` internally.

    For example:

    ```ts
    import { useOne, HttpError } from "@refinedev/core";

    const { data } = useOne<{ count: string }, HttpError, { count: number }>({
        resource: "product-count",
        queryOptions: {
            select: (rawData) => {
                return {
                    data: {
                        count: Number(rawData?.data?.count),
                    },
                };
            },
        },
    });

    console.log(typeof data?.data.count); // number
    ```

### Patch Changes

-   [#4113](https://github.com/refinedev/refine/pull/4113) [`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated the generic type name of hooks that use `useQuery` to synchronize generic type names with `tanstack-query`.

-   Updated dependencies [[`1c13602e308`](https://github.com/refinedev/refine/commit/1c13602e308ffba93099922c144966f25fb2087d)]:
    -   @refinedev/react-hook-form@4.2.0

## 4.7.2

### Patch Changes

-   [#4115](https://github.com/refinedev/refine/pull/4115) [`1d44ef15575`](https://github.com/refinedev/refine/commit/1d44ef15575e4537684b3f42e4fcf3535b41905e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed <Sider /> icon and list item spacing for MUI

-   Updated dependencies [[`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9)]:
    -   @refinedev/react-hook-form@4.1.6

## 4.7.1

### Patch Changes

-   [#4115](https://github.com/refinedev/refine/pull/4115) [`1d44ef15575`](https://github.com/refinedev/refine/commit/1d44ef15575e4537684b3f42e4fcf3535b41905e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed <Sider /> icon and list item spacing for MUI

-   Updated dependencies [[`1f310bd7b69`](https://github.com/refinedev/refine/commit/1f310bd7b6900f534bb57db90d3fc8a6ea4364c9)]:
    -   @refinedev/react-hook-form@4.1.5

## 4.7.0

### Minor Changes

-   [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mui/components/mui-themed-layout

### Patch Changes

-   Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
    -   @refinedev/react-hook-form@4.1.4

## 4.6.0

### Minor Changes

-   [#4072](https://github.com/refinedev/refine/pull/4072) [`fad40e6237f`](https://github.com/refinedev/refine/commit/fad40e6237f06f99b1a5cad943cf34cf693a78fb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `<Layout>` is deprecated. use `<ThemedLayout>` instead with 100% backward compatibility. - https://refine.dev/docs/api-reference/mui/components/mui-themed-layout

### Patch Changes

-   Updated dependencies [[`afdaed3dd83`](https://github.com/refinedev/refine/commit/afdaed3dd8357d6106ed5a4e524d82cfcceaf7ec)]:
    -   @refinedev/react-hook-form@4.1.3

## 4.5.10

### Patch Changes

-   [`222f3baacc6`](https://github.com/refinedev/refine/commit/222f3baacc69f4bbe15e39427f47a07a75685f29) Thanks [@omeraplak](https://github.com/omeraplak)! - fixed 'Sign in' link on the ForgotPassword page

## 4.5.9

### Patch Changes

-   [`222f3baacc6`](https://github.com/refinedev/refine/commit/222f3baacc69f4bbe15e39427f47a07a75685f29) Thanks [@omeraplak](https://github.com/omeraplak)! - fixed 'Sign in' link on the ForgotPassword page

## 4.5.8

### Patch Changes

-   [#4033](https://github.com/refinedev/refine/pull/4033) [`08955914473`](https://github.com/refinedev/refine/commit/08955914473737b08772c919d8108e053d546341) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: Sider toggle button color - The color of the toggle button in the `<ThemedSider>` and `<ThemedHeader>` does not meet the contrast ratio. This is now fixed.

## 4.5.7

### Patch Changes

-   [#4033](https://github.com/refinedev/refine/pull/4033) [`08955914473`](https://github.com/refinedev/refine/commit/08955914473737b08772c919d8108e053d546341) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: Sider toggle button color - The color of the toggle button in the `<ThemedSider>` and `<ThemedHeader>` does not meet the contrast ratio. This is now fixed.

## 4.5.6

### Patch Changes

-   [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: default `gap: 8px` to `<ThemedTitle>` component.

## 4.5.5

### Patch Changes

-   [#4024](https://github.com/refinedev/refine/pull/4024) [`dc6d2311eb7`](https://github.com/refinedev/refine/commit/dc6d2311eb76a458f828fb15fe26fae1c75bc95a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Added: default `gap: 8px` to `<ThemedTitle>` component.

## 4.5.4

### Patch Changes

-   [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 4.5.3

### Patch Changes

-   [#3974](https://github.com/refinedev/refine/pull/3974) [`4dcc20d6a60`](https://github.com/refinedev/refine/commit/4dcc20d6a6097bb81a094e4bcb630504b2a055d2) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Deprecated the `WelcomePage` component. It'll be used from `@refinedev/core` instead.

## 4.5.2

### Patch Changes

-   [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

        -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

    -   `<RefineThemes>` colors updated to match the new theme colors.

-   Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
    -   @refinedev/ui-types@1.5.0

## 4.5.1

### Patch Changes

-   [#3975](https://github.com/refinedev/refine/pull/3975) [`b1e6e32f9a1`](https://github.com/refinedev/refine/commit/b1e6e32f9a19e8f26f95d41c942f90e96ed68372) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the logs out.

        -   The `<ThemedSider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

    -   `<RefineThemes>` colors updated to match the new theme colors.

-   Updated dependencies [[`2798f715361`](https://github.com/refinedev/refine/commit/2798f715361c5fd407d09429d94b05b602b50397)]:
    -   @refinedev/ui-types@1.4.0

## 4.5.0

### Minor Changes

-   [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the MUI components.

    ```tsx
    import { Refine } from "@refinedev/core";
    import { RefineThemes } from "@refinedev/mui";
    import { ThemeProvider } from "@mui/material/styles";
    import dataProvider from "@refinedev/simple-rest";

    const App = () => {
        // ---

        return (
          <ThemeProvider theme={RefineThemes.MagentaDark}>
                <Refine dataProvider={dataProvider("YOUR_API_URL")}>
                    {/** your app here */}
                </Refine>
            </ConfigProvider>
        );
    };
    ```

    -   default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mui`. You can remove it by setting `title` prop to `false`.

    ```tsx
    import { AuthPage } from "@refinedev/mui";

    const MyAuthPage = () => {
        return <AuthPage title={false} />;
    };
    ```

    -   `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

    ```tsx
    import { AuthPage } from "@refinedev/mui";

    const MyAuthPage = () => {
        return (
            <AuthPage
                renderContent={(
                    content: React.ReactNode,
                    title: React.ReactNode,
                ) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {title}
                            <h1 style={{ color: "white" }}>Extra Header</h1>
                            {content}
                            <h1 style={{ color: "white" }}>Extra Footer</h1>
                        </div>
                    );
                }}
            />
        );
    };
    ```

    -   `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

    -   `<AuthPage>` component uses colors from the theme.
    -   `<ThemedTitle>` added to `AuthPage`

### Patch Changes

-   [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 4.4.0

### Minor Changes

-   [#3949](https://github.com/refinedev/refine/pull/3949) [`836b06a2f67`](https://github.com/refinedev/refine/commit/836b06a2f67ec966247c422e42e11f39e6167288) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `RefineThemes` added. It contains predefined colors for the MUI components.

    ```tsx
    import { Refine } from "@refinedev/core";
    import { RefineThemes } from "@refinedev/mui";
    import { ThemeProvider } from "@mui/material/styles";
    import dataProvider from "@refinedev/simple-rest";

    const App = () => {
        // ---

        return (
          <ThemeProvider theme={RefineThemes.MagentaDark}>
                <Refine dataProvider={dataProvider("YOUR_API_URL")}>
                    {/** your app here */}
                </Refine>
            </ConfigProvider>
        );
    };
    ```

    -   default title with icon added to `AuthPage`. It uses `<ThemedTitle>` component from `@refinedev/mui`. You can remove it by setting `title` prop to `false`.

    ```tsx
    import { AuthPage } from "@refinedev/mui";

    const MyAuthPage = () => {
        return <AuthPage title={false} />;
    };
    ```

    -   `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.

    ```tsx
    import { AuthPage } from "@refinedev/mui";

    const MyAuthPage = () => {
        return (
            <AuthPage
                renderContent={(
                    content: React.ReactNode,
                    title: React.ReactNode,
                ) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {title}
                            <h1 style={{ color: "white" }}>Extra Header</h1>
                            {content}
                            <h1 style={{ color: "white" }}>Extra Footer</h1>
                        </div>
                    );
                }}
            />
        );
    };
    ```

    -   `<ThemedLayout>`, `<ThemedSider>`, `<ThemedTitle>`, `<ThemedHeader>` created to use theme colors.

    -   `<AuthPage>` component uses colors from the theme.
    -   `<ThemedTitle>` added to `AuthPage`

### Patch Changes

-   [#3956](https://github.com/refinedev/refine/pull/3956) [`c54714ed9ab`](https://github.com/refinedev/refine/commit/c54714ed9abd289edef9a6bef4e85b234a6b6e55) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed an issue where the `<NumberField />` component would throw an error if the `value` prop was set to `undefined`.

## 4.3.2

### Patch Changes

-   [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

    -   The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
    -   The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 4.3.1

### Patch Changes

-   [#3948](https://github.com/refinedev/refine/pull/3948) [`b4950503334`](https://github.com/refinedev/refine/commit/b495050333464224f34851c9c57ffab457a3f120) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed the unsaved changes dialog is popping up unexpectedly when the user clicks the delete button or logs out, when the form is dirty.

    -   The `<DeleteButton>` already has a confirmation dialog, so the alert was removed.
    -   The `<Sider>`'s `onClick` handler was changed to use the `window.confirm` API to manage the confirmation dialog.

## 4.3.0

### Minor Changes

-   [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
    -   `title` prop added to `AuthPage` to render a custom title.
        -   ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

-   Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
    -   @refinedev/ui-types@1.3.0

## 4.2.0

### Minor Changes

-   [#3912](https://github.com/refinedev/refine/pull/3912) [`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - `title` prop added to `AuthPage`'s `renderContent` prop to use in the custom content.
    -   `title` prop added to `AuthPage` to render a custom title.
        -   ⚠️ These features have not been implemented yet. Only types were added. It will be implemented in the next release.

### Patch Changes

-   Updated dependencies [[`0ffe70308b2`](https://github.com/refinedev/refine/commit/0ffe70308b24d2d70695399fb0a1b7b76bcf2ccb)]:
    -   @refinedev/ui-types@1.2.0

## 4.1.0

### Minor Changes

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Updated buttons with `resource` property. `resourceNameOrRouteName` is now deprecated but kept working until next major version.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    ## 🪄 Migrating your project automatically with refine-codemod ✨

    [`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

    Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

    ```sh
    npx @refinedev/codemod@latest refine3-to-refine4
    ```

    And it's done. Now your project uses `refine@4.x.x`.

    ## 📝 Changelog

    Deprecated `useMenu` removed from `@refinedev/mui` package. Use `useMenu` from `@refinedev/core` package instead.

    ```diff
    - import { useMenu } from "@refinedev/mui";
    + import { useMenu } from "@refinedev/core";
    ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `meta` prop is added. To ensure backward compatibility, `metaData` prop will be used if `meta` prop is not provided.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Updated the components to match the changes in routing system of `@refinedev/core`.

    ## `meta` property in components

    This includes `meta` props in buttons and `Sider` component. `meta` property can be used to pass additional parameters to the navigation paths.

    For a `posts` resource definition like this:

    ```tsx
    <Refine
        resources={[
            {
                name: "posts",
                list: "/posts",
                show: "/:authorId/posts/:id",
            }
        ]}
    >
    ```

    You can pass `authorId` to the `ShowButton` component like this:

    ```tsx
    <ShowButton resource="posts" id="1" meta={{ authorId: 123 }}>
    ```

    This will navigate to `/123/posts/1` path.

    ## Removed props

    -   `ignoreAccessControlProvider` prop is removed from buttons.
    -   `cardProps`, `cardHeaderProps`, `cardContentProps`, `cardActionsProps` and `actionButtons` props are removed from CRUD component.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    All **Material UI** components re-exported from `@refinedev/mui` have been removed. You should import them from Material UI packages directly.

    If the packages are not installed, you can install them with your package manager:

    > You don't have to install all of these packages below. Only install the packages you use.

    ```bash
    npm install @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
    # or
    pnpm add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
    # or
    yarn add @mui/material @emotion/react @emotion/styled @mui/lab @mui/x-data-grid
    ```

    After that, you can import them from related packages directly.

    ```diff
    - import {
    -    Box,
    -    NumberField,
    -    Stack,
    -    Typography,
    -    ThemeProvider,
    -    DataGrid
    -    LoadingButton,
    - } from "@refinedev/mui";

    + import { NumberField } from "@refinedev/mui";
    + import { ThemeProvider } from "@mui/material/styles";
    + import { Box, Stack, Typography } from "@mui/material";
    + import { DataGrid } from "@mui/x-data-grid";
    + import { LoadingButton } from "@mui/lab";
    ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    -   `<ReadyPage>` isnow deprecated.
    -   Created a `<WelcomePage>` component to welcome users.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!

    -   `useAutocomplete`'s sort prop is now deprecated. Use `sorters` prop instead.

    ```diff
    useAutocomplete({
    -    sort,
    +    sorters,
    })
    ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    Added legacy auth provider and new auth provider support to all components and hooks.

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    `useDataGrid` return values and properties are updated.

    -   `initialCurrent` and `initialPageSize` props are now deprecated. Use `pagination` prop instead.
    -   To ensure backward compatibility, `initialCurrent` and `initialPageSize` props will work as before.

        ```diff
        useDataGrid({
        -    initialCurrent,
        -    initialPageSize,
        +    pagination: {
        +        current,
        +        pageSize,
        +    },
        })
        ```

    -   `hasPagination` prop is now deprecated. Use `pagination.mode` instead.
    -   To ensure backward compatibility, `hasPagination` prop will work as before.

        ```diff
        useDataGrid({
        -    hasPagination,
        +    pagination: {
        +        mode: "off" | "server" | "client",
        +    },
        })
        ```

    -   `initialSorter` and `permanentSorter` props are now deprecated. Use `sorters.initial` and `sorters.permanent` instead.
    -   To ensure backward compatibility, `initialSorter` and `permanentSorter` props will work as before.

        ```diff
        useDataGrid({
        -    initialSorter,
        -    permanentSorter,
        +    sorters: {
        +        initial,
        +        permanent,
        +    },
        })
        ```

    -   `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props are now deprecated. Use `filters.initial`, `filters.permanent`, and `filters.defaultBehavior` instead.
    -   To ensure backward compatibility, `initialFilter`, `permanentFilter`, and `defaultSetFilterBehavior` props will work as before.

        ```diff
        useDataGrid({
        -    initialFilter,
        -    permanentFilter,
        -    defaultSetFilterBehavior,
        +    filters: {
        +        initial,
        +        permanent,
        +        defaultBehavior,
        +    },
        })
        ```

    -   `sorter` and `setSorter` return values are now deprecated. Use `sorters` and `setSorters` instead.
    -   To ensure backward compatibility, `sorter` and `setSorter` return values will work as before.

        ```diff
        const {
        -   sorter,
        +   sorters,
        -   setSorter,
        +   setSorters,
        } = useDataGrid();
        ```

-   Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
    **Moving to the `@refinedev` scope 🎉🎉**

    Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

    Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 3.63.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-react-hook-form@3.39.0
    -   @pankod/refine-ui-types@0.16.0

## 3.62.0

### Minor Changes

-   [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

### Patch Changes

-   Updated dependencies [[`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb)]:
    -   @pankod/refine-react-hook-form@3.38.0
    -   @pankod/refine-ui-types@0.15.0

## 3.61.5

### Patch Changes

-   [#3517](https://github.com/refinedev/refine/pull/3517) [`ce6ed28ce3d`](https://github.com/refinedev/refine/commit/ce6ed28ce3d4c6909b6936342738e161af02ed5b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix multi-level Sider menu. (#3505)

## 3.61.4

### Patch Changes

-   [#3517](https://github.com/refinedev/refine/pull/3517) [`ce6ed28ce3d`](https://github.com/refinedev/refine/commit/ce6ed28ce3d4c6909b6936342738e161af02ed5b) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix multi-level Sider menu. (#3505)

## 3.61.3

### Patch Changes

-   [#3399](https://github.com/refinedev/refine/pull/3399) [`22b44a857a8`](https://github.com/refinedev/refine/commit/22b44a857a8ede3473965ab6baff70fc8ae31332) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix `useTable` hook error return type.

## 3.61.2

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   [`93a7d7088ae`](https://github.com/refinedev/refine/commit/93a7d7088aee1ec6baad3b33f646fa67b25f4af0) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `experimental_sx` export

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.2

## 3.61.1

### Patch Changes

-   [#3220](https://github.com/refinedev/refine/pull/3220) [`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b) Thanks [@aliemir](https://github.com/aliemir)! - Updated image links in `README.MD` with CDN

-   [`93a7d7088ae`](https://github.com/refinedev/refine/commit/93a7d7088aee1ec6baad3b33f646fa67b25f4af0) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `experimental_sx` export

-   Updated dependencies [[`b867497f469`](https://github.com/refinedev/refine/commit/b867497f4694a5fbd330106a39256dee3c56199b)]:
    -   @pankod/refine-ui-types@0.14.1

## 3.61.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.60.0

### Minor Changes

-   [#3159](https://github.com/refinedev/refine/pull/3159) [`af2eefb32a4`](https://github.com/refinedev/refine/commit/af2eefb32a4df157062c28125c53aa3a47f48ff8) Thanks [@aliemir](https://github.com/aliemir)! - Updated `LoginPage` and `ReadyPage` to use **refine** logos from CDN rather than bundled svg files.

## 3.59.4

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.59.3

### Patch Changes

-   [#3128](https://github.com/refinedev/refine/pull/3128) [`db1000a7628`](https://github.com/refinedev/refine/commit/db1000a7628d910c965eb63cd1cff81ffcd4fd4a) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `crud` components import path changed to relative path due to export issues on build.

## 3.59.2

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.59.1

### Patch Changes

-   [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - Updated `swizzle` items and their messages to include extra information and usage examples.

## 3.59.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 3.58.0

### Minor Changes

-   [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - - Updated components and their type imports to make them compatible with `swizzle` feature.
    -   Added `refine.config.js` to configure the `swizzle` feature.

## 3.57.0

### Minor Changes

-   [#3076](https://github.com/refinedev/refine/pull/3076) [`bcd47eabbfc`](https://github.com/refinedev/refine/commit/bcd47eabbfc911ff622d30bf5bbdcc3a9a7d8565) Thanks [@ahhshm](https://github.com/ahhshm)! - exported material-ui localization files

## 3.56.0

### Minor Changes

-   [#3076](https://github.com/refinedev/refine/pull/3076) [`bcd47eabbfc`](https://github.com/refinedev/refine/commit/bcd47eabbfc911ff622d30bf5bbdcc3a9a7d8565) Thanks [@ahhshm](https://github.com/ahhshm)! - exported material-ui localization files

## 3.55.2

### Patch Changes

-   [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Prevented server request when empty filter value is provided.

## 3.55.1

### Patch Changes

-   [#2975](https://github.com/refinedev/refine/pull/2975) [`249f9521c4`](https://github.com/refinedev/refine/commit/249f9521c4981819c2641be131d1dfb270b1d48b) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Prevented server request when empty filter value is provided.

## 3.55.0

### Minor Changes

-   [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

    > **The option set in individual CRUD components takes priority over the global option**

## 3.54.0

### Minor Changes

-   [#2872](https://github.com/refinedev/refine/pull/2872) [`da3fc4a702`](https://github.com/refinedev/refine/commit/da3fc4a702b3ea50f7c1a2cc484fe6364fc3ddc0) Thanks [@TDP17](https://github.com/TDP17)! - Feat: Added ability to manage breadcrumb component globally via options

    > **The option set in individual CRUD components takes priority over the global option**

## 3.53.0

### Minor Changes

-   [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

    `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

    **Features**

    `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
    `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

-   [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

-   [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

-   Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516), [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
    -   @pankod/refine-ui-types@0.14.0

## 3.52.0

### Minor Changes

-   [#2836](https://github.com/refinedev/refine/pull/2836) [`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - added locales prop to date fields

### Patch Changes

-   Updated dependencies [[`e43e9a17ae`](https://github.com/refinedev/refine/commit/e43e9a17ae0ed41e649b8026b2b04d850136dcfd)]:
    -   @pankod/refine-ui-types@0.13.0

## 3.51.0

### Minor Changes

-   [#2839](https://github.com/refinedev/refine/pull/2839) [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516) Thanks [@aliemir](https://github.com/aliemir)! - **Deprecation**

    `ignoreAccessControlProvider` prop on buttons is deprecated. Use `accessContro.enabled` instead.

    **Features**

    `accessControl.enabled` prop is added to buttons to enable/disable access control for buttons.
    `accessControl.hideIfUnauthorized` prop is added to buttons to hide the button if access is denied.

### Patch Changes

-   [#2838](https://github.com/refinedev/refine/pull/2838) [`f7968fa16f`](https://github.com/refinedev/refine/commit/f7968fa16f9930442e1122fe5294e350252bdd5c) Thanks [@aliemir](https://github.com/aliemir)! - Fixed #2828 - Buttons were not respecting access control when navigating to a new page. Now, if button is disabled, it will not also block the navigation not just the onClick event.

-   Updated dependencies [[`476285e342`](https://github.com/refinedev/refine/commit/476285e3427c7e065892a281da529c038aee83d2), [`5388a338ab`](https://github.com/refinedev/refine/commit/5388a338abb9a5e03599da0a2786bea394cbc516)]:
    -   @pankod/refine-ui-types@0.12.0

## 3.50.7

### Patch Changes

-   Fix login link alignment on forgot password page.

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.6

## 3.50.6

### Patch Changes

-   [#2787](https://github.com/refinedev/refine/pull/2787) [`eeb7303b8b`](https://github.com/refinedev/refine/commit/eeb7303b8b413f00b74802d08791adc560af5fe2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fix login link alignment on forgot password page.

-   Updated dependencies [[`19124711a7`](https://github.com/refinedev/refine/commit/19124711a7dc23c0b0e61bc845fbd294927999da)]:
    -   @pankod/refine-ui-types@0.11.5

## 3.50.5

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.4

### Patch Changes

-   Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.3

### Patch Changes

-   [#2712](https://github.com/refinedev/refine/pull/2712) [`c434055011`](https://github.com/refinedev/refine/commit/c434055011cbdd846c9f228c23987607bb828a1b) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `providers` property empty array state in `<AuthPage />` component

## 3.50.2

### Patch Changes

-   Add AuthProps type export

## 3.50.1

### Patch Changes

-   [#2666](https://github.com/refinedev/refine/pull/2666) [`8a562d2114`](https://github.com/refinedev/refine/commit/8a562d2114b7145707070e363981a4e31e02547a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add AuthProps type export

## 3.50.0

### Minor Changes

-   -   Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.49.0

### Minor Changes

-   [#2627](https://github.com/refinedev/refine/pull/2627) [`c5fb45d61f`](https://github.com/refinedev/refine/commit/c5fb45d61fa7470a7a34762ad19d17e9f87e4421) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added new <AuthPage /> component core and mantine support.
    -   Move Auth types `@pankod/refine-ui-types` to `@pankod/refine-core`

## 3.48.2

### Patch Changes

-   fix(material-ui): fix missing `<Header />` component export

## 3.48.1

### Patch Changes

-   [#2635](https://github.com/refinedev/refine/pull/2635) [`c24fb19264`](https://github.com/refinedev/refine/commit/c24fb192649abb3f1806095ce7ed69b7197b4486) Thanks [@Coinio](https://github.com/Coinio)! - fix(material-ui): fix missing `<Header />` component export

## 3.48.0

### Minor Changes

-   -   Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

    -   Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.47.0

### Minor Changes

-   -   Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

    -   Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.46.0

### Minor Changes

-   [#2580](https://github.com/refinedev/refine/pull/2580) [`e1ab7da6b3`](https://github.com/refinedev/refine/commit/e1ab7da6b335bad62b15a537a3ed63c9f113bd01) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Added `<AuthPage>` for Material UI package of **refine**. `<AuthPage>` is a component that provides a login, register, forgot password and update password pages.

    -   Deprecated `LoginPage`.

    **Before**

    ```tsx
    import { LoginPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={LoginPage}
      ...
    />
    ```

    **After**

    ```tsx
    import { AuthPage } from "@pankod/refine-mui";

    <Refine
      LoginPage={AuthPage}
      ...
    />
    ```

## 3.45.9

### Patch Changes

-   ReadyPage examples link fixed.

## 3.45.8

### Patch Changes

-   [#2505](https://github.com/refinedev/refine/pull/2505) [`a4dbb63c88`](https://github.com/refinedev/refine/commit/a4dbb63c881a83e5146829130b1377e791b44469) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ReadyPage examples link fixed.

## 3.45.7

### Patch Changes

-   Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

-   Removed redundant type inheritance

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.2

## 3.45.6

### Patch Changes

-   [#2586](https://github.com/refinedev/refine/pull/2586) [`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b) Thanks [@necatiozmen](https://github.com/necatiozmen)! - Removed redundant type inheritance

-   Updated dependencies [[`d7c8b7642b`](https://github.com/refinedev/refine/commit/d7c8b7642b7ed41a2063798e779c3cfaa09b0e7b)]:
    -   @pankod/refine-ui-types@0.11.1

## 3.45.5

### Patch Changes

-   [#2585](https://github.com/refinedev/refine/pull/2585) [`e7ab42a73b`](https://github.com/refinedev/refine/commit/e7ab42a73b87625b2646864118ad25cbe31295ad) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `disabled` attribute of buttons in CRUD components according to `isLoading` prop.

## 3.45.4

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.11.0

## 3.45.3

### Patch Changes

-   Updated dependencies [[`a65525de6f`](https://github.com/refinedev/refine/commit/a65525de6f995babfca1058e933cdbea67d6032e)]:
    -   @pankod/refine-ui-types@0.10.0

## 3.45.2

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.9.0

## 3.45.1

### Patch Changes

-   Updated dependencies [[`ad99916d6d`](https://github.com/refinedev/refine/commit/ad99916d6dbd181b857fd7df7b9619d8cac5e3e0)]:
    -   @pankod/refine-ui-types@0.8.0

## 3.45.0

### Minor Changes

-   Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

-   Fixed version of react-router to `6.3.0`

-   Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-mui`.

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.33.2
    -   @pankod/refine-ui-types@0.7.0

## 3.44.2

### Patch Changes

-   [#2501](https://github.com/refinedev/refine/pull/2501) [`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed version of react-router to `6.3.0`

-   Updated dependencies [[`4095a578d4`](https://github.com/refinedev/refine/commit/4095a578d471254ee58412f130ac5a0f3a62880f)]:
    -   @pankod/refine-react-hook-form@3.33.1

## 3.44.1

### Patch Changes

-   [#2492](https://github.com/refinedev/refine/pull/2492) [`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9) Thanks [@ozkalai](https://github.com/ozkalai)! - Passed `collapsed` prop to `render` method in `Sider` component of `@pankod/refine-mui`.

-   Updated dependencies [[`7d5bf3023d`](https://github.com/refinedev/refine/commit/7d5bf3023d00617890ffa7f9d22b1116af15e0b9)]:
    -   @pankod/refine-ui-types@0.6.1

## 3.44.0

### Minor Changes

-   [#2454](https://github.com/refinedev/refine/pull/2454) [`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af) Thanks [@ozkalai](https://github.com/ozkalai)! - Added `render` prop to `Sider` component. You can get `dashboard`, `logout` and `items` from `render` props to customize the `Sider` component.

### Patch Changes

-   Updated dependencies [[`72487a4126`](https://github.com/refinedev/refine/commit/72487a4126fb7d827dccd3bcbdee9a83aa1f56af)]:
    -   @pankod/refine-ui-types@0.6.0

## 3.43.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   Update `ThemeProvider` export as value instead of type.

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.33.0
    -   @pankod/refine-ui-types@0.5.0

## 3.42.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

### Patch Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update `ThemeProvider` export as value instead of type.

-   Updated dependencies [[`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af), [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af)]:
    -   @pankod/refine-react-hook-form@3.32.0
    -   @pankod/refine-ui-types@0.4.0

## 3.41.16

### Patch Changes

-   Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

    ```tsx
    <Refine
        accessControlProvider={{
            can: async ({ action, resource }) => {
                // console.log({ action, resource });
                // output: {action: "list", resource: "cms" }

                return { can: true };
            },
        }}
        resources={[
            {
                name: "CMS",
            },
            {
                name: "posts",
                parentName: "CMS",
                list: PostList,
            },
        ]}
    />
    ```

## 3.41.15

### Patch Changes

-   [#2411](https://github.com/refinedev/refine/pull/2411) [`c61470a2e0`](https://github.com/refinedev/refine/commit/c61470a2e00df94a211395541601fd39b63e2cff) Thanks [@omeraplak](https://github.com/omeraplak)! - Fix: Wrap with [`<CanAccess />`](https://refine.dev/docs/core/components/accessControl/can-access/) component to parent sider items

    ```tsx
    <Refine
        accessControlProvider={{
            can: async ({ action, resource }) => {
                // console.log({ action, resource });
                // output: {action: "list", resource: "cms" }

                return { can: true };
            },
        }}
        resources={[
            {
                name: "CMS",
            },
            {
                name: "posts",
                parentName: "CMS",
                list: PostList,
            },
        ]}
    />
    ```

## 3.41.14

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 3.41.13

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 3.41.12

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 3.41.11

### Patch Changes

-   [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 3.41.10

### Patch Changes

-   `lodash` moved to dependencies.

## 3.41.9

### Patch Changes

-   [#2350](https://github.com/refinedev/refine/pull/2350) [`f8e5d99598`](https://github.com/refinedev/refine/commit/f8e5d99598265af434f25fde104fafc9b7cac792) Thanks [@ozkalai](https://github.com/ozkalai)! - `lodash` moved to dependencies.

## 3.41.8

### Patch Changes

-   Added React 17 support to `peerDependencies`.

## 3.41.7

### Patch Changes

-   [#2306](https://github.com/refinedev/refine/pull/2306) [`bb3183d3eb`](https://github.com/refinedev/refine/commit/bb3183d3eb4b257cafd98f0ef8949e4c0ddb9e90) Thanks [@aliemir](https://github.com/aliemir)! - Added React 17 support to `peerDependencies`.

## 3.41.6

### Patch Changes

-   Fixed `StackProps` and `StackTypeMap` type exports

## 3.41.5

### Patch Changes

-   [#2300](https://github.com/refinedev/refine/pull/2300) [`59f9e5eebf`](https://github.com/refinedev/refine/commit/59f9e5eebf372da36fc953d1affb04f393aac88d) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `StackProps` and `StackTypeMap` type exports

## 3.41.4

### Patch Changes

-   Upgraded `react-query` version to 4.

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.31.2

## 3.41.3

### Patch Changes

-   [#2260](https://github.com/refinedev/refine/pull/2260) [`a97ec592df`](https://github.com/refinedev/refine/commit/a97ec592dfb6dcf5b5bd063d2d76f50ca195c20e) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Upgraded `react-query` version to 4.

-   Updated dependencies [[`6847672849`](https://github.com/refinedev/refine/commit/68476728494dc0fd412883de30e2c99c75a1d559)]:
    -   @pankod/refine-react-hook-form@3.31.1

## 3.41.2

### Patch Changes

-   Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

*   Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

    Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

    Updated `@pankod/refine-ui-tests` `fields` properties.

-   Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

    Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

-   Updated dependencies []:
    -   @pankod/refine-ui-types@0.3.0

## 3.41.1

### Patch Changes

-   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Remove `data-testid` props from buttons in crud components to make use of button test ids presented by `@pankod/refine-ui-types` package.

*   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` properties by using `@pankod/refine-ui-types` common `fields` types.

    Updated `@pankod/refine-antd` and `@pankod/refine-mui` `fields` tests by using `@pankod/refine-ui-tests` common `fields` tests.

    Updated `@pankod/refine-ui-tests` `fields` properties.

-   [#2216](https://github.com/refinedev/refine/pull/2216) [`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a) Thanks [@aliemir](https://github.com/aliemir)! - Added `@pankod/refine-ui-tests` and `@pankod/refine-ui-types` packages. Now, all of button prop types comes from `@pankod/refine-ui-types` package and all of button tests comes from `@pankod/refine-ui-tests` package.

    Thus, button types and tests are managed by `@pankod/refine-ui-types` package and `@pankod/refine-ui-tests` package.

-   Updated dependencies [[`201846c77d`](https://github.com/refinedev/refine/commit/201846c77dba07a61f0c0335716b60641430c22a)]:
    -   @pankod/refine-ui-types@0.2.0

## 3.41.0

### Minor Changes

-   Add React@18 support 🚀

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.31.0

## 3.40.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

### Patch Changes

-   Updated dependencies [[`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb)]:
    -   @pankod/refine-react-hook-form@3.30.0

## 3.39.2

### Patch Changes

-   Updated `console.warn`'s to trigger once.

## 3.39.1

### Patch Changes

-   [#2223](https://github.com/refinedev/refine/pull/2223) [`0a215f2000`](https://github.com/refinedev/refine/commit/0a215f2000b4069618e42efda48b8864b38129fd) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Updated `console.warn`'s to trigger once.

## 3.39.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-react-hook-form@3.29.0

## 3.38.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

### Patch Changes

-   Updated dependencies [[`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5)]:
    -   @pankod/refine-react-hook-form@3.28.0

## 3.37.2

### Patch Changes

-   Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.0

## 3.37.1

### Patch Changes

-   [#2106](https://github.com/refinedev/refine/pull/2106) [`10a20d8714`](https://github.com/refinedev/refine/commit/10a20d87142b694bc9c02afaee5b4fe6c5853c5a) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `dataProviderName` property for `<RefreshButton>` and `<DeleteButton>` in `<Edit>` and `<Show>` CRUD components - #2096

-   Updated dependencies [[`9d77c63a92`](https://github.com/refinedev/refine/commit/9d77c63a925dca0133b3e83974dff486a2233017), [`98966b586f`](https://github.com/refinedev/refine/commit/98966b586f6febd8669065b5b453a8e441f76bc1)]:
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

-   [#2072](https://github.com/refinedev/refine/pull/2072) [`bbca622ede`](https://github.com/refinedev/refine/commit/bbca622eded117271350aa178b3e757c890c5bc4) Thanks [@salihozdemir](https://github.com/salihozdemir)! - The `useDataGrid` hook required the `columns` property. Therefore, the `queryResult` could not be used in the `columns`. Now, we can define the `columns` property wherever we want since the `useDataGrid` hook does not take the `column` property.

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

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated `useDataGrid` hook with `hasPagination` to enable/disable pagination.

    **Implementation**

    Updated the `useDataGrid` accordingly to the changes in the `useTable` of `@pankod/refine-core`. `hasPagination` property is being send directly to the `useTable` of `@pankod/refine-core` to disable pagination.

    **Use Cases**

    In some data providers, some of the resources might not support pagination which was not supported prior to these changes. To handle the pagination on the client-side or to disable completely, users can set `hasPagination` to `false`.

### Patch Changes

-   [#2061](https://github.com/refinedev/refine/pull/2061) [`0237725cf3`](https://github.com/refinedev/refine/commit/0237725cf32923f7d24d3f0c9a2994de30baa921) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Fixed `<Link>` usage in packages.

    ```diff
    - <Link href={route} to={route}>
    -    {label}
    - </Link>
    + <Link to={route}>{label}</Link>
    ```

    We used to have to pass `href` and `to` for Next.js and React applications, now we just need to pass `to`. **refine** router providers handle for us.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
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

-   [#2027](https://github.com/refinedev/refine/pull/2027) [`fe2df4b788`](https://github.com/refinedev/refine/commit/fe2df4b788ceb367db4e949507b9f6a9f8174582) Thanks [@biskuvit](https://github.com/biskuvit)! - - Created `<Breadcrumb>` component from [`<Breadcrumbs>`](https://mui.com/material-ui/react-breadcrumbs/#api)
    -   Added `<Breadcrumb>` component to `CRUD` components. (`<List>`, `<Create>`, `<Edit>`, `<Show>`)
    -   Added breadcrumb props to all `CRUD` components. We can use `breadcrumbs` prop to add custom breadcrumbs.

### Patch Changes

-   [#2063](https://github.com/refinedev/refine/pull/2063) [`2067ac6bcb`](https://github.com/refinedev/refine/commit/2067ac6bcba93bc98c91e7e0a012e203120d42dc) Thanks [@aliemir](https://github.com/aliemir)! - Fixed missing imports (`DefaultColorScheme`, `ExtendedColorScheme` and `ThemeInput`) in `@mui/material/styles` in `@pankod/refine-mui` package.

-   Updated dependencies [[`0338ce9d6b`](https://github.com/refinedev/refine/commit/0338ce9d6bee673b76a18cf9e6ad480fd9928e09)]:
    -   @pankod/refine-core@3.34.1

## 3.30.9

### Patch Changes

-   [#2039](https://github.com/refinedev/refine/pull/2039) [`6c8e1c9be2`](https://github.com/refinedev/refine/commit/6c8e1c9be273ade2ba918490f319880ddd4d60ed) Thanks [@ozkalai](https://github.com/ozkalai)! - Added the `description` property to the notifications

## 3.30.8

### Patch Changes

-   We have fixed texts with translations of default login pages in Material UI and Headless.

*   Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

-   dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

-   Updated dependencies []:
    -   @pankod/refine-core@3.34.0

## 3.30.7

### Patch Changes

-   [#2029](https://github.com/refinedev/refine/pull/2029) [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184) Thanks [@ozkalai](https://github.com/ozkalai)! - We have fixed texts with translations of default login pages in Material UI and Headless.

*   [#2033](https://github.com/refinedev/refine/pull/2033) [`14e14709ec`](https://github.com/refinedev/refine/commit/14e14709ecd8f2c5106cbcaca3a1acd966d69a07) Thanks [@ozkalai](https://github.com/ozkalai)! - Update default variant of `<DeleteButton>` to `text` and replace overrides in the `<Edit>` crud component.

-   [#2022](https://github.com/refinedev/refine/pull/2022) [`01f8631953`](https://github.com/refinedev/refine/commit/01f8631953c17f7e5ef2c6b7aa20aed825b7f235) Thanks [@biskuvit](https://github.com/biskuvit)! - dashboard icon changed from `<ListOutlined>` to [`<Dashboard>`](https://mui.com/material-ui/material-icons/?query=Dashboard&selected=Dashboard) in `<Sider>` for **Material UI** package

-   Updated dependencies [[`d96ba1e9c8`](https://github.com/refinedev/refine/commit/d96ba1e9c88724ee0b0d828bc4589befcb7a783d), [`b257d87fef`](https://github.com/refinedev/refine/commit/b257d87fef4e8572e4c463894e9d79af96d78184), [`12f08ae6a3`](https://github.com/refinedev/refine/commit/12f08ae6a3755487cd0e4f498b7fc3c2a9488c58)]:
    -   @pankod/refine-core@3.33.0

## 3.30.6

### Patch Changes

-   Add Dashboard item to default `<Sider/>`

-   Updated dependencies []:
    -   @pankod/refine-core@3.32.0

## 3.30.5

### Patch Changes

-   [#2009](https://github.com/refinedev/refine/pull/2009) [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0) Thanks [@aliemir](https://github.com/aliemir)! - Add Dashboard item to default `<Sider/>`

-   Updated dependencies [[`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`498c425a0e`](https://github.com/refinedev/refine/commit/498c425a0e069b6b972a344ff32af46852306c71), [`5b893a9bff`](https://github.com/refinedev/refine/commit/5b893a9bff707d90b0f898a52d46a7154108b0a0)]:
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

-   [#1945](https://github.com/refinedev/refine/pull/1945) [`592a401924`](https://github.com/refinedev/refine/commit/592a40192482cf88108348ed21db437e6d304a43) Thanks [@omeraplak](https://github.com/omeraplak)! - Could not stop `e.preventDefault()` redirection in Next.js `<Link>` component. So we added in `e.stopPropagation()` for [Ant Design Buttons](https://refine.dev/docs/ui-frameworks/antd/components/buttons/clone-button/) and [Material UI Buttons](https://refine.dev/docs/ui-frameworks/mui/components/buttons/clone-button/)

## 3.30.1

### Patch Changes

-   [#1936](https://github.com/refinedev/refine/pull/1936) [`0695c6fa01`](https://github.com/refinedev/refine/commit/0695c6fa01716620dda842e1dd44222e06650d51) Thanks [@omeraplak](https://github.com/omeraplak)! - We've updated `secondary` color to `#2A132E`

-   Updated dependencies [[`4012d3c4ae`](https://github.com/refinedev/refine/commit/4012d3c4aeb61a6190f7624b662cbd20ca900679)]:
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

-   [#1911](https://github.com/refinedev/refine/pull/1911) [`6aa09d34b8`](https://github.com/refinedev/refine/commit/6aa09d34b8756d22b76cb9804814594e730587b0) Thanks [@biskuvit](https://github.com/biskuvit)! - Added new provider. `<RefineSnackbarProvider/>` for notifications.

## 3.25.2

### Patch Changes

-   [#1909](https://github.com/refinedev/refine/pull/1909) [`0170b1306d`](https://github.com/refinedev/refine/commit/0170b1306d38d20891a189e3103a7a8bddd3a3dc) Thanks [@aliemir](https://github.com/aliemir)! - Renamed export `notificationProviderHandle` from `@pankod/refine-mui` to `notificationProvider` for consistency across packages

*   [#1896](https://github.com/refinedev/refine/pull/1896) [`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746) Thanks [@aliemir](https://github.com/aliemir)! - Added missing exports from `notistack` package.

*   Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
    -   @pankod/refine-core@3.26.0

## 3.25.1

### Patch Changes

-   [#1898](https://github.com/refinedev/refine/pull/1898) [`906cf51eca`](https://github.com/refinedev/refine/commit/906cf51eca72201d4469a5e2f5cbd7842b9a2796) Thanks [@ozkalai](https://github.com/ozkalai)! - We are fixed the buttons' icon fontSize when hideText prop passed

*   [#1889](https://github.com/refinedev/refine/pull/1889) [`683fd6f932`](https://github.com/refinedev/refine/commit/683fd6f932624e284195005c8408935a89da73d3) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `ReadyPage` to be responsive for any screen

-   [#1878](https://github.com/refinedev/refine/pull/1878) [`07a2c48157`](https://github.com/refinedev/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `svgButtonProps` property for Material UI buttons.

    ```tsx
    <CreateButton svgButtonProps={{ size: "small" }} />
    ```

*   [#1890](https://github.com/refinedev/refine/pull/1890) [`607de3446b`](https://github.com/refinedev/refine/commit/607de3446ba314a05e9deca88dd41a09f343e7b9) Thanks [@biskuvit](https://github.com/biskuvit)! - Fixed Material UI `<ErrorComponent />` to be responsive for any screen

## 3.18.0-next.1

### Minor Changes

-   [#1877](https://github.com/refinedev/refine/pull/1877) [`5bc54c25d6`](https://github.com/refinedev/refine/commit/5bc54c25d60bce9af44ae3feb1c9e4cb38c8b866) Thanks [@aliemir](https://github.com/aliemir)! - Add `useDataGrid` hook documentation.

### Patch Changes

-   [#1878](https://github.com/refinedev/refine/pull/1878) [`07a2c48157`](https://github.com/refinedev/refine/commit/07a2c481572d31bb50dbfa1160ff1759b6b50fbb) Thanks [@omeraplak](https://github.com/omeraplak)! - Passed svgButtonProps to mui buttons

## 3.17.1-next.0

### Patch Changes

-   [#1755](https://github.com/refinedev/refine/pull/1755) [`a81836bc36`](https://github.com/refinedev/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.

*   [#1755](https://github.com/refinedev/refine/pull/1755) [`a81836bc36`](https://github.com/refinedev/refine/commit/a81836bc3670fbcceb4dac7d1f6b3c006fcee9bc) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Notistack toast mobile view fixed

## 3.17.0-next.0

### Minor Changes

-   [#1867](https://github.com/refinedev/refine/pull/1867) [`da2e12314d`](https://github.com/refinedev/refine/commit/da2e12314de122405268d07982aa27998c127de4) Thanks [@ozkalai](https://github.com/ozkalai)! - Notistack toast mobile view fixed

### Patch Changes

-   [#1850](https://github.com/refinedev/refine/pull/1850) [`40b3faca10`](https://github.com/refinedev/refine/commit/40b3faca10d420d5ac21fb9a591db86c009439b8) Thanks [@ozkalai](https://github.com/ozkalai)! - [Notistack](https://github.com/iamhosseindhv/notistack) `SnackbarProvider` which is used as a notification provider (from `@pankod/refine-mui`) has been made compatible with the theme in the example of the fine food.
