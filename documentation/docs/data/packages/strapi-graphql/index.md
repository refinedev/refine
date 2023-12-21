---
title: Strapi GraphQL
source: https://github.com/refinedev/refine/tree/master/packages/strapi-graphql
swizzle: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```tsx live shared
import dataProvider, { GraphQLClient } from "@refinedev/strapi-graphql";
const API_URL = "https://api.strapi.refine.dev/graphql";
const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);
```

Refine provides a data provider for Strapi's GraphQL APIs that works similar to the [GraphQL data provider](/docs/data/packages/graphql) and enables you to use all the features of Refine without giving up the GraphQL features.

:::simple Good to know

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- To learn more about data fetching in Refine, check out the [Data Fetching](/docs/guides-concepts/data-fetching) guide.
- Example below uses `@refinedev/antd` as the UI library but Refine is UI agnostic and you can use any UI library you want.

:::

## Installation

<InstallPackagesCommand args="@refinedev/strapi-graphql"/>

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/strapi-graphql";

// highlight-next-line
const client = new GraphQLClient("<API_URL>");
// highlight-next-line
const strapiDataProvider = dataProvider(client);

const App = () => (
  <Refine
    // highlight-next-line
    dataProvider={strapiDataProvider}
  >
    {/* ... */}
  </Refine>
);
```

## Authentication

We'll create an `authProvider` object and pass it to the `<Refine />` component to enable authentication. In `login` and `logout` methods, we'll use the `client` object to set the token to the header.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/strapi-graphql";

// highlight-next-line
const client = new GraphQLClient("<API_URL>");

const strapiDataProvider = dataProvider(client);

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      const { data } = await gqlDataProvider.custom!({
        url: "",
        method: "post",
        meta: {
          operation: "login",
          variables: {
            input: {
              value: { identifier: email, password },
              type: "UsersPermissionsLoginInput",
              required: true,
            },
          },
          fields: ["jwt"],
        },
      });

      localStorage.setItem("token", data.jwt);
      /**
       * Setting the token to the client's header to send it with every request.
       */
      // highlight-next-line
      client.setHeader("Authorization", `Bearer ${data.jwt}`);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: new Error(error),
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("token");
    /**
     * Removing the token from the client's header to prevent sending it with every request.
     */
    // highlight-next-line
    client.setHeader("Authorization", "");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const jwt = localStorage.getItem("token");

    if (!jwt) {
      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        redirectTo: "/login",
      };
    }

    /**
     * This is done to persist the token in the client's header for next sessions.
     */
    client.setHeader("Authorization", `Bearer ${jwt}`);

    return {
      authenticated: true,
    };
  },
};

const App = () => (
  <Refine
    dataProvider={strapiDataProvider}
    // highlight-next-line
    authProvider={authProvider}
  >
    {/* ... */}
  </Refine>
);
```

## Create Collections

We created two collections on [Strapi](https://strapi.io/) as `posts` and `categories` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).

You can see the fields of the collections we created as below.

```json title="post"
{
  "id": 1,
  "title": "Eius ea autem.",
  "content": "Explicabo nihil delectus. Name aliquid sunt numquam...",
  "category": {
    "id": 24,
    "title": "Placeat fuga"
  }
}
```

## List Page

When sending the request, we must specify which fields will come, so we send `fields` in `meta` to hooks that we will fetch data from.

<Tabs
defaultValue="implementation"
values={[
{label: 'Implementation', value: 'implementation'},
{label: 'Output', value: 'output'}
]}>
<TabItem value="implementation">

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// visible-block-start
// src/pages/posts/list.tsx

import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useTable,
  useSelect,
  getDefaultSortOrder,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Select } from "antd";

