---
title: Develop your Own Customizable Invoice Generator with Refine and Strapi | Part I
description: Looking for an invoice generator? Try out Refine. With our custom interface, you can build your own invoice in minutes! Learn more here.
slug: refine-react-admin-invoice-genarator
authors: melih
tags:
    [
        refine,
        invoice-generator,
        react,
        admin-panel,
        business-tool,
        internal-tool,
        strapi,
    ]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import company from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/company.png';
import client from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/client.png';
import contact from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/contact.png';
import refine_company from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/refine_company.png';
import refine_contacts from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/refine_contacts.png';
import clients_overview from '@site/static/img/blog/2022-02-22-refine-invoice-genarator/clients_overview.gif';

Invoice management can be a daunting task for any business. With so many different software programs and options, it's hard to know where you need start or what will work best with your company culture! You can solve this problem with **refine**. With Refine, you can develop your own customizable invoice generator with ease.

<!--truncate-->

## Introduction

We are going to develop an invoice generator application for our business using **refine** and [Strapi](https://strapi.io/). Let's see together how simple yet functional it can be!

This article will consist of two parts and we will try to explain each step in detail. In this section, we will create the basic parts of our application.

In this part, we will create a panel where our own company information is included, where we can create customers and create contacts with customer companies.

## Setup Refine Project

Let's start by creating our refine project. You can use the [superplate](https://github.com/pankod/superplate) to create a refine project.

```bash
npx superplate-cli -p refine-react refine-invoice-genarator
```

```bash
✔ What will be the name of your app ·refine-invoice-genarator
✔ Package manager: · npm
✔ Do you want to using UI Framework? > Yes, I want Ant Design
✔ Do you want to customize theme?: … no
✔ Data Provider: Strapi
✔ Do you want to customize layout? … no
✔ i18n - Internationalization: · no
```

superplate will quickly create our refine project according to the features we choose. Let's continue by install the [refine Strapi-v4 Data Provider](https://refine.dev/docs/guides-and-concepts/data-provider/strapi-v4/) that we will use later.

```bash
npm i @pankod/refine-strapi-v4
```

Our refine project and installations are now ready! Let's start using it.

## Usage

### Auth Provider

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";
import { AuthHelper } from "@pankod/refine-strapi-v4";

import { TOKEN_KEY, API_URL } from "./constants";

import axios from "axios";

export const axiosInstance = axios.create();
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

### Configure Refine for Strapi-v4​

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, LoginPage } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
//highlight-start
import { DataProvider } from "@pankod/refine-strapi-v4";
import { authProvider, axiosInstance } from "./authProvider";
//highlight-end

import "@pankod/refine-antd/dist/styles.min.css";

function App() {
    const API_URL = "Your_Strapi_Url";
    //highlight-next-line
    const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

    return (
        <Refine
            routerProvider={routerProvider}
            notificationProvider={notificationProvider}
            Layout={Layout}
            //highlight-start
            dataProvider={dataProvider}
            authProvider={authProvider}
            //highlight-end
            LoginPage={LoginPage}
        />
    );
}
```

## Create Strapi Collections​

We created three collections on Strapi as `company`, `client` and `contact` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

`Company:`

-   Logo: Media
-   Name: Text
-   Address: Text
-   Country: Text
-   City: Text
-   email: Email
-   Website: Text

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={company} alt="Strapi Company Collection" />
</div>
<br />

`Client:`

-   Name: Text
-   Contacts: Relation with Contact

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={client} alt="Strapi Client Collection" />
</div>
<br />

`Contact:`

-   First_name: Text
-   Last_name: Text
-   Phone_number Text
-   Email: email
-   Job: Text
-   Client: Relation with Client

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={contact} alt="Strapi Contact Collection" />
</div>
<br />

We have created our collections by Strapi, now we can create Clients and their contacts with **refine**.

## Your Company Detail Page

As a first step, let's start to create the part where our own `Company` will be located. If there are other companies you need to manage you can create them on the Your Company page and view them here.

### Company Card Component

Let's design a component that includes the details of our company. Then let's show it using `refine-antd` `List`. We will put the information such as name, logo and address from the Company collection we created on Strapi into Card component.

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/company/CompanyItem.tsx"
import {
    Card,
    DeleteButton,
    UrlField,
    EmailField,
    EditButton,
    Typography,
} from "@pankod/refine-antd";

import { ICompany } from "interfaces";
import { API_URL } from "../../constants";

const { Title, Text } = Typography;

//highlight-start
type CompanyItemProps = {
    item: ICompany;
};
//highlight-end

export const CompanyItem: React.FC<CompanyItemProps> = ({ item }) => {
    const image = item.logo ? API_URL + item.logo.url : "./error.png";

    return (
        //highlight-start
        <Card
            style={{ width: "300px" }}
            cover={
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        style={{
                            width: 220,
                            height: 100,
                            padding: 24,
                        }}
                        src={image}
                        alt="logo"
                    />
                </div>
            }
            actions={[
                <EditButton key="edit" size="small" hideText />,
                <DeleteButton
                    key="delete"
                    size="small"
                    hideText
                    recordItemId={item.id}
                />,
            ]}
        >
            <Title level={5}>Company Name:</Title>
            <Text>{item.name}</Text>
            <Title level={5}>Company Address:</Title>
            <Text>{item.address}</Text>
            <Title level={5}>County:</Title>
            <Text>{item.country}</Text>
            <Title level={5}>City:</Title>
            <Text>{item.city}</Text>
            <Title level={5}>Email:</Title>
            <EmailField value={item.email} />
            <Title level={5}>Website:</Title>
            <UrlField value={item.website} />
        </Card>
        //highlight-end
    );
};
```

