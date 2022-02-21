---
id: appwrite
title: Appwrite
---

import posts from '@site/static/img/guides-and-concepts/data-provider/appwrite/posts.png';
import category from '@site/static/img/guides-and-concepts/data-provider/appwrite/category.png';
import user from '@site/static/img/guides-and-concepts/data-provider/appwrite/user.png';
import login from '@site/static/img/guides-and-concepts/data-provider/appwrite/login.png';
import list from '@site/static/img/guides-and-concepts/data-provider/appwrite/list.png';
import create from '@site/static/img/guides-and-concepts/data-provider/appwrite/create.gif';
import edit from '@site/static/img/guides-and-concepts/data-provider/appwrite/edit.png';
import permission from '@site/static/img/guides-and-concepts/data-provider/appwrite/permission.png';

## Introduction
**refine** and [Appwrite](https://appwrite.io/) work in harmony, offering you quick development options. You can use your data (API, Database) very simply by using **refine**'s Appwrite data provider.

:::info
[Appwrite](https://appwrite.io/) version >= 0.12 is required
:::

You can only focus on your UI as we can handle your data quickly and simply.

:::caution
This guide has been prepared assuming you know the basics of **refine**. If you haven't learned these basics yet, we recommend reading the [Tutorial](https://refine.dev/docs/).
:::

## Setup
```bash
npm install @pankod/refine-appwrite
```
:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/pankod/refine/tree/master/packages/refine-antd) package.
:::

## Usage
It is very simple to use and consists of two steps. First, define your Appwrite project id and then give it to the dataprovider.

### Appwrite Client
```tsx title="appwriteClient.ts"
import { Appwrite } from "@pankod/refine-appwrite";

const APPWRITE_URL = "http://localhost/v1";
//highlight-start
const APPWRITE_PROJECT = "YOUR_APPWRITE_PROJECT_ID";
//highlight-end

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

export appwriteClient;
```

### Authprovider
```tsx title="authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

import appwriteClient from "./appwriteClient";

export const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        return appwriteClient.account.createSession(email, password);
    },
    logout: async () => {
        await appwriteClient.account.deleteSession("current");

        return "/";
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const session = await appwriteClient.account.getSession("current");

        if (session) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const user = await appwriteClient.account.get();

        if (user) {
            return user;
        }
    },
};
```

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import { Layout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";
//highlight-start
import { dataProvider } from "@pankod/refine-appwrite";
//highlight-end
import routerProvider from "@pankod/refine-react-router";

//highlight-start
import appwriteClient from "./appwriteClient";
import authProvider from "./authProvider";
//highlight-end

const App: React.FC = () => {
    return (
        <Refine
        //highlight-start
            dataProvider={dataProvider(appwriteClient)}
            authProvider={authProvider}
        //highlight-end    
            routerProvider={routerProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};
```

## Create Collections
We created two collections on Appwrite Database as `posts` and `categories` and added a relation between them.

`Category Collection`: 

 * Title: text

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={category} alt="category" />
</div>

<br/>

`Post Collection`:

* Title: text
* CategoryId: text
* Content: text
* Images: wilcard

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={posts} alt="posts" />
</div>

<br/>

Then we need to create an appwrite user to be able to login with **refine**.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={user} alt="user" />
</div>

<br/>

### Permissions 
In order to list posts and categories, you need to give read and write permission by Appwrite.

Example: `Post Collection Permissons`
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={permission} alt="permission" />
</div>
<br/>

We indicate that the read and write permission is open to everyone by giving the "*" parameter.

[Refer to the Appwrite Permissions documentation for detailed information.→](https://appwrite.io/docs/permissions)

[Check out how you can use permissions when creating posts with **refine** →](#create-page)

## Login page​
**refine** default login screen allows you to login with username. Appwrite allows login with email, therefore we need to override the login page.

<details>
<summary>Show Code</summary>
<p>

```tsx title="pages/login.tsx"
import React from "react";

import { useLogin } from "@pankod/refine-core";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    Checkbox,
} from "@pankod/refine-antd";

import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const Login: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} className="title">
            Sign in your account
        </Title>
    );

    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div className="container">
                        <div className="imageContainer">
                            <img src="./refine.svg" alt="Refine Logo" />
                        </div>
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<ILoginForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    login(values);
                                }}
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, type: "email" }]}
                                >
                                    <Input size="large" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                                <div style={{ marginBottom: "12px" }}>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Checkbox
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                    </Form.Item>

                                    <a
                                        style={{
                                            float: "right",
                                            fontSize: "12px",
                                        }}
                                        href="#"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form>
                            <div style={{ marginTop: 8 }}>
                                <Text style={{ fontSize: 12 }}>
                                    Don’t have an account?{" "}
                                    <a href="#" style={{ fontWeight: "bold" }}>
                                        Sign up
                                    </a>
                                </Text>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
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
    <img src={login} alt="login" />
