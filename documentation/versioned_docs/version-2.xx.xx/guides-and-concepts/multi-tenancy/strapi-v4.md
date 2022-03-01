---
id: strapi-v4
title: Strapi-v4
---

import sider from '@site/static/img/guides-and-concepts/multi-tenant/strapi/sider.png';
import store_filter from '@site/static/img/guides-and-concepts/multi-tenant/strapi/store-filter.gif';
import create from '@site/static/img/guides-and-concepts/multi-tenant/strapi/create.gif';
import stores from '@site/static/img/guides-and-concepts/multi-tenant/strapi/stores.png';
import products from '@site/static/img/guides-and-concepts/multi-tenant/strapi/products.png';
import orders from '@site/static/img/guides-and-concepts/multi-tenant/strapi/orders.png';

## What is Multitenancy?

Multitenancy refers to a kind of architecture where a single instance of software runs on a server and serves multiple customers. In a multi-tenant environment, separate customers tap into the same hardware and data storage, creating a dedicated instance for each customer. Each tenant’s data is isolated and remains invisible to others, but is running on the same server.

## Introduction​

In this guide, we will create an application with you in the logic of Multi Tenant(Multitenancy). We can say multi tenant application is to separate and manage multiple contents independently from each other in a single application.

We will make a Cake House application using **refine** and [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html). Our Cake House will consist of two separate stores and there will be special products for these stores. We will explain step by step how to manage these stores, products and orders separately.

:::caution
This guide has been prepared assuming you know the basics of **refine**. If you haven't learned these basics yet, we recommend reading the [Tutorial](https://refine.dev/docs/).
:::

## Setup

```bash
npm i @pankod/refine-strapi-v4
```

## Usage

### AuthProvider

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine";
import { AuthHelper } from "@pankod/refine-strapi-v4";
import axios from "axios";

export const axiosInstance = axios.create();

const API_URL = "YOUR_API_URL";
const TOKEN_KEY = "strapi-jwt-token";
const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const { data, status } = await strapiAuthHelper.login(
            username,
            password,
        );
        if (status === 200) {
            localStorage.setItem(TOKEN_KEY, data.jwt);

            // set header axios instance
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${data.jwt}`,
            };

            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${token}`,
            };
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        const { data, status } = await strapiAuthHelper.me(token);
        if (status === 200) {
            const { id, username, email } = data;
            return Promise.resolve({
                id,
                username,
                email,
            });
        }

        return Promise.reject();
    },
};
```

</p>
</details>

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router";

import { authProvider, axiosInstance } from "./authProvider";

const API_URL = "YOUR_API_URL";

const App: React.FC = () => {
    return (
        <Refine
            //highlight-start
            authProvider={authProvider}
            dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
            //highlight-end
            routerProvider={routerProvider}
        />
    );
};
```