</p>
</details>

### Company List Page

Let's place the `CompanyItem` component that we created above in the [refine-antd List](https://refine.dev/docs/ui-frameworks/antd/hooks/list/useSimpleList/) and display company information.

```tsx title="src/pages/company/CompanyList.tsx"
import { IResourceComponentsProps } from "@pankod/refine-core";
//highlight-next-line
import { useSimpleList, AntdList, List } from "@pankod/refine-antd";

//highlight-next-line
import { CompanyItem } from "components/company";

export const CompanyList: React.FC<IResourceComponentsProps> = () => {
    const { listProps } = useSimpleList<ICompany>({
        metaData: { populate: ["logo"] },
    });

    return (
        //highlight-start
        <List title={"Your Companies"}>
            <AntdList
                grid={{ gutter: 16 }}
                {...listProps}
                renderItem={(item) => (
                    <AntdList.Item>
                        //highlight-next-line
                        <CompanyItem item={item} />
                    </AntdList.Item>
                )}
            />
        </List>
        //highlight-end
    );
};
```

```tsx title="App.tsx"
...

//highlight-next-line
import { CompanyList } from "pages/company";

function App() {
    const API_URL = "Your_Strapi_Url";
    const dataProvider = DataProvider(API_URL + "/api", axiosInstance);

    return (
        <Refine
            routerProvider={routerProvider}
            notificationProvider={notificationProvider}
            Layout={Layout}
            dataProvider={dataProvider}
            authProvider={authProvider}
            LoginPage={LoginPage}
            //highlight-start
            resources={[
                {
                    name: "companies",
                    options: { label: "Your Company" },
                    list: CompanyList,
                },
            ]}
             //highlight-end
        />
    );
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={refine_company} alt="Refine Company List" />
</div>
<br />

We fetch the data of the `Company` collection that we created by Strapi, thanks to the **refine** `dataProvider`, and put it into the card component we created.

## Contact Page

Our `Contact Page` is a page related to `Clients`. Communication with client companies will be through the contacts we create here. The Contact Page will contain the information of the people we will contact. Let's create our list using **refine** [useTable](https://refine.dev/docs/ui-frameworks/antd/hooks/table/useTable/) hook.

```tsx title="src/pages/contact/ContactList.tsx"
import {
    List,
    Table,
    TagField,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    useModalForm,
} from "@pankod/refine-antd";

import { IContact } from "interfaces";
import { CreateContact } from "components/contacts";

export const ContactsList: React.FC = () => {
    //highlight-start
    const { tableProps } = useTable<IContact>({
        metaData: { populate: ["client"] },
    });
    //highlight-end

    const {
        formProps: createContactFormProps,
        modalProps,
        show,
    } = useModalForm({
        resource: "contacts",
        action: "create",
        redirect: false,
    });

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                //highlight-start
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="first_name" title="First Name" />
                    <Table.Column dataIndex="last_name" title="Last Name" />
                    <Table.Column
                        dataIndex="phone_number"
                        title="Phone Number"
                    />
                    <Table.Column dataIndex="email" title="Email" />
                    <Table.Column
                        dataIndex="job"
                        title="Job"
                        render={(value: string) => (
                            <TagField color={"blue"} value={value} />
                        )}
                    />
                    <Table.Column<{ id: string }>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
                //highlight-end
            </List>
            <CreateContact
                modalProps={modalProps}
                formProps={createContactFormProps}
            />
        </>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={refine_contacts} alt="Refine Contacts List" />
</div>
<br />

## Client List Page

We have created example company and contacts above. Now let's create a `Client List` where we can view our clients.

### Client Card Component

Let's design the cards that will appear in our Client List.

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/client/ClientItem.tsx"
import { useDelete } from "@pankod/refine-core";
import {
    Card,
    TagField,
    Typography,
    Dropdown,
    Menu,
    Icons,
} from "@pankod/refine-antd";

import { IClient } from "interfaces";

const { FormOutlined, DeleteOutlined } = Icons;
const { Title, Text } = Typography;

type ClientItemProps = {
    item: IClient;
    editShow: (id?: string | undefined) => void;
};

export const ClientItem: React.FC<ClientItemProps> = ({ item, editShow }) => {
    const { mutate } = useDelete();

    return (
        <Card style={{ width: 300, height: 300, borderColor: "black" }}>
            <div style={{ position: "absolute", top: "10px", right: "5px" }}>
                <Dropdown
                    overlay={
                        <Menu mode="vertical">
                            <Menu.Item
                                key="1"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <FormOutlined
                                        style={{
                                            color: "green",
                                        }}
                                    />
                                }
                                onClick={() => editShow(item.id)}
                            >
                                Edit Client
                            </Menu.Item>
                            <Menu.Item
                                key="2"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <DeleteOutlined
                                        style={{
                                            color: "red",
                                        }}
                                    />
                                }
                                onClick={() =>
                                    mutate({
                                        resource: "clients",
                                        id: item.id,
                                        mutationMode: "undoable",
                                        undoableTimeout: 5000,
                                    })
                                }
                            >
                                Delete Client
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <Icons.MoreOutlined
                        style={{
                            fontSize: 24,
                        }}
                    />
                </Dropdown>
            </div>

            <Title level={4}>{item.name}</Title>
            <Title level={5}>Client Id:</Title>
            <Text>{item.id}</Text>
            <Title level={5}>Contacts:</Title>

            {item.contacts.map((item) => {
                return (
                    <TagField
                        color={"#d1c4e9"}
                        value={`${item.first_name} ${item.last_name}`}
                    />
                );
            })}
        </Card>
    );
};
```

</p>
</details>

### Client Create and Edit Page

The client page is a place where you can update your client info and add new clients. Let's create the Create and Edit pages to create new customers and update existing customers.

-   Create Client

<details>
<summary>Show Create Component</summary>
<p>

```tsx title="src/components/client/CreateClient.tsx"
import {
    Create,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
    useSelect,
    useModalForm,
    Button,
} from "@pankod/refine-antd";

