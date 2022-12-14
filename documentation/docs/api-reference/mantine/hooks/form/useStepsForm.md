---
id: useStepsForm
title: useStepsForm
---

`useStepsForm` allows you to manage a form with multiple steps. It provides features such as which step is currently active, the ability to go to a specific step and validation when changing steps etc.

:::info
`useStepsForm` hook based on [`useForm`][use-form-refine-mantine] hook provided by `@pankod/refine-mantine`.
:::

## Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useStepsForm` is used in both.

Let's create our `<PostList>` component to redirect to create and edit pages.

<details>
  <summary>PostList</summary>
  <div>

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import {
    Box,
    Group,
    List,
    ScrollArea,
    Select,
    Table,
    Pagination,
    EditButton,
    DeleteButton,
    DateField,
} from "@pankod/refine-mantine";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { FilterElementProps, ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
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
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select
                                defaultValue="published"
                                data={[
                                    { label: "Published", value: "published" },
                                    { label: "Draft", value: "draft" },
                                    { label: "Rejected", value: "rejected" },
                                ]}
                                {...props}
                            />
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
                enableColumnFilter: false,
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <EditButton
                                hideText
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={getValue() as number}
                            />
                        </Group>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <ScrollArea>
            <List>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder && (
                                                <Group spacing="xs" noWrap>
                                                    <Box>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                    </Box>
                                                    <Group spacing="xs" noWrap>
                                                        <ColumnSorter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                        <ColumnFilter
                                                            column={
                                                                header.column
                                                            }
                                                        />
                                                    </Group>
                                                </Group>
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
                                                    cell.column.columnDef.cell,
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
    );
};
```

  </div>
</details>

### Create Form

In this component you can see how `useStepsForm` is used to manage the steps and form.

```tsx title="src/pages/posts/create.tsx"
import {
    Button,
    Code,
    Create,
    Group,
    Select,
    Stepper,
    TextInput,
    useStepsForm,
    SaveButton,
    Text,
} from "@pankod/refine-mantine";
import { RichTextEditor } from "@mantine/rte";
import { DatePicker } from "@mantine/dates";

