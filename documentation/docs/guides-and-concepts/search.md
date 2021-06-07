---
id: search
title: Search
---

import postList from '@site/static/img/guides-and-concepts/search/post-list.png';
import postShow from '@site/static/img/guides-and-concepts/search/post-show.png';
import userList from '@site/static/img/guides-and-concepts/search/user-list.png';
import userShow from '@site/static/img/guides-and-concepts/search/user-show.png';
import basicHeader from '@site/static/img/guides-and-concepts/search/basic-header.png';
import finalHeader from '@site/static/img/guides-and-concepts/search/final-header.png';

In this guide, we will look at how we can do searching in our refine application. This will allow us to quickly access our records.

We'll demonstrate how to get data by searching from https://refine-fake-rest.pankod.com REST API.

Let's start with the example:

First, let's take a step-by-step look at what to do:

-   Adding `posts` resource
-   Creating header component with Ant Desing components
-   Searching `posts` resource with `<AutoComplete>` component
-   Adding new search target with `users` resource

Bootstrapping the app with refine fake rest `dataProvider`.

```tsx title="App.tsx"
import { Admin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
        />
    );
};
```

Let's create the `PostList` page to list the records.

```tsx title="pages/posts/list.tsx"
import { List, Table, useTable, ShowButton } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="title" dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <ShowButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
}
```

<div style={{textAlign: "center"}}>
    <img src={postList} />
</div>
<br/>

Let's create the `PostShow` page where we will show the post record.

```tsx title="pages/posts/show.tsx"
import { Show, Typography, MarkdownField, useShow } from "@pankod/refine";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record.title}</Text>

                    <Title level={5}>Content</Title>
                    <MarkdownField value={record.content} />
                </>
            )}
        </Show>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={postShow} />
</div>
<br/>

Let's pass the posts resources to the `<Admin>` component with `<Resource>` component.

```tsx title="App.tsx"
import { Admin, Resources } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

// highlight-next-line
import { PostList, PostShow } from "pages/posts";

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
        >
            // highlight-next-line
            <Resource name="posts" list={PostList} show={PostShow} />
        </Admin>
    );
};
```

Now let's create the `<Header>` component with `<AutoComplete>` components.

```tsx title="components/header.tsx"
import { AntdLayout, AutoComplete, Input } from "@pankod/refine";

const renderTitle = (title: string, count: number) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ textTransform: "capitalize" }}>
            {title} ({count})
        </span>
        <a href={`/resources/${title}`}>more</a>
    </div>
);
const renderItem = (resource: string, id: string, title: string) => ({
    value: title + id,
    label: <span>{title}</span>,
});

const options = [
    {
        label: renderTitle("posts", 15),
        options: [
            renderItem("posts", "1", "lorem ipsum 1"),
            renderItem("posts", "2", "lorem ipsum 2"),
        ],
    },
];