:::tip
You can find detailed usage information and the source code [here](https://github.com/pankod/refine/tree/master/examples/multi-tenancy/strapi).
:::

## Create Collections

We created three collections on Strapi as store, product and order and added a relation between them. For detailed information on how to create a collection, you can check [here](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

```tsx title="products"
{
    id: 1,
    attributes: {
        title: "Test Product",
        description: "Test Product Description",
        createdAt: "2022-01-13T13:38:28.665Z",
        updatedAt: "2022-01-13T13:38:50.909Z",
        publishedAt: "2022-01-13T13:38:50.905Z"
    }
}
```

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
    <img src={stores} alt="stores" />
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
    <img src={products} alt="products" />
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
    <img src={orders} alt="orders" />
</div>
<br/>

Now that we have completed the setup and our collections, we can now log in with the **refine** and start the listing processes.

## Store Context

In order to view the products and orders of two different stores separately, we need to filter by storeId. We will use the storeId information in more than one place. For example, when creating a store-specific order.

For this reason, we will create a [React Context](https://en.reactjs.org/docs/context.html) and keep the storeId state information in it and send it to the relevant **refine** components.

```tsx
import { createContext, useState } from "react";

export const StoreContext = createContext<any[]>([]);

export const StoreProvider = (props: any) => {
    const [store, setStore] = useState(1);

    return <StoreContext.Provider value={[store, setStore]} {...props} />;
};
```

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router";

import { authProvider, axiosInstance } from "./authProvider";

const API_URL = "YOUR_API_URL";

const App: React.FC = () => {
    return (
        //highlight-start
        <StoreProvider>
            <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                routerProvider={routerProvider}
            />
        </StoreProvider>
        // highlight-end
    );
};
```

## Shop Select to Sider Component

We will create a select component in the Sider Menu where the user will select the stores. Let's create our select component first, then let's see how we can define it in the **refine** Sider.

```tsx title="scr/components/select/StoreSelect.tsx"
import { useContext } from "react";
import { Select, useSelect } from "@pankod/refine";

import { StoreContext } from "context/store";
import { IStore } from "interfaces";

type SelectProps = {
    onSelect: () => void;
};

export const StoreSelect: React.FC<SelectProps> = ({ onSelect }) => {
    //highlight-start
    const [store, setStore] = useContext(StoreContext);
    //highlight-end

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "stores",
        optionLabel: "title",
        optionValue: "id",
    });

    //highlight-start
    const handleChange = (selectedValue: string) => {
        setStore(selectedValue);
    };
    //highlight-end

    return (
        <Select
            defaultValue={store}
            style={{ width: 130 }}
            onChange={handleChange}
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

Here we have created a select component. Then we fetch the store id and title we created in the Strapi database with `useSelect`. Now we can place the store information we have in the state we created in the Store Context.

Let's define the select component in the **refine** Sider Menu. First, we need to customize the default Sider.

[Check out how you can customize Sider Menu →](https://refine.dev/docs/examples/customization/customSider/)

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/sider/CustomSider.tsx"
import React, { useState } from "react";
import {
    AntdLayout,
    Menu,
    useMenu,
    useTitle,
    useNavigation,
    Grid,
    Icons,
} from "@pankod/refine";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

import { StoreSelect } from "components/select";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { push } = useNavigation();

    const isMobile = !breakpoint.lg;

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <Title collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
                    push(key as string);
                }}
            >
                //highlight-start
                <Menu.Item
                    key={selectedKey}
                    icon={<Icons.AppstoreAddOutlined />}
                >
                    <StoreSelect
                        onSelect={() => {
                            setCollapsed(true);
                        }}
                    />
                </Menu.Item>
                //highlight-end
                {menuItems.map(({ icon, label, route }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <Menu.Item
                            style={{
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                            key={route}
                            icon={icon}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {label}
                                {!collapsed && isSelected && (
                                    <Icons.RightOutlined />
                                )}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

</p>
</details>

|                                                                    <img src={sider} alt="sider" />                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _As you can see, you can now choose the store you want and create products and orders specifically for the store we have chosen according to the storeId information._ |

## Product List Page

Now we can list the products of the selected store according to the storeId information by filtering it. We can do this filtering by using the `permanetFilter` property within the **refine**'s `useSimpleList` hook.

We separate the products of different stores by using the `permanentFilter` with the storeId we get from the Store Context. So we can control more than single content in one application.

```tsx
//highlight-start
const [store] = useContext(StoreContext);
//highlight-end
const { listProps } = useSimpleList<IProduct>({
    //highlight-start
    permanentFilter: [{ field: "stores][id]", operator: "eq", value: store }],
    //highlight-end
});
```

<details>
<summary>Show Code</summary>
<p>

```tsx title=src/pages/ProductList.tsx
import { useContext } from "react";
import {
    IResourceComponentsProps,
    useSimpleList,
    AntdList,
    useModalForm,
    useDrawerForm,
    CreateButton,
    List,
    HttpError,
} from "@pankod/refine";

import { IProduct } from "interfaces";

import { ProductItem } from "components/product";
import { StoreContext } from "context/store";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    //highlight-start
    const [store] = useContext(StoreContext);
    const { listProps } = useSimpleList<IProduct>({
        permanentFilter: [
            { field: "stores][id]", operator: "eq", value: store },
        ],
        metaData: { populate: ["image"] },
    });
    //highlight-end

    return (
        <>
            <List
                pageHeaderProps={{
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
    <img src={store_filter} alt="Store Filter" />
</div>
<br/>

## Product Create Page

Now let's see how we can create store-specific products. Which store we choose in Sider, the product we will create will automatically be the product of the selected store.

By overriding the `onFinish` method of the `form` and sending the selected store information, we specify which store it will be the product of.

```tsx
//highlight-start
const [store, setStore] = useContext(StoreContext);
//highlight-end

<Form
    {...formProps}
    ...
     //highlight-start
    onFinish={(values) => {
        return (
            formProps.onFinish?.({
                ...values,
                stores: store,
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
import {
    Create,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Upload,
    Grid,
    useApiUrl,
} from "@pankod/refine";

import { StoreContext } from "context/store";
import { useContext } from "react";

import {
    useStrapiUpload,
    mediaUploadMapper,
    getValueProps,
} from "@pankod/refine-strapi-v4";

import { TOKEN_KEY } from "../../constants";

type CreateProductProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const API_URL = useApiUrl();
    //highlight-start
    const [store, setStore] = useContext(StoreContext);
    //highlight-end

    const breakpoint = Grid.useBreakpoint();

    const { ...uploadProps } = useStrapiUpload({
        maxCount: 1,
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Create saveButtonProps={saveButtonProps}>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                    //highlight-start
                    onFinish={(values) => {
                        return formProps.onFinish?.({
                            ...mediaUploadMapper(values),
                            stores: store,
                        });
                    }}
                    //highlight-end
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
                            getValueProps={(data) =>
                                getValueProps(data, API_URL)
                            }
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                name="files"
                                action={`${API_URL}/upload`}
                                headers={{
                                    Authorization: `Bearer ${localStorage.getItem(
                                        TOKEN_KEY,
                                    )}`,
                                }}
                                listType="picture"
                                multiple
                                {...uploadProps}
                            >
                                <p className="ant-upload-text">
                                    Drag & drop a file in this area
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Create>
        </Drawer>
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
    <img src={create} alt="Create Product" />
</div>
<br/>

## Conclusion

In this guide and in our example app, we talked about how we can build Multitenancy apps with **refine**. Developing a Multitenancy application with **refine** is quite simple. By creating a context and with the hooks that **refine** provides, you can quickly and easily produce similar applications in this logic.

## Live Codesandbox Example

Username: `refine-demo`

Password: `demodemo`

<iframe src="https://codesandbox.io/embed/strapi-multi-tenant-example-jgr0g?fautoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="strapi-multi-tenant-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
