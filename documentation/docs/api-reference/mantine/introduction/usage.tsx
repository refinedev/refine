import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function Usage() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/chakra-ui": "^2.26.17",
        "@tabler/icons": "^1.119.0",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router-v6": "^4.5.4",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@refinedev/react-hook-form": "^4.8.12",
        "@chakra-ui/react": "^2.5.1",
        react: "^18.0.0",
        "react-dom": "^18.0.0",
        "react-router-dom": "^6.8.1",
      }}
      startRoute="/posts"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/index.tsx": {
          code: PagesIndexTsxCode,
        },
        "/pages/posts/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/posts/show.tsx": {
          code: ShowTsxCode,
        },
        "/pages/posts/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/posts/create.tsx": {
          code: CreateTsxCode,
        },
        "/components/pagination/index.tsx": {
          code: PaginationTsxCode,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={RefineThemes.Blue}>
                <Refine
                    notificationProvider={notificationProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const PaginationTsxCode = /* jsx */ `
import { FC } from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { usePagination } from "@refinedev/chakra-ui";

import { IconButton } from "@chakra-ui/react";

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
`;

const PagesIndexTsxCode = /* jsx */ `
export * from "./posts/list.tsx";
export * from "./posts/show.tsx";
export * from "./posts/edit.tsx";
export * from "./posts/create.tsx";
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
    List,
    ShowButton,
    EditButton,
    DeleteButton,
    DateField,
} from "@refinedev/chakra-ui";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    Select,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";

export const PostList: React.FC = () => {
    const columns = React.useMemo(
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
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
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
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        <Text>
                                            {flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext(),
                                            )}
                                        </Text>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};
`.trim();

const ShowTsxCode = /* jsx */ `
import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";

import { Heading, Text, Spacer } from "@chakra-ui/react";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <Text mt={2}>{record?.id}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Title
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Status
            </Heading>
            <Text mt={2}>{record?.status}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Category
            </Heading>
            <Text mt={2}>{categoryData?.data?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Content
            </Heading>
            <Spacer mt={2} />
            <MarkdownField value={record?.content} />
        </Show>
    );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { useEffect } from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const PostEdit = () => {
    const {
        refineCore: { formLoading, queryResult, autoSaveProps },
        saveButtonProps,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
        },
    });

    const { options } = useSelect({
        resource: "categories",

        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    useEffect(() => {
        setValue("category.id", queryResult?.data?.data?.category?.id || 1);
    }, [options]);

    return (
        <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            autoSaveProps={autoSaveProps}
        >
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.title?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Select
                    id="status"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {\`$\{errors.status?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("category.id", {
                        required: true,
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {\`$\{errors.categoryId?.message}\`}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.content}>
                <FormLabel>Content</FormLabel>
                <Textarea
                    id="content"
                    {...register("content", {
                        required: "content is required",
                    })}
                />
                <FormErrorMessage>
                    {\`$\{errors.content?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const PostCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.title?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Select
                    id="status"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {\`$\{errors.status?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("category.id", {
                        required: "Category is required",
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {\`$\{errors.categoryId?.message}\`}
                </FormErrorMessage>
            </FormControl>

            <FormControl mb="3" isInvalid={!!errors?.content}>
                <FormLabel>Content</FormLabel>
                <Textarea
                    id="content"
                    {...register("content", {
                        required: "content is required",
                    })}
                />
                <FormErrorMessage>
                    {\`$\{errors.content?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
`.trim();
