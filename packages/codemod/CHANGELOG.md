# @pankod/refine-codemod

## 3.27.2

### Patch Changes

-   Fixed `@pankod/refine-codemod` build issue

## 3.27.1

### Patch Changes

-   [`031e15e797`](https://github.com/pankod/refine/commit/031e15e79731c3394623969829e5474b947371c8) Thanks [@omeraplak](https://github.com/omeraplak)! - Fixed `@pankod/refine-codemod` build issue

## 3.27.0

### Minor Changes

-   Add Codemod support for changed `columns` usage of `useDataGrid` hook. [#2072](https://github.com/pankod/refine/pull/2072).

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

## 3.26.0

### Minor Changes

-   [#2072](https://github.com/pankod/refine/pull/2072) [`bbca622ede`](https://github.com/pankod/refine/commit/bbca622eded117271350aa178b3e757c890c5bc4) Thanks [@salihozdemir](https://github.com/salihozdemir)! - Add Codemod support for changed `columns` usage of `useDataGrid` hook. [#2072](https://github.com/pankod/refine/pull/2072).

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