export const PostCreate: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        values,
        steps: { currentStep, gotoStep },
    } = useStepsForm({
        initialValues: {
            title: "",
            status: "",
            slug: "",
            createdAt: new Date(),
            content: "",
        },
        validate: (values) => {
            // validation for each step
            if (currentStep === 0) {
                return {
                    title: values.title ? null : "Title is required",
                    slug: values.slug ? null : "Slug is required",
                };
            }

            if (currentStep === 1) {
                return {
                    status: values.status ? null : "Status is required",
                    createdAt: values.createdAt
                        ? null
                        : "CreatedAt is required",
                };
            }

            return {};
        },
    });

    return (
        <Create
            // Next, previous and save buttons
            footerButtons={
                <Group position="right" mt="xl">
                    {currentStep !== 0 && (
                        <Button
                            variant="default"
                            onClick={() => gotoStep(currentStep - 1)}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep !== 3 && (
                        <Button onClick={() => gotoStep(currentStep + 1)}>
                            Next step
                        </Button>
                    )}
                    {currentStep === 2 && <SaveButton {...saveButtonProps} />}
                </Group>
            }
        >
            <Stepper active={currentStep} breakpoint="sm">
                <Stepper.Step label="First Step">
                    <TextInput
                        mt="md"
                        label="Title"
                        placeholder="Title"
                        {...getInputProps("title")}
                    />
                    <TextInput
                        mt="md"
                        label="Slug"
                        placeholder="Slug"
                        {...getInputProps("slug")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Second Step">
                    <Select
                        mt="md"
                        label="Status"
                        placeholder="Pick one"
                        {...getInputProps("status")}
                        data={[
                            { label: "Published", value: "published" },
                            { label: "Draft", value: "draft" },
                            { label: "Rejected", value: "rejected" },
                        ]}
                    />

                    <DatePicker
                        mt="md"
                        label="CreatedAt"
                        placeholder="CreatedAt"
                        {...getInputProps("createdAt")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final Step">
                    <Text mt={8} weight={500} size="sm" color="#212529">
                        Content
                    </Text>
                    <RichTextEditor
                        sx={{ minHeight: 300 }}
                        {...getInputProps("content")}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>
        </Create>
    );
};
```

### Edit Form

Magic, `<PostCreate>` and `<PostEdit>` pages are almost the same. So how are the form's default values set? `useStepsForm` does this with te `id` parameter it reads from the URL and fetches the data from the server.

You can change the `id` as you want with the `setId` that comes out of `refineCore`.

Another part that is different from `<PostCreate>` and `<PostEdit>` is the `value` passed to the `DatePicker` component.

```tsx title="src/pages/posts/edit.tsx"
import {
    Button,
    Code,
    Edit,
    Group,
    Select,
    Stepper,
    TextInput,
    useStepsForm,
    SaveButton,
    Text,
    Space,
} from "@pankod/refine-mantine";
import { RichTextEditor } from "@mantine/rte";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

export const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        values,
        steps: { currentStep, gotoStep },
    } = useStepsForm({
        initialValues: {
            title: "",
            status: "",
            slug: "",
            createdAt: new Date(),
            content: "",
        },
        validate: (values) => {
            // validation for each step
            if (currentStep === 0) {
                return {
                    title: values.title ? null : "Title is required",
                    status: values.status ? null : "Status is required",
                };
            }

            if (currentStep === 1) {
                return {
                    slug: values.slug ? null : "Slug is required",
                    createdAt: values.createdAt
                        ? null
                        : "CreatedAt is required",
                };
            }

            return {};
        },
    });

    return (
        <Edit
            // Next, previous and save buttons
            footerButtons={
                <Group position="right" mt="xl">
                    {currentStep !== 0 && (
                        <Button
                            variant="default"
                            onClick={() => gotoStep(currentStep - 1)}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep !== 3 && (
                        <Button onClick={() => gotoStep(currentStep + 1)}>
                            Next step
                        </Button>
                    )}
                    {currentStep === 2 && <SaveButton {...saveButtonProps} />}
                </Group>
            }
        >
            <Stepper active={currentStep} breakpoint="sm">
                <Stepper.Step label="First Step">
                    <TextInput
                        mt="md"
                        label="Title"
                        placeholder="Title"
                        {...getInputProps("title")}
                    />
                    <TextInput
                        mt="md"
                        label="Slug"
                        placeholder="Slug"
                        {...getInputProps("slug")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Second Step">
                    <Select
                        mt="md"
                        label="Status"
                        placeholder="Pick one"
                        {...getInputProps("status")}
                        data={[
                            { label: "Published", value: "published" },
                            { label: "Draft", value: "draft" },
                            { label: "Rejected", value: "rejected" },
                        ]}
                    />

                    <DatePicker
                        mt="md"
                        label="CreatedAt"
                        placeholder="CreatedAt"
                        {...getInputProps("createdAt")}
                        value={dayjs(values.createdAt).toDate()}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final Step">
                    <Text mt={8} weight={500} size="sm" color="#212529">
                        Content
                    </Text>
                    <RichTextEditor {...getInputProps("content")} />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>
        </Edit>
    );
};
```

## API Reference

### Properties

| Property                               | Description                                                         | Type                                                              |
| -------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| stepsProps                             | Configuration object for the steps                                  | [`StepsPropsType`](#stepspropstype)                               |
| refineCoreProps                        | Configuration object for the core of the [`useForm`][use-form-core] | [`UseFormProps`](/api-reference/core/hooks/useForm.md#properties) |
| `@mantine/form`'s `useForm` properties | See [useForm][use-form-refine-mantine] documentation                |

<br />

> -   #### StepsPropsType
>
> | Property       | Description                                             | Type      | Default |
> | -------------- | ------------------------------------------------------- | --------- | ------- |
> | defaultStep    | Allows you to set the initial step                      | `number`  | `0`     |
> | isBackValidate | Whether to validation the current step when going back. | `boolean` | `false` |

### Return values

| Property                                  | Description                                                     | Type                                                                        |
| ----------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| steps                                     | Relevant state and method to control the steps                  | [`StepsReturnValues`](#stepsreturnvalues)                                   |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/api-reference/core/hooks/useForm.md#return-values) |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |

<br />

> -   #### StepsReturnValues
>
> | Property    | Description                          | Type                     |
> | ----------- | ------------------------------------ | ------------------------ |
> | currentStep | Current step                         | `boolean`                |
> | gotoStep    | Allows you to go to a specific step. | `(step: number) => void` |

## Example

<StackblitzExample path="form-mantine-use-steps-form" />

[use-form-refine-mantine]: /api-reference/mantine/hooks/form/useForm.md
[use-form-core]: /api-reference/core/hooks/useForm.md
