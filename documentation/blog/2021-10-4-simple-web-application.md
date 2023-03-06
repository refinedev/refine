---
title: Simple Web Application Example with Refine
description: Do you want to develop a web application quickly? You are at the right place!
slug: simple-web-application-with-refine
authors: aydin
tags: [refine, supabase, react, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

Do you want to develop a web application quickly? You are at the right place! I will develop a simple movie web application with **refine** on the frontend and **Supabase** on the backend, you should continue reading. I will try to explain it step by step in a very simple way.

<!--truncate-->

## Refine setup

There are two alternative methods to set up a refine application.

The recommended way is using the [superplate](https://github.com/pankod/superplate) tool. superplate's CLI wizard will let you create and customize your application in seconds.

Alternatively, you may use the create-react-app tool to create an empty React application and then add refine module via npm.

I will use superplate-cli and select a Supabase. You can customize other options as you wish.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/cli.png" alt="cli" />
</div>
<br />

## Create admin panel with refine

-   We should add our Supabase url and key in _supabaseClient.tsx_
-   Add custom login page in _App.tsx_

_App.tsx_

```tsx
import { Refine } from "@pankod/refine";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@pankod/refine/dist/styles.min.css";

import { Login } from "./pages/login";

function App() {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            LoginPage={Login}
        />
    );
}

export default App;
```

## Login page

```tsx
import React from "react";
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
} from "@pankod/refine";
import "./styles.css";

import { useLogin } from "@pankod/refine";

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
                                initialValues={{
                                    remember: false,
                                    email: "info+refineflix@refine.dev",
                                    password: "refineflix",
                                }}
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

```css
.layout {
    background: radial-gradient(50% 50% at 50% 50%, #63386a 0%, #310438 100%);
    background-size: "cover";
}

.container {
    max-width: 408px;
    margin: auto;
}

.title {
    text-align: center;
    color: #626262;
    font-size: 30px;
    letter-spacing: -0.04em;
}

.imageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}
```

You can use default user for login.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/signin.png" alt="signin" />
</div>
<br />

-   Create movies list page with add a resource in _App.tsx_

```tsx
import { Refine, Resource } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import { dataProvider } from "@refinedev/supabase";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import { AdminMovieList } from "./pages/admin/movies";
import { Login } from "./pages/login";

function App() {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            LoginPage={Login}
            resources={[
                {
                    name: "movies",
                    list: AdminMovieList,
                    meta: {
                        route: "admin/movies",
                    },
                },
            ]}
        />
    );
}

export default App;
```

-   AdminMovieList page

```tsx
import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
    CreateButton,
    DeleteButton,
} from "@pankod/refine";

import { IMovies } from "interfaces";

export const AdminMovieList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IMovies>({
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "asc",
                },
            ],
        },
    });

    return (
        <List pageHeaderProps={{ extra: <CreateButton /> }}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column key="name" dataIndex="name" title="name" sorter />

                <Table.Column<IMovies>
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
                            <DeleteButton
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

-   Movies interface

```tsx
export interface IMovies {
    id: string;
    name: string;
    description: string;
    preload: string;
    director: string;
    stars: string;
    premiere: string;
    trailer: string;
    images: IFile[];
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/movies.png" alt="movies" />
</div>
<br />

-   Now we will add create page

## Create page

```tsx
    resources={[
        {
            name: "movies",
            list: AdminMovieList,
            create: AdminMovieCreate,
            meta: {
                route: "admin/movies",
            },
        },
    ]}
```

```tsx
import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    Upload,
    useForm,
    RcFile,
} from "@pankod/refine";
import { IMovies } from "interfaces";
import { supabaseClient, normalizeFile } from "utility";