import { IContact } from "interfaces";
import { CreateContact } from "components/contacts";

type CreateClientProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateClient: React.FC<CreateClientProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const { selectProps } = useSelect<IContact>({
        resource: "contacts",
        optionLabel: "first_name",
    });

    const {
        formProps: createContactFormProps,
        modalProps,
        show,
    } = useModalForm({
        resource: "contacts",
        action: "create",
        redirect: false,
    });

    return (
        <>
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
                    >
                        <Form.Item
                            label="Client Company Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Select Contact">
                            <div style={{ display: "flex" }}>
                                <Form.Item name={"contacts"} noStyle>
                                    <Select {...selectProps} mode="multiple" />
                                </Form.Item>
                                <Button type="link" onClick={() => show()}>
                                    Create Contact
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>

            <CreateContact
                modalProps={modalProps}
                formProps={createContactFormProps}
            />
        </>
    );
};
```

</p>
</details>

-   Edit Client

<details>
<summary>Show Edit Component</summary>
<p>

```tsx title="src/components/client/EditClient.tsx"
import {
    Edit,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
    useSelect,
} from "@pankod/refine-antd";

type EditClientProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const { selectProps } = useSelect({
        resource: "contacts",
        optionLabel: "first_name",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Edit saveButtonProps={saveButtonProps}>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                >
                    <Form.Item
                        label="Client Company Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Select Contact" name="contacts">
                        <Select {...selectProps} mode="multiple" />
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
```

</p>
</details>

### Client List Page

Above, we created Card, Create and Edit components. Let's define and use these components we have created in our `ClientList`.

```tsx title="src/pages/client/ClientList.tsx"
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
    useSimpleList,
    AntdList,
    List,
    useDrawerForm,
    CreateButton,
} from "@pankod/refine-antd";

import { IClient } from "interfaces";
//highlight-next-line
import { ClientItem, CreateClient, EditClient } from "components/client";

export const ClientList: React.FC<IResourceComponentsProps> = () => {
    const { listProps } = useSimpleList<IClient>({
        metaData: { populate: ["contacts"] },
    });

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IClient, HttpError, IClient>({
        action: "create",
        resource: "clients",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
    } = useDrawerForm<IClient, HttpError, IClient>({
        action: "edit",
        resource: "clients",
        redirect: false,
    });

    return (
        <>
            <List
                pageHeaderProps={{
                    extra: <CreateButton onClick={() => createShow()} />,
                }}
            >
                <AntdList
                    grid={{ gutter: 24, xs: 1 }}
                    {...listProps}
                    renderItem={(item) => (
                        <AntdList.Item>
                            //highlight-next-line
                            <ClientItem item={item} editShow={editShow} />
                        </AntdList.Item>
                    )}
                />
            </List>
            //highlight-start
            <CreateClient
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditClient
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
            />
            //highlight-end
        </>
    );
};
```

We created our `Client` and `Contact` pages. Now, let's create a Client with **refine** and define contacts for our clients.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={clients_overview} alt="Refine Clients Overview" />
</div>
<br />

## Live CodeSandbox Example

`Username`: demo

`Password`: demodemo

<iframe src="https://codesandbox.io/embed/refine-invoice-genarator-basics-i7h78z?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-invoice-genarator-basics"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Conclusion

We have completed the first step of our project, creating a basic platform for users to create their company and clients. In the next section, we will add more functionality to this program by allowing users to generate invoices and track payments. Stay tuned as we continue working on `Refine Invoice Generator`!