const PostList = () => {
  const { tableProps, sorter } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
    // highlight-start
    meta: {
      fields: [
        "id",
        "title",
        {
          category: ["title"],
        },
      ],
    },
    // highlight-end
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    // highlight-start
    meta: {
      fields: ["id", "title"],
    },
    // highlight-end
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column key="title" dataIndex="title" title="Title" sorter={{ multiple: 1 }} />
        <Table.Column<IPost>
          dataIndex="category"
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select style={{ minWidth: 200 }} mode="multiple" placeholder="Select Category" {...selectProps} />
            </FilterDropdown>
          )}
          render={(_, record) => {
            if (record.category) {
              return record.category.title;
            }

            return "-";
          }}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={gqlDataProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
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
              <Route path="posts">
                <Route index element={<PostList />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>
<TabItem value="output">

This will be the result GraphQL query:

```ts

query ($sort: String, $where: JSON, $start: Int, $limit: Int) {
    posts (sort: $sort, where: $where, start: $start, limit: $limit) {
        id,
        title,
        category {
            title
        }
    }
}
```

</TabItem>
</Tabs>

## Edit Page

On the edit page, `useForm` sends a request with the record id to fill the form. `fields` must be sent in `meta` to determine which fields will come in this request.

<Tabs
defaultValue="implementation"
values={[
{label: 'Implementation', value: 'implementation'},
{label: 'Output', value: 'output'}
]}>
<TabItem value="implementation">

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts/edit/2020"]);
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// visible-block-start
// src/pages/posts/edit.tsx

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Select, Form, Input } from "antd";
import { HttpError } from "@refinedev/core";

interface IPost {
  id: string;
  title: string;
  content: string;
  category: ICategory;
}

interface ICategory {
  id: string;
  title: string;
}

const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IPost, HttpError, IPost>({
    // highlight-start
    meta: {
      fields: [
        "id",
        "title",
        {
          category: ["id", "title"],
        },
        "content",
      ],
    },
    // highlight-end
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
    // highlight-start
    meta: {
      fields: ["id", "title"],
    },
    // highlight-end
  });

  const { TextArea } = Input;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) =>
          formProps.onFinish?.({
            ...values,
            category: values.category.id,
          } as any)
        }
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
        <Form.Item
          label="Category"
          name={["category", "id"]}
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
          <TextArea />
        </Form.Item>
      </Form>
    </Edit>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={gqlDataProvider}
          resources={[
            {
              name: "posts",
              edit: "/posts/edit/:id",
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
              <Route path="posts">
                <Route path="edit/:id" element={<PostEdit />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

:::info

The create page is largely the same as the edit page, there is no need to pass `meta` to [`useForm`](/docs/data/hooks/use-form) on the create page. If you want to use the created record as a response after the request, you can pass the `fields` with `meta`.

:::

</TabItem>
<TabItem value="output">

This will be the result GraphQL query:

```ts
mutation ($input: updatePostInput) {
    updatePost (input: $input) {
        post  {
            id
        }
    }
}
```

</TabItem>
</Tabs>

## Show Page

`<Show>` component includes the [`<RefreshButton>`](/docs/ui-integrations/ant-design/components/buttons/refresh-button) by default. We can pass `refetch` method of `queryResult` to its `onClick`. This method repeats the last request made by the query. So it refreshes the data that is shown in page.

<Tabs
defaultValue="implementation"
values={[
{label: 'Implementation', value: 'implementation'},
{label: 'Output', value: 'output'}
]}>
<TabItem value="implementation">

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts/show/2020"]);
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// visible-block-start
// src/pages/posts/edit.tsx

import { Show, RefreshButton } from "@refinedev/antd";
import { Select, Form, Input, Typography } from "antd";
import { useShow } from "@refinedev/core";

const PostShow: React.FC = () => {
  const { Title, Text } = Typography;

  const { queryResult } = useShow<IPost>({
    resource: "posts",
    // highlight-start
    meta: {
      fields: [
        "id",
        "title",
        {
          category: ["title"],
        },
        "content",
      ],
    },
    // highlight-end
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      // highlight-next-line
      headerProps={{
        extra: <RefreshButton onClick={() => queryResult.refetch()} />,
      }}
    >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Category</Title>
      <Text>{record?.category.title}</Text>

      <Title level={5}>Content</Title>
      <Text value={record?.content} />
    </Show>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={gqlDataProvider}
          resources={[
            {
              name: "posts",
              show: "/posts/show/:id",
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
              <Route path="posts">
                <Route path="show/:id" element={<PostShow />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>
<TabItem value="output">

This will be the result GraphQL query:

```ts
mutation ($input: updatePostInput) {
    updatePost (input: $input) {
        post  {
            id
        }
    }
}
```

</TabItem>
</Tabs>

## Example

<CodeSandboxExample path="data-provider-strapi-graphql" />

[data-provider]: /docs/data/data-provider