export const AdminMovieCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IMovies>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Premiere" name="premiere">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Director" name="director">
                    <Input />
                </Form.Item>
                <Form.Item label="Stars" name="stars">
                    <Input />
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

                                    await supabaseClient.storage
                                        .from("refineflix")
                                        .upload(`public/${rcFile.name}`, file, {
                                            cacheControl: "3600",
                                            upsert: true,
                                        });

                                    const { data } = supabaseClient.storage
                                        .from("refineflix")
                                        .getPublicUrl(`public/${rcFile.name}`);

                                    const xhr = new XMLHttpRequest();
                                    onSuccess &&
                                        onSuccess(
                                            { url: data?.publicUrl },
                                            xhr,
                                        );
                                } catch (error) {
                                    onError &&
                                        onError(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};
```

-   normalize file in utility folder

```tsx
import { UploadFile } from "@pankod/refine";

interface UploadResponse {
    url: string;
}
interface EventArgs<T = UploadResponse> {
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
}

export const normalizeFile = (event: EventArgs) => {
    const { fileList } = event;

    return fileList.map((item) => {
        const { uid, name, type, size, response, percent, status } = item;

        return {
            uid,
            name,
            url: item.url || response?.url,
            type,
            size,
            percent,
            status,
        };
    });
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/create.png" alt="create" />
</div>
<br />

## Edit page

```tsx
import React from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    RcFile,
    Upload,
    useForm,
} from "@pankod/refine";

import { IMovies } from "interfaces";
import { supabaseClient, normalizeFile } from "utility";

export const AdminMovieEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IMovies>();

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            pageHeaderProps={{ extra: null }}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Premiere" name="premiere">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Director" name="director">
                    <Input />
                </Form.Item>
                <Form.Item label="Stars" name="stars">
                    <Input />
                </Form.Item>
                <Form.Item label="Trailer" name="trailer">
                    <Input />
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

                                    await supabaseClient.storage
                                        .from("refineflix")
                                        .upload(`public/${rcFile.name}`, file, {
                                            cacheControl: "3600",
                                            upsert: true,
                                        });

                                    const { data } = supabaseClient.storage
                                        .from("refineflix")
                                        .getPublicUrl(`public/${rcFile.name}`);

                                    const xhr = new XMLHttpRequest();
                                    onSuccess &&
                                        onSuccess(
                                            { url: data?.publicUrl },
                                            xhr,
                                        );
                                } catch (error) {
                                    onError &&
                                        onError(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/edit.png" alt="edit" />
</div>
<br />

## Show page

```tsx
import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    Space,
    ImageField,
    RefreshButton,
    EditButton,
    useNavigation,
} from "@pankod/refine";

import { IMovies } from "interfaces";

const { Title, Text } = Typography;

export const AdminMovieShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IMovies>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { push } = useNavigation();

    return (
        <Show
            isLoading={isLoading}
            pageHeaderProps={{
                title: record?.name,
                subTitle: record?.premiere,
                extra: (
                    <>
                        <EditButton
                            onClick={() =>
                                push(`/admin/movies/edit/${record?.id}`)
                            }
                        />
                        <RefreshButton />
                    </>
                ),
            }}
        >
            <Title level={5}>Director</Title>
            <Text>{record?.director || "-"}</Text>

            <Title level={5}>Stars</Title>
            <Text>{record?.stars || "-"}</Text>

            <Title level={5}>Trailer</Title>
            {record?.trailer && (
                <video width="400" controls>
                    <source src={record.trailer} type="video/mp4" />
                </video>
            )}

            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    record.images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/show.png" alt="show" />
</div>
<br />

Final version of our `<Resource>`.

```tsx
    resources={[
        {
            name: "movies",
            list: AdminMovieList,
            create: AdminMovieCreate,
            show: AdminMovieShow,
            edit: AdminMovieEdit,
            meta: {
                route: "admin/movies",
            },
        },
    ]}
```

## Create list page for movies

We will create custom list and show pages for the unauthorized users because of that, we should add custom routes for these pages.

_App.tsx_

```tsx
import { Refine, Resource } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import { dataProvider } from "@refinedev/supabase";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import {
    AdminMovieList,
    AdminMovieCreate,
    AdminMovieShow,
    AdminMovieEdit,
} from "./pages/admin/movies";
import { MoviesList, MovieShow } from "./pages/movies";
import { Login } from "./pages/login";

function App() {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            LoginPage={Login}
            routerProvider={{
                ...routerProvider,

                routes: [
                    {
                        exact: true,
                        component: MoviesList,
                        path: "/movies",
                    },
                    {
                        exact: true,
                        component: MovieShow,
                        path: "/:resource(movies)/:action(show)/:id",
                    },
                ],
            }}
            resources={[
                {
                    name: "movies",
                    list: AdminMovieList,
                    create: AdminMovieCreate,
                    show: AdminMovieShow,
                    edit: AdminMovieEdit,

                    meta: {
                        route: "admin/movies",
                    },
                },
            ]}
        />
    );
}

export default App;
```

### Movies list page

```tsx
import {
    IResourceComponentsProps,
    Card,
    Space,
    useList,
    useNavigation,
} from "@pankod/refine";
import { Layout } from "components";

import { IMovies } from "interfaces";

export const MoviesList: React.FC<IResourceComponentsProps> = () => {
    const { Meta } = Card;

    const { data, isLoading } = useList<IMovies>({
        resource: "movies",
        queryOptions: {
            staleTime: 0,
        },
    });

    const { push } = useNavigation();

    const renderMovies = () => {
        if (data) {
            return data.data.map((movie) => {
                return (
                    <Card
                        hoverable
                        key={movie.name}
                        style={{ width: 240, minHeight: 400 }}
                        cover={
                            movie.images?.length > 0 ? (
                                <img
                                    alt={movie.images[0].name}
                                    src={movie.images[0].url}
                                />
                            ) : (
                                <img
                                    alt="default"
                                    src="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg"
                                />
                            )
                        }
                        loading={isLoading}
                        onClick={() => push(`/movies/show/${movie.id}`)}
                    >
                        <Meta
                            title={movie.name}
                            description={movie.description}
                        />
                    </Card>
                );
            });
        }
    };

    return (
        <Layout>
            <Space align="start">{renderMovies()}</Space>
        </Layout>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/movies_all.png" alt="movies_all" />
</div>
<br />

### Movies detail page

```tsx
import {
    useShow,
    Show,
    Typography,
    IResourceComponentsProps,
    Space,
    ImageField,
} from "@pankod/refine";
import { Layout } from "components";

import { IMovies } from "interfaces";

const { Title, Text } = Typography;

export const MovieShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IMovies>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const renderDetail = () => (
        <>
            <Title level={5}>Director</Title>
            <Text>{record?.director || "-"}</Text>

            <Title level={5}>Stars</Title>
            <Text>{record?.stars || "-"}</Text>
            <Title level={5}>Trailer</Title>
            {record?.trailer && (
                <video width="400" controls>
                    <source src={record.trailer} type="video/mp4" />
                </video>
            )}
            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    record.images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </>
    );

    return (
        <Layout>
            <Show
                isLoading={isLoading}
                pageHeaderProps={{
                    title: record?.name,
                    subTitle: record?.premiere,
                    extra: null,
                }}
            >
                {renderDetail()}
            </Show>
        </Layout>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-simple-web-application/detailed.png" alt="detailed" />
</div>
<br />

## Example

<CodeSandboxExample path="blog-refineflix" />

[here is repo](https://github.com/refinedev/refine/tree/master/examples/blog-refineflix)