export const Header: React.FC = () => {
    return (
        <AntdLayout.Header
            style={{
                padding: "0px 0px 0px 24px",
                height: "55px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <AutoComplete
                    dropdownMatchSelectWidth={600}
                    style={{ width: 500 }}
                    options={options}
                    filterOption={false}
                >
                    <Input
                        size="large"
                        placeholder="Search resources"
                        allowClear
                    />
                </AutoComplete>
            </div>
        </AntdLayout.Header>
    );
};
```

Let's replace the `<Header>` component we created with the default header of refine.

```tsx title="App.tsx"
import { Admin, Resources } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostShow } from "pages/posts";

// highlight-next-line
import { Header } from "components";

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
            // highlight-next-line
            Header={Header}
        >
            <Resource name="posts" list={PostList} show={PostShow} />
        </Admin>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={basicHeader} />
</div>
<br/>

In this part, let's search using `<AutoComplate>` properties and refine's `useList` hook.

```tsx title="components/header.tsx"
import { useState, useEffect } from "react";
import {
    AntdLayout,
    AutoComplete,
    Input,
    useList,
    CrudFilters,
    useNavigation,
} from "@pankod/refine";

import { IPost } from "interfaces";

const renderTitle = (title: string, count: number) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ textTransform: "capitalize" }}>
            {title} ({count})
        </span>
        <a href={`/resources/${title}`}>more</a>
    </div>
);
const renderItem = (resource: string, id: string, title: string) => ({
    value: title + id,
    label: <span>{title}</span>,
});

export const Header: React.FC = () => {
    //highlight-start
    const [options, setOptions] = useState<IOptions[]>([]);
    const [search, setSearch] = useState<Record<string, CrudFilters>>({});
    const [value, setValue] = useState<string>();
    //highlight-end

    // highlight-next-line
    const { show } = useNavigation();

    //highlight-start
    const postQueryResult = useList<IPost>(
        "posts",
        {
            sort: [{ order: "asc", field: "title" }],
            filters: search["posts"],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem("posts", item.id, item.title),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("posts", data.total),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    );
    const { refetch: refetchPostList } = postQueryResult;
    //highlight-end

    //highlight-start
    useEffect(() => {
        setOptions([]);
        refetchPostList();
    }, [search]);
    //highlight-end

    //highlight-start
    const onSearch = (value: string) => {
        setSearch({
            posts: [
                {
                    field: "title",
                    operator: "contains",
                    value,
                },
            ],
        });
        setValue(value);
    };
    //highlight-end

    //highlight-start
    const onSelect = (value: string, options: any) => {
        setValue(options.label);
        show(options.resource, "push", options.id);
    };
    //highlight-end

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 0px 0px 24px",
                height: "55px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <AutoComplete
                    dropdownMatchSelectWidth={600}
                    style={{ width: 500 }}
                    filterOption={false}
                    //highlight-start
                    options={options}
                    onSelect={onSelect}
                    value={value}
                    onSearch={onSearch}
                    //highlight-end
                >
                    <Input
                        size="large"
                        placeholder="Search resources"
                        allowClear
                    />
                </AutoComplete>
            </div>
        </AntdLayout.Header>
    );
};
```

```ts title="interfaces/index.d.ts"
interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
    resource: string;
    id: string;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}
```

Now let's add the user resource so that we can search not only the post resource but also the user resource.

Let's create the `UserList` page to list the records.

```tsx title="pages/users/list.tsx"
import { List, Table, useTable, ShowButton } from "@pankod/refine";

import { IUser } from "interfaces";

export const UserList: React.FC = () => {
    const { tableProps } = useTable<IUser>();

    return (
        <List>
            <Table {...tableProps} key="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column
                    key="firstName"
                    dataIndex="firstName"
                    title="First Name"
                />
                <Table.Column
                    key="lastName"
                    dataIndex="lastName"
                    title="Last Name"
                />
                <Table.Column<IUser>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_value, record) => (
                        <ShowButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
}
```

Let's create the `UserShow` page where we will show the post record.

```tsx title="pages/users/show.tsx"
import { useShow, Show, Typography } from "@pankod/refine";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC = (props) => {
    const { queryResult } = useShow<IUser>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            {record && (
                <>
                    <Title level={5}>Id</Title>
                    <Text>{record.id}</Text>

                    <Title level={5}>First Name</Title>
                    <Text>{record.firstName}</Text>

                    <Title level={5}>Last Name</Title>
                    <Text>{record.lastName}</Text>
                </>
            )}
        </Show>
    );
};
```

Let's pass the posts resources to the `<Admin>` component with `<Resource>` component.

```tsx title="App.tsx"
import { Admin, Resources } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostShow } from "pages/posts";
// highlight-next-line
import { UserList, UserShow } from "pages/posts";

import { Header } from "components";

export const App: React.FC = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")
            Header={Header}}
        >
            <Resource name="posts" list={PostList} show={PostShow} />
            // highlight-next-line
            <Resource name="users" list={UserList} show={UserShow} />
        </Admin>
    );
};
```

Now let's add `users` resource to our search targets.

```tsx title="components/header.tsx"
import { useState, useEffect } from "react";
import {
    AntdLayout,
    AutoComplete,
    Input,
    useList,
    CrudFilters,
    useNavigation,
} from "@pankod/refine";

import { IPost } from "interfaces";

const renderTitle = (title: string, count: number) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ textTransform: "capitalize" }}>
            {title} ({count})
        </span>
        <a href={`/resources/${title}`}>more</a>
    </div>
);
const renderItem = (resource: string, id: string, title: string) => ({
    value: title + id,
    label: <span>{title}</span>,
});

export const Header: React.FC = () => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const [search, setSearch] = useState<Record<string, CrudFilters>>({});
    const [value, setValue] = useState<string>();

    const { show } = useNavigation();

    const postQueryResult = useList<IPost>(
        "posts",
        {
            sort: [{ order: "asc", field: "title" }],
            filters: search["posts"],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem("posts", item.id, item.title),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("posts", data.total),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    );
    const { refetch: refetchPostList } = postQueryResult;

    //highlight-start
    const userQueryResult = useList<IUser>(
        "users",
        {
            sort: [{ order: "asc", field: "firstName" }],
            filters: search["users"],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const userOptionGroup = data.data.map((item) =>
                    renderItem("users", item.id, item.firstName),
                );
                if (userOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("users", data.total),
                            options: userOptionGroup,
                        },
                    ]);
                }
            },
        },
    );
    const { refetch: refetchUserList } = userQueryResult;
    //highlight-end

    useEffect(() => {
        setOptions([]);
        // highlight-next-line
        Promise.all([refetchPostList(), refetchUserList()]);
    }, [search]);

    const onSearch = (value: string) => {
        setSearch({
            posts: [
                {
                    field: "title",
                    operator: "contains",
                    value,
                },
            ],
            //highlight-start
            users: [
                {
                    field: "firstName",
                    operator: "contains",
                    value,
                },
            ],
            //highlight-end
        });
        setValue(value);
    };

    const onSelect = (value: string, options: any) => {
        setValue(options.label);
        show(options.resource, "push", options.id);
    };

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 0px 0px 24px",
                height: "55px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <AutoComplete
                    dropdownMatchSelectWidth={600}
                    style={{ width: 500 }}
                    options={options}
                    onSelect={onSelect}
                    value={value}
                    onSearch={onSearch}
                    filterOption={false}
                >
                    <Input
                        size="large"
                        placeholder="Search resources"
                        allowClear
                    />
                </AutoComplete>
            </div>
        </AntdLayout.Header>
    );
};
```
<div style={{textAlign: "center"}}>
    <img src={finalHeader} />
</div>
<br/>