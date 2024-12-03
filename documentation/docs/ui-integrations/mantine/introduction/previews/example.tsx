import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function Example() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/mantine": "^2.28.21",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router-v6": "^4.5.4",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/form": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
        "react-router-dom": "^6.8.1",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ProductsTsxCode,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
        },
        "/pages/products/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
        },
        "/auth-provider.tsx": {
          code: AuthProviderTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AuthProviderTsxCode = /* jsx */ `
const authProvider = {
    login: async ({ username, password }) => {
      (window as any).authenticated = true;
      return { success: true };
    },
    check: async () => {
      // auto login at first time
      if (typeof (window as any).authenticated === "undefined") {
        (window as any).authenticated = true;
      }
      return { authenticated: Boolean((window as any).authenticated) };
    },
    logout: async () => {
      (window as any).authenticated = false;
      return { success: true };
    },
    register: async () => {
      return { success: true };
    },
    forgotPassword: async () => {
      return { success: true };
    },
    resetPassword: async () => {
      return { success: true };
    },
    getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
};

export default authProvider;
`.trim();

const ProductsTsxCode = /* jsx */ `
export * from "./list";
export * from "./show";
export * from "./edit";
export * from "./create";
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    useNotificationProvider,
    AuthPage
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import authProvider from "./auth-provider";

import { ProductList, ProductCreate, ProductEdit, ProductShow } from "./pages/products";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
                    <Refine
                        notificationProvider={useNotificationProvider}
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        authProvider={authProvider}
                        resources={[
                            {
                                name: "products",
                                list: "/products",
                                show: "/products/:id",
                                edit: "/products/:id/edit",
                                create: "/products/create",
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                    >
                        <Routes>
                            <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route index element={<NavigateToResource resource="products" />} />
                                <Route path="/products" element={<Outlet />}>
                                    <Route index element={<ProductList />} />
                                    <Route path="create" element={<ProductCreate />} />
                                    <Route path=":id" element={<ProductShow />} />
                                    <Route path=":id/edit" element={<ProductEdit />} />
                                </Route>
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                            </Route>
                            <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
                                <Route
                                    path="/login"
                                    element={(
                                    <AuthPage
                                        type="login"
                                        formProps={{
                                        initialValues: {
                                            email: "demo@refine.dev",
                                            password: "demodemo",
                                        },
                                        }}
                                    />
                                    )}
                                />
                                <Route path="/register" element={<AuthPage type="register" />} />
                                <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                                <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";

import { Box, Group, ScrollArea, Select, Table, Pagination } from "@mantine/core";

export const ProductList = () => {
    const columns = React.useMemo(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
              id: "material",
              header: "Material",
              accessorKey: "material",
          },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
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
                            <ShowButton
                                hideText
                                recordItemId={getValue() as number}
                            />
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
            tableQuery: { data: tableData },
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
        <ScrollArea>
            <List>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef
                                                .header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
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
`.trim();

const ShowTsxCode = /* jsx */ `
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField, MarkdownField } from "@refinedev/mantine";

import { Title } from "@mantine/core";

export const ProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title order={5}>Id</Title>
            <TextField value={record?.id} />

            <Title mt="xs" order={5}>Name</Title>
            <TextField value={record?.name} />

            <Title mt="xs" order={5}>Material</Title>
            <TextField value={record?.material} />

            <Title mt="xs" order={5}>Description</Title>
            <MarkdownField value={record?.description} />

            <Title mt="xs" order={5}>Price</Title>
            <NumberField value={record?.price}  options={{ style: "currency", currency: "USD" }} />
        </Show>
    );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export const ProductEdit = () => {
  const {
      saveButtonProps,
      getInputProps,
      errors,
      refineCore: { queryResult, autoSaveProps },
  } = useForm({
        initialValues: {
          name: "",
          material: "",
          price: 0,
        },
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
        },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <form>
        <TextInput
          mt={8}
          id="name"
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          id="material"
          label="Material"
          placeholder="Material"
          {...getInputProps("material")}
        />
        <NumberInput
          mt={8}
          id="price"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
      </form>
    </Edit>
  );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export const ProductCreate = () => {
  const {
      saveButtonProps,
      getInputProps,
      errors,
  } = useForm({
        initialValues: {
          name: "",
          material: "",
          price: 0,
        },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          id="name"
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          id="material"
          label="Material"
          placeholder="Material"
          {...getInputProps("material")}
        />
        <NumberInput
          mt={8}
          id="price"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
      </form>
    </Create>
  );
};
`.trim();