</div>

<br/>

Now we can login with the user we created by Appwrite. We can then list, create and edit posts.

:::tip
**refine** resource name must be the same as Appwrite Collection ID. You can change your label with resource options.

```tsx
const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(appwriteClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
            LoginPage={Login}
            resources={[
                {
                    //highlight-start
                    name: "61bc3660648a6",
                    //highlight-end
                    options: {
                        //highlight-start
                        label: "Post",
                        //highlight-end
                    },
                },
            ]}
        />
    );
};

export default App;
```
:::

## List Page
Now that we've created our collections, we can create and list documents. Let's list the posts and categories that we have created by Appwrite with **refine**.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useMany, IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.categoryId) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "61bc4afa9ee2c",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column dataIndex="title" title="Title" sorter />
                <Table.Column
                    dataIndex="categoryId"
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
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
    <img src={list} alt="list" />
</div>

<br/>

## Create Page
We can now create posts and set categories from our **refine** UI.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
    RcFile,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";
import { appwriteClient, normalizeFile } from "utility";

export const PostsCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "61bc4afa9ee2c",
        optionLabel: "title",
        optionValue: "id",
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>
                <Form.Item label="Images">
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    const { $id } =
                                        await appwriteClient.storage.createFile(
                                            rcFile,
                                        );

                                    const url =
                                        appwriteClient.storage.getFileView($id);

                                    onSuccess?.({ url }, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
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
    <img src={create} alt="create" />
</div>

<br/>

:::tip
As we mentioned above, we need permissions to list or create documents in Appwrite. By default, Read Access and Write Access are public when creating documents from **refine** UI.

If you want to restrict permissions and only allow specific users, you need to specify it in metaData.

```tsx
const { formProps, saveButtonProps } = useForm<IPost>({
    metaData: {
        writeAccess: ["User ID, Team ID, or Role"],
        readAccess: ["User ID, Team ID, or Role"] 
    }
});
```
:::


## Edit Page
You can edit the posts and categories we have created update your data.

<details>
<summary>Show Code</summary>
<p>

```tsx
import React, { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Edit,
    Form,
    Input,
    RcFile,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";

import { IPost, ICategory } from "interfaces";
import { appwriteClient, normalizeFile } from "utility";

export const PostsEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "61bc4afa9ee2c",
        defaultValue: postData?.categoryId,
        optionLabel: "title",
        optionValue: "id",
    });

    const [selectedTab, setSelectedTab] =
        useState<"write" | "preview">("write");

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>
                <Form.Item label="Images">
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    const { $id } =
                                        await appwriteClient.storage.createFile(
                                            rcFile,
                                        );

                                    const url =
                                        appwriteClient.storage.getFileView($id);

                                    onSuccess?.({ url }, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
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
    <img src={edit} alt="edit" />
</div>

## Live Codesandbox Example

Username: `demo@refine.dev`

Password: `demodemo`

<iframe
    src="https://codesandbox.io/embed/refine-appwrite-example-rn50m?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-appwrite-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>