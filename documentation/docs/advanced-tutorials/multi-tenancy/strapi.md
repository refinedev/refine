---
id: strapi-v4
title: Strapi-v4
sidebar_label: Strapi-v4
---

## What is Multitenancy?

Multitenancy refers to a kind of architecture where a single instance of software runs on a server and serves multiple customers. In a multi-tenant environment, separate customers tap into the same hardware and data storage, creating a dedicated instance for each customer. Each tenant’s data is isolated and remains invisible to others, but is running on the same server.

## Introduction​

In this guide, we will create an application with you in the logic of Multi Tenant(Multitenancy). We can say multi tenant application is separate and manage multiple contents independently from each other in a single application.

We will make a Cake House application using **refine** and [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html). Our Cake House will consist of two separate stores and there will be special products for these stores. We will explain step by step how to manage these stores, products, and orders separately.

:::caution
This guide has been prepared to assume you know the basics of **refine**. If you haven't learned these basics yet, we recommend reading the [Tutorial](https://refine.dev/docs/).
:::

## Setup

```bash
npm i @refinedev/strapi-v4
```

:::caution
To make this example more visual, we used the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package.
:::

## Usage

### AuthProvider

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";

export const axiosInstance = axios.create();

const API_URL = "YOUR_API_URL";
const TOKEN_KEY = "strapi-jwt-token";
const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider: AuthBindings = {
    login: async ({ username, password }) => {
        try {
            const { data, status } = await strapiAuthHelper.login(
                username,
                password,
            );
            if (status === 200) {
                localStorage.setItem(TOKEN_KEY, data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.jwt}`;

                return {
                    success: true,
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: {
                    name: error.response.data.error.name,
                    message: error.response.data.error.message,
                },
            };
        }

        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }

        const { data, status } = await strapiAuthHelper.me(token);
        if (status === 200) {
            const { id, username, email } = data;
            return {
                id,
                username,
                email,
            };
        }

        return null;
    },
};
```

</p>

:::tip
If you need the population for the `/me` request, you can use it like this in your `authProvider`.

```tsx
const strapiAuthHelper = AuthHelper(API_URL + "/api");

strapiAuthHelper.me("token", {
    meta: {
        populate: ["role"],
    },
});
```

:::

</details>

```tsx title="App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import { Layout, notificationProvider, ErrorComponent } from "@refinedev/antd";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

// highlight-next-line
import { authProvider, axiosInstance } from "./authProvider";

const API_URL = "YOUR_API_URL";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                //highlight-start
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                //highlight-end
                routerProvider={routerProvider}
                notificationProvider={notificationProvider}
            >
                {/* ... */}
            </Refine>
        </BrowserRouter>
    );
};
```

:::tip
You can find detailed usage information and the source code [here](https://github.com/refinedev/refine/tree/master/examples/multi-tenancy-strapi).
:::

## Create Collections

We created three collections on Strapi as store, product, and order and added a relation between them. For detailed information on how to create a collection, you can check [here](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

`Stores`

-   Title: Text
-   Relation with Products
-   Relation with Orders

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/stores.png" alt="stores" />
</div>
<br/>

`Products`

-   Title: Text
-   Description: Text
-   Image: Media
-   Relation with Stores
-   Relation with Orders

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/products.png" alt="products" />
</div>
<br/>

`Orders`

-   Status: Text
-   Customer Name: Text
-   Customer Address: Text
-   Quantity: Number
-   Relation with Stores
-   Relation with Product

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/orders.png" alt="orders" />
</div>
<br/>

Now that we have completed the setup and our collections, we can now log in with the **refine** and start the listing processes.

## Create Resources and Routes

To view the products and orders of two different stores separately, we need to filter by `storeId`. We will use the `storeId` information in more than one place. For example, when creating a store-specific order. We will also add this as a prefix to the routes. (example.com/:tenant/products)

```tsx title="src/App.tsx"
const App: React.FC = () => {
    // highlight-start
    // When `domain.com` is entered, we set the default tenant to redirect `domain.com/name`.
    const tenant = "1";
    // highlight-end

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    authProvider={authProvider}
                    dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                    routerProvider={routerProvider}
                    // highlight-start
                    // The path definition for `list`, `create`, `show`, `edit` pages is as follows and variables can be used as in `react-router`. 
                    resources={[
                        {
                            name: "products",
                            list: "/:tenant/products",
                            meta: {
                                tenant,
                            },
                        },
                        {
                            name: "orders",
                            list: "/:tenant/orders",
                            create: "/:tenant/orders/create",
                            edit: "/:tenant/orders/edit/:id",
                            meta: {
                                tenant,
                            },
                        },
                    ]}
                    // highlight-end
                    notificationProvider={notificationProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        {/* ... */}
                        <Route
                            index
                            element={
                                <NavigateToResource resource="products" />
                            }
                        />
                        {/* highlight-start */}
                        {/* prefix `resources` paths. */}
                        <Route path="/:tenant">
                        {/* highlight-end */}
                            <Route path="products">
                                <Route index element={<ProductList />} />
                            </Route>

                            <Route path="orders">
                                <Route index element={<OrderList />} />
                                <Route
                                    path="create"
                                    element={<OrderCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<OrderEdit />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};
```

## Using the `tenant` at the other components

You may want to get the `tenant` within the project. This is easily get with the [`useParsed`](/docs/api-reference/core/hooks/navigation/useParsed/) hook.

```tsx
import { useParsed } from "@refinedev/core";

const { params } = useParsed<{ tenant: string }>();

console.log(params?.tenant); // { tenant: "refine" }
```

## Shop Select to Sider Component

We will create a select component in the `Header` Menu where the user will select the stores. Let's create our select component first, then let's see how we can define it in the **refine** `Header` component.

```tsx title="scr/components/select/StoreSelect.tsx"
import { useSelect } from "@refinedev/antd";
import { Select } from "antd";
import { useGetToPath, useGo, useParsed } from "@refinedev/core";

import { IStore } from "interfaces";

type SelectProps = {
    onSelect?: () => void;
};

export const StoreSelect: React.FC<SelectProps> = ({ onSelect }) => {
    // highlight-start
    const getToPath = useGetToPath();
    const go = useGo();
    const { resource, action, params } = useParsed<{ tenant: string }>();
    // highlight-end

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        optionLabel: "title",
        optionValue: "id",
    });

    if (!params?.tenant) {
        return null;
    }

    return (
        <Select
            defaultValue={+params?.tenant}
            style={{ width: 120 }}
            // highlight-start
            onChange={(tenant) =>
                go({
                    to: getToPath({
                        resource,
                        action: action || "list",
                        meta: {
                            tenant,
                        },
                    }),
                })
            }
            // highlight-end
            onSelect={onSelect}
        >
            {storeSelectProps.options?.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
};
```

Here we have created a select component. Then we fetch the store id and title we created in the Strapi database with `useSelect`.

Let's define the select component in the **refine** `Header`.

[Check out how you can customize `Header` →](/docs/api-reference/antd/components/antd-themed-layout/#header)

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/header/index.tsx"
import React from "react";
import { Layout as AntdLayout, Typography, Avatar, Space, theme } from "antd";
import { useActiveAuthProvider, useGetIdentity } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";

// highlight-next-**line**
import { StoreSelect } from "../select";

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
    const { token } = useToken();

    const authProvider = useActiveAuthProvider();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    return (
        <AntdLayout.Header
            style={{
                backgroundColor: token.colorBgElevated,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0px 24px",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <Space
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* highlight-next-line */}
                <StoreSelect />
                <Space size="middle">
                    {user?.username && (
                        <>
                            <Text strong>{user.username}</Text>
                            <Avatar>R</Avatar>
                        </>
                    )}
                </Space>
            </Space>
        </AntdLayout.Header>
    );
};
```

</p>
</details>

|             <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/header.jpg" alt="header" />              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _As you can see, you can create a store-specific product and order by selecting `tenant` in the `Header` component and choosing according to the `storeId` information._ |

## Product List Page

Now we can list the products of the selected store according to the `storeId` information by filtering it. We can do this filtering by using the `filters.permanent` property within the **refine**'s `useSimpleList` hook.

We separate the products of different stores by using the `filters.permanent` with the `storeId` we get from the Store Context. So we can control more than single content in one application.

```tsx
//highlight-start
const { params } = useParsed<{ tenant: string }>();
//highlight-end

const { listProps } = useSimpleList<IProduct>({
    //highlight-start
    filters: {
        permanent: [{ field: "stores][id]", operator: "eq", value: params?.tenant, }],
    },
    //highlight-end
});
```

<details>
<summary>Show Code</summary>
<p>

```tsx title=src/pages/ProductList.tsx
import {
    IResourceComponentsProps,
    HttpError,
    useParsed,
} from "@refinedev/core";
import {
    useSimpleList,
    useModalForm,
    CreateButton,
    List,
} from "@refinedev/antd";
import { List as AntdList } from "antd";

import { IProduct } from "interfaces";

import { ProductItem, CreateProduct, EditProduct } from "components/product";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const { params } = useParsed<{ tenant: string }>();
    const { listProps } = useSimpleList<IProduct>({
        permanentFilter: [
            {
                field: "stores][id]",
                operator: "eq",
                value: params?.tenant,
            },
        ],
        metaData: { populate: ["image"] },
    });

    const {
        modalProps: createModalProps,
        formProps: createModalFormProps,
        show: createShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "create",
        resource: "products",
        redirect: false,
    });

    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editShow,
    } = useModalForm<IProduct, HttpError, IProduct>({
        action: "edit",
        metaData: { populate: ["image"] },
        resource: "products",
        redirect: false,
    });

    return (
        <>
            <List
                headerProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            <ProductItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            <EditProduct
                modalProps={editModalProps}
                formProps={editFormProps}
            />
            <CreateProduct
                modalProps={createModalProps}
                formProps={createModalFormProps}
            />
        </>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/filter-tenant.gif" alt="Filter Tenant" />
</div>
<br/>

:::tip

In this example, we used the `filter.permanent` object to filter the data, as Appwrite does not support multitenancy. However, you can do this from a single point by swizzle the data provider in your own RestApi.

You can check out the [swizzle data provider guide](/docs/packages/documentation/cli/#swizzle) for more information.

The `resource.meta` object is passed as `meta` to **all methods** in the data providers. For this you have to swizzle the data provider. 

```tsx title="src/dataProvider.ts"
//...
export const dataProvider = (): Required<DataProvider> => {
    //...
    return {
        getList: async ({ resource, pagination, filters, sorters, meta }) => {
            // ...
            console.log(meta.tenant); // { tenant: "refine" }
        },
        getOne: async ({ resource, id, meta }) => {
            // ...
            console.log(meta.tenant); // { tenant: "refine" }
        }
        // ...
    }
}
```

:::

## Product Create Page

Now let's see how we can create store-specific products. Which store we choose in Sider, the product we will create will automatically be the product of the selected store.

By overriding the `onFinish` method of the `form` and sending the selected store information, we specify which store it will be the product of.

```tsx
// highlight-start
import { useParsed } from "@refinedev/core";
const { params } = useParsed<{ tenant: string }>();
//highlight-end

<Form
    {...formProps}
    ...
     //highlight-start
    onFinish={(values) => {
        return (
            formProps.onFinish?.({
                ...values,
                stores: params?.tenant,
            })
        );
    }}
    //highlight-end
>
```

<details>
<summary>Show Code</summary>
<p>

```tsx title="CreateProduct"
import { useParsed } from "@refinedev/core";
import { mediaUploadMapper, getValueProps } from "@refinedev/strapi-v4";
import { Form, FormProps, Input, Upload, ModalProps, Modal } from "antd";

import { TOKEN_KEY, API_URL } from "../../constants";

type CreateProductProps = {
    modalProps: ModalProps;
    formProps: FormProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
    modalProps,
    formProps,
}) => {
    // highlight-next-line
    const { params } = useParsed<{ tenant: string }>();

    return (
        <Modal {...modalProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
                // highlight-start
                onFinish={(values) => {
                    console.log("values", values);
                    formProps.onFinish?.(
                        mediaUploadMapper({
                            ...values,
                            stores: [params?.tenant],
                        }),
                    );
                }}
                // highlight-end
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Image">
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueProps={(data) => getValueProps(data, API_URL)}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            name="files"
                            action={`${API_URL}/api/upload`}
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem(
                                    TOKEN_KEY,
                                )}`,
                            }}
                            listType="picture"
                            multiple
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/strapi/create-product.gif" alt="Create Product" />
</div>
<br/>

## Conclusion

In this guide and in our example app, we talked about how we can build multitenancy apps with **refine**. Developing a multitenancy application is quite simple with the flexible route infrastructure of `refine`.

## Example

:::note Demo Credentials
Email: `demo@refine.dev`  
Password: `demodemo`
:::

<CodeSandboxExample path="multi-tenancy-strapi" />
