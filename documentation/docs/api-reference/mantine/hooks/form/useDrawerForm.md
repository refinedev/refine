---
id: useDrawerForm
title: useDrawerForm
---

`useModalForm` hook also allows you to manage a form inside a drawer component, such as a modal component. It provides some useful methods to handle the form drawer.

:::info
`useModalForm` hook based on [`useForm`][use-form-refine-mantine] hook provided by `@pankod/refine-mantine`.
:::

## Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useModalForm` is used in both.

### Create Drawer

First, we'll create a list page for posts. We'll use the [`useTable`](/packages/documentation/react-table.md) hook to manage the table and the `useModalForm` hook as a `useDrawerForm` to manage the form.

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    ScrollArea,
    Table,
    Pagination,
    // highlight-next-line
    useModalForm as useDrawerForm,
} from "@pankod/refine-mantine";

// highlight-next-line
import { CreatePostDrawer } from "../../components";
import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    // highlight-start
    const createDrawerForm = useDrawerForm({
        refineCoreProps: { action: "create" },
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Too short title" : null),
            status: (value) =>
                value.length <= 0 ? "Status is required" : null,
            category: {
                id: (value) =>
                    value.length <= 0 ? "Category is required" : null,
            },
            content: (value) =>
                value.length < 10 ? "Too short content" : null,
        },
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerForm;
    // highlight-end

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    return (
        <>
            // highlight-next-line
            <CreatePostDrawer {...createDrawerForm} />
            <ScrollArea>
                // highlight-next-line
                <List createButtonProps={{ onClick: () => showCreateDrawer() }}>
                    <Table highlightOnHover>
                        <thead>
                            {getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id}>
                                                {!header.isPlaceholder && (
                                                    <div>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <br />
                    <Pagination
                        position="right"
                        total={pageCount}
                        page={current}
                        onChange={setCurrent}
                    />
                </List>
            </ScrollArea>
        </>
    );
};

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}
```

Now, let's see how the `CreatePostDrawer` component is implemented.

```tsx title="src/components/createPostDrawer.tsx"
import { BaseRecord, HttpError } from "@pankod/refine-core";
import {
    UseModalFormReturnType as UseDrawerFormReturnType,
    Drawer,
    TextInput,
    RichTextEditor,
    Select,
    useSelect,
    SaveButton,
    Box,
    Text,
} from "@pankod/refine-mantine";

interface FormValues {
    title: string;
    content: string;
    status: string;
    category: { id: string };
}

export const CreatePostDrawer: React.FC<
    UseDrawerFormReturnType<BaseRecord, HttpError, FormValues>
> = ({
    getInputProps,
    errors,
    modal: { visible, close, title },
    saveButtonProps,
}) => {
    const { selectProps } = useSelect({
        resource: "categories",
    });

    return (
        <Drawer
            opened={visible}
            onClose={close}
            title={title}
            padding="xl"
            size="xl"
            position="right"
        >
            <TextInput
                mt={8}
                label="Title"
                placeholder="Title"
                {...getInputProps("title")}
            />
            <Select
                mt={8}
                label="Status"
                placeholder="Pick one"
                {...getInputProps("status")}
                data={[
                    { label: "Published", value: "published" },
                    { label: "Draft", value: "draft" },
                    { label: "Rejected", value: "rejected" },
                ]}
            />
            <Select
                mt={8}
                label="Category"
                placeholder="Pick one"
                {...getInputProps("category.id")}
                {...selectProps}
            />
            <Text mt={8} weight={500} size="sm" color="#212529">
                Content
            </Text>
            <RichTextEditor
                sx={{ minHeight: 300 }}
                {...getInputProps("content")}
            />
            {errors.content && (
                <Text mt={2} weight={500} size="xs" color="red">
                    {errors.content}
                </Text>
            )}
            <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <SaveButton {...saveButtonProps} />
            </Box>
        </Drawer>
    );
};
```

### Edit Drawer

Now, let's add the edit drawer to the `PostList` component.

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    ScrollArea,
    Table,
    Pagination,
    // highlight-next-line
    EditButton,
    useModalForm as useDrawerForm,
} from "@pankod/refine-mantine";

// highlight-next-line
import { CreatePostDrawer, EditPostDrawer } from "../../components";
import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const createDrawerForm = useDrawerForm({
        refineCoreProps: { action: "create" },
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Too short title" : null),
            status: (value) =>
                value.length <= 0 ? "Status is required" : null,
            category: {
                id: (value) =>
                    value.length <= 0 ? "Category is required" : null,
            },
            content: (value) =>
                value.length < 10 ? "Too short content" : null,
        },
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerForm;

    // highlight-start
    const editDrawerForm = useDrawerForm({
        refineCoreProps: { action: "edit" },
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Too short title" : null),
            status: (value) =>
                value.length <= 0 ? "Status is required" : null,
            category: {
                id: (value) =>
                    value.length <= 0 ? "Category is required" : null,
            },
            content: (value) =>
                value.length < 10 ? "Too short content" : null,
        },
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerForm;
    // highlight-end

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            // highlight-start
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <EditButton
                            hideText
                            size="xs"
                            onClick={() => showEditDrawer(getValue() as number)}
                        />
                    );
                },
            },
            // highlight-end
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    return (
        <>
            <CreatePostDrawer {...createDrawerForm} />
            // highlight-next-line
            <EditPostDrawer {...editDrawerForm} />
            <ScrollArea>
                <List createButtonProps={{ onClick: () => showCreateDrawer() }}>
                    <Table highlightOnHover>
                        <thead>
                            {getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id}>
                                                {!header.isPlaceholder && (
                                                    <div>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <br />
                    <Pagination
                        position="right"
                        total={pageCount}
                        page={current}
                        onChange={setCurrent}
                    />
                </List>
            </ScrollArea>
        </>
    );
};
```

Finally, let's see how the `EditPostDrawer` component is implemented.

```tsx title="src/components/editPostDrawer.tsx"
import { BaseRecord, HttpError } from "@pankod/refine-core";
import {
    UseModalFormReturnType as UseDrawerFormReturnType,
    Drawer,
    TextInput,
    RichTextEditor,
    Select,
    useSelect,
    SaveButton,
    Box,
    Text,
} from "@pankod/refine-mantine";

interface FormValues {
    title: string;
    content: string;
    status: string;
    category: { id: string };
}

export const EditPostDrawer: React.FC<
    UseDrawerFormReturnType<BaseRecord, HttpError, FormValues>
> = ({
    getInputProps,
    errors,
    modal: { visible, close, title },
    refineCore: { queryResult },
    saveButtonProps,
}) => {
    const { selectProps } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    return (
        <Drawer
            opened={visible}
            onClose={close}
            title={title}
            padding="xl"
            size="xl"
            position="right"
        >
            <TextInput
                mt={8}
                label="Title"
                placeholder="Title"
                {...getInputProps("title")}
            />
            <Select
                mt={8}
                label="Status"
                placeholder="Pick one"
                {...getInputProps("status")}
                data={[
                    { label: "Published", value: "published" },
                    { label: "Draft", value: "draft" },
                    { label: "Rejected", value: "rejected" },
                ]}
            />
            <Select
                mt={8}
                label="Category"
                placeholder="Pick one"
                {...getInputProps("category.id")}
                {...selectProps}
            />
            <Text mt={8} weight={500} size="sm" color="#212529">
                Content
            </Text>
            <RichTextEditor {...getInputProps("content")} />
            {errors.content && (
                <Text mt={2} weight={500} size="xs" color="red">
                    {errors.content}
                </Text>
            )}
            <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <SaveButton {...saveButtonProps} />
            </Box>
        </Drawer>
    );
};
```

## API Reference

### Properties

| Property                               | Description                                                         | Type                                                              |
| -------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| modalProps                             | Configuration object for the modal or drawer                        | [`ModalPropsType`](#modalpropstype)                               |
| refineCoreProps                        | Configuration object for the core of the [`useForm`][use-form-core] | [`UseFormProps`](/api-reference/core/hooks/useForm.md#properties) |
| `@mantine/form`'s `useForm` properties | See [useForm][use-form-refine-mantine] documentation                |

<br />

> -   #### ModalPropsType
>
> | Property        | Description                                                             | Type      | Default |
> | --------------- | ----------------------------------------------------------------------- | --------- | ------- |
> | defaultVisible  | Initial visibility state of the modal or drawer                         | `boolean` | `false` |
> | autoSubmitClose | Whether the form should be submitted when the modal or drawer is closed | `boolean` | `true`  |
> | autoResetForm   | Whether the form should be reset when the form is submitted             | `boolean` | `true`  |

### Return values

| Property                                  | Description                                                     | Type                                                                        |
| ----------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| modal                                     | Relevant states and methods to control the modal or drawer      | [`ModalReturnValues`](#modalreturnvalues)                                   |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/api-reference/core/hooks/useForm.md#return-values) |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |

<br />

> -   #### ModalReturnValues
>
> | Property        | Description                                              | Type                                                                             |
> | --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
> | visible         | State of modal of drawer visibility                      | `boolean`                                                                        |
> | show            | Sets the visible state to true                           | `(id?: BaseKey) => void`                                                         |
> | close           | Sets the visible state to false                          | `() => void`                                                                     |
> | submit          | Submits the form                                         | `(values: TVariables) => void`                                                   |
> | title           | Modal or drawer title based on resource and action value | `string`                                                                         |
> | saveButtonProps | Props for a submit button                                | `{ disabled: boolean, onClick: (e: React.FormEvent<HTMLFormElement>) => void; }` |

## Example

<StackblitzExample path="form-mantine-use-drawer-form" />

[use-form-refine-mantine]: /api-reference/mantine/hooks/form/useForm.md
[use-form-core]: /api-reference/core/hooks/useForm.md
