---
title: Create Your Easy Customizable Internal Issue Tracker With Refine and Supabase
description: This web application will  us to create issue and tasks for your team members. You will also be able to choose the priority of these tasks, their tags, and which person to assign them to.
slug: customizable-issue-tracker-with-refine-and-supabase
authors: melih
tags: [Refine, supabase, react, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **Refine**. Although we plan to update it with the latest version of **Refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **Refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

In this article, we will make a customizable internal issue tracker web application with supabase and refine.

<!--truncate-->

This web application will us to create issue and tasks for your team members. You will also be able to choose the priority of these tasks, their tags, and which person to assign them to.

We will use [Supabase](https://supabase.io/) in backend. Let's start by creating our Supabase account and tables.

## Create Supabase Database

We have to go to [Supabase](https://supabase.io/) and create an organization and database. Then we can start creating our tables.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/start.png" alt="overview" />
<br />

The tables we need to create for our project are as follows:

> label

- `id`: bigint
- `title`: varchar
- `color`: varchar

<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/label_table.png" alt="overview" />
<br />

> priority

- `id` bigint
- `title` varchar

<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/common_table.png" alt="overview" />
<br />

> status

- `id` bigint
- `title` varchar

<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/common_table.png" alt="overview" />
<br />

> users

- `email` varchar
- `id` uuid

<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/user_table.png" alt="overview" />
<br />

> tasks

- `id` bigint
- `title` varchar
- `description` varchar
- `start_time` date
- `end_time` date
- `label` bigint
- `priority` bigint
- `statutes` bigint
- `users` uuid

<br />
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/task_table.png" alt="overview" />
<br />

We created our database tables. The important part here is that as you can see, in our tasks table, label, priority, status and users values ​​are defined as bigint. To summarize the reason for this, we relation the label, priority, status and users tables that we created above with the corresponding values ​​in our tasks table.

:::tip

Add Foreign key relationships steps:

1. Got to a table, right click the column you wish to add a foreign key for

2. Select 'edit column'

3. Select 'Add foreign key relation'

4. Select the table and column to make a foreign key for

5. Click save

:::

So we can take reference their id and use their value in our tasks table.

Now let's go to the Supabase Table editor and create our constant values.

`Label Table`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/label_value.png" alt="overview" />
<br />

`Priority Table`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/priority_value.png" alt="overview" />
<br />

`Status Table`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/status_value.png" alt="overview" />
<br />

Let's create a test task to better understand key relation.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/task_test.gif" alt="overview" />
<br />

As you can see, since we have defined the ids of our label, status, priority and users tables as references to our tasks table, we can now use their values.

Let's look at how we can use this data we created on the Supabase side with Refine .

## Refine Project Setup

Now let's Refine the task-manager panel. With superplate, we can quickly create a Refine project

```bash
  npm create refine-app@latest refine-task-manager -- -b v3
```

```bash
✔ Select your project type › refine-react
✔ What will be the name of your app · refine-task-manager
✔ Package manager: · Npm
✔ Do you want to use a UI Framework? · Ant Design
✔ Do you want a customized theme?: · Default theme
✔ Router Provider: · React Router v6
✔ Data Provider: · Supabase
✔ Do you want a customized layout? · Yes
✔ i18n - Internationalization: · No
```

After the project setup is loaded, let's start by entering our project and making the necessary changes.

Let's add our supabase url and key to our Refine project.

```ts title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_API_KEY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

Now we can access and list the tables we created via the supabase.

- Add custom login and signup page in App.tsx

Our purpose here is to log in if there is a registered user in the supabase. If you do not have a registered user, saving a user to the supabase with refine.

## Custom Login Page

```tsx title="src/pages/login/index.tsx"
import React from "react";
import { useLogin, useNavigation } from "@refinedev/core";

import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
} from "@refinedev/antd";

import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();

  const { mutate: login } = useLogin<ILoginForm>();
  const { push } = useNavigation();

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
                initialValues={{
                  email: "info@refine.dev",
                  password: "refine-supabase",
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
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <Button type="primary" size="large" htmlType="submit" block>
                  Sign in
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Don’t have an account?
                  <a
                    href="#"
                    style={{
                      fontWeight: "bold",
                      marginLeft: 12,
                    }}
                    onClick={() => push("signup")}
                  >
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

```css title="src/pages/login/styles.css"
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

## Custom Signup Page

```tsx title="src/pages/signup.tsx"
import React from "react";
import { useNavigation } from "@refinedev/core";
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
} from "@refinedev/antd";
import "./styles.css";
import { supabaseClient } from "utility";

const { Text, Title } = Typography;

export interface ISignup {
  email: string;
  password: string;
}

export const Signup: React.FC = () => {
  const [form] = Form.useForm<ISignup>();
  const { push } = useNavigation();

  const CardTitle = (
    <Title level={3} className="title">
      Sign Up
    </Title>
  );

  const signup = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Promise.reject(error);
    }
  };

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
              <Form<ISignup>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  signup(values.email, values.password);
                  push("login");
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
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  style={{ marginTop: 24 }}
                >
                  Create Account
                </Button>
              </Form>
              <div style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 12 }}>
                  Don’t have an account?
                  <a
                    href="#"
                    style={{
                      fontWeight: "bold",
                      marginLeft: 12,
                    }}
                    onClick={() => push("login")}
                  >
                    Sign in
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

```css title="src/pages/signup/styles.css"
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

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@refinedev/antd/dist/reset.css";

import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

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
            element: <Signup />,
            path: "/signup",
          },
        ] as typeof routerProvider.routes,
      }}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
}

export default App;
```

Here we define our login and signup pages. We then use the Refine's [router-provider](https://refine.dev/docs/packages/documentation/routers/) and [useNavigaton](https://refine.dev/docs/core/hooks/navigation/useNavigation/) hooks to switch between login and signup.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/login.gif" alt="overview" />
<br />

We can now create supabase users and log in from our Refine interface.

## Add Resource

**Adding resources according to the table name we created in Supabase**

```tsx
import { Refine } from "@refinedev/core";
import { useNotificationProvider Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@refinedev/antd/dist/reset.css";

import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      DashboardPage={Dashboard}
      LoginPage={Login}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            element: <Signup />,
            path: "/signup",
          },
        ] as typeof routerProvider.routes,
      }}
      resources={[
        {
          name: "users",
        },
        {
          name: "tasks",
        },
      ]}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
}

export default App;
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/list.png" alt="overview" />
<br />

We can now create lists of tasks and make changes to them.

## Add List and Filter

```tsx title="src/pages/task/list.tsx"
import React from "react";
import { useMany, HttpError, CrudFilters } from "@refinedev/core";

import {
  useTable,
  List,
  Table,
  TextField,
  TagField,
  DateField,
  Space,
  ShowButton,
  EditButton,
  DeleteButton,
  Row,
  Col,
  Card,
} from "@refinedev/antd";

import {
  ILabel,
  IPriority,
  ITask,
  ITaskFilterVariables,
  IStatus,
  IAuthUser,
} from "interfaces";

import { Filter } from "../task";

export const TaskList = () => {
  const { tableProps, searchFormProps } = useTable<
    ITask,
    HttpError,
    ITaskFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { title, label, priority, users, status, start_time, end_time } =
        params;

      filters.push(
        {
          field: "title",
          operator: "eq",
          value: title,
        },

        {
          field: "label",
          operator: "eq",
          value: label,
        },

        {
          field: "priority",
          operator: "eq",
          value: priority,
        },

        {
          field: "users",
          operator: "eq",
          value: users,
        },

        {
          field: "status",
          operator: "eq",
          value: status,
        },

        {
          field: "start_time",
          operator: "gte",
          value: start_time ? start_time[0].toISOString() : undefined,
        },

        {
          field: "start_time",
          operator: "lte",
          value: start_time ? start_time[1].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "gte",
          value: end_time ? end_time[0].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "lte",
          value: end_time ? end_time[1].toISOString() : undefined,
        },
      );
      return filters;
    },
  });

  const labelIds = tableProps?.dataSource?.map((item) => item.label) ?? [];
  const priorityIds =
    tableProps?.dataSource?.map((item) => item.priority) ?? [];
  const assignedIds = tableProps?.dataSource?.map((item) => item.users) ?? [];
  const statusIds = tableProps?.dataSource?.map((item) => item.status) ?? [];

  const { data: labels } = useMany<ILabel>({
    resource: "label",
    ids: labelIds,
  });

  const { data: priority } = useMany<IPriority>({
    resource: "priority",
    ids: priorityIds,
  });

  const { data: assigned } = useMany<IAuthUser>({
    resource: "users",
    ids: assignedIds,
  });

  const { data: status } = useMany<IStatus>({
    resource: "status",
    ids: statusIds,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="Task Filter">
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="title" title="Title" />
            <Table.Column
              dataIndex="label"
              title="Label"
              render={(value) => {
                return (
                  <TagField
                    color={
                      labels?.data.find((item) => item.id === value)?.color
                    }
                    value={
                      labels?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="priority"
              title="Priority"
              render={(value) => {
                return (
                  <TextField
                    value={
                      priority?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="users"
              title="Assigned"
              render={(value) => {
                return (
                  <TagField
                    value={
                      assigned?.data.find((item) => item.id === value)?.email
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="status"
              title="Status"
              render={(value) => {
                return (
                  <TextField
                    value={
                      status?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="start_time"
              title="Start Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column
              dataIndex="end_time"
              title="Due Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column<ITask>
              title="Actions"
              dataIndex="actions"
              render={(_, record): React.ReactNode => {
                return (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                  </Space>
                );
              }}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
```

```tsx title="src/pages/task/filter.tsx"
import React from "react";
import {
  Form,
  FormProps,
  Input,
  useSelect,
  Select,
  DatePicker,
  Icons,
  Button,
} from "@refinedev/antd";

import { ITask, IPriority, IStatus, IAuthUser } from "interfaces";

const { RangePicker } = DatePicker;

export const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { selectProps: labelSelectProps } = useSelect<ITask>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status",
  });

  const { selectProps: assigneeProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Search" name="title">
        <Input placeholder="Title" prefix={<Icons.SearchOutlined />} />
      </Form.Item>
      <Form.Item label="Label" name="label">
        <Select {...labelSelectProps} allowClear placeholder="Search Label" />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select {...priorityProps} allowClear placeholder="Search Priority" />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select {...statusProps} allowClear placeholder="Search Status" />
      </Form.Item>
      <Form.Item label="Assigned" name="users">
        <Select {...assigneeProps} allowClear placeholder="Search Assignee" />
      </Form.Item>
      <Form.Item label="Start Date" name="start_time">
        <RangePicker />
      </Form.Item>
      <Form.Item label="Due Date" name="end_time">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};
```

```ts title="src/interfaces"
export interface IAuthUser {
  id: string;
  email: string;
}

export interface ILabel {
  id: string;
  title: string;
  color: string;
}

export interface IPriority {
  id: string;
  title: string;
}

export interface IStatus {
  id: string;
  title: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  label: string;
  priority: string;
  status: string;
  users: string;
}

export interface ITaskFilterVariables {
  title: string;
  label: string;
  priority: string;
  users: string;
  status: string;
  start_time: [Dayjs, Dayjs];
  end_time: [Dayjs, Dayjs];
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/task_list.png" alt="overview" />
<br />

Using Refine's [tableSearch](https://refine.dev/docs/guides-and-concepts/search/table-search) and list, we can create our list and perform filtering.

As seen in the example, we listed and showed the task table we created in supabase with refine. Now you can make changes as you want with refine.

Now how do we create task? Let's examine how we can edit them and see their details.

## Create Task

```tsx title="src/pages/task/create.tsx"
import {
  useForm,
  Create,
  Form,
  Input,
  Select,
  useSelect,
  DatePicker,
} from "@refinedev/antd";

import { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";

export const TaskCreate = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ILabel>({
    resource: "label",
  });

  const { selectProps: prioritySelectPorps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneeSelectProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusSelectProps } = useSelect<IStatus>({
    resource: "status",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
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
        <Form.Item label="Label" name="label">
          <Select {...labelSelectProps} />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select {...prioritySelectPorps} />
        </Form.Item>
        <Form.Item label="Assign To" name="users">
          <Select {...assigneeSelectProps} />
        </Form.Item>
        <Form.Item label="Select Status" name="status">
          <Select {...statusSelectProps} />
        </Form.Item>
        <Form.Item label="Start Date" name="start_time">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item label="Due Date" name="end_time">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/create_test.gif" alt="overview" />
<br />

## Edit Task

```tsx title="src/pages/task/edit.tsx"
import { useForm, Form, Input, Select, Edit, useSelect } from "@refinedev/antd";

import { ITask, IPriority, IStatus, IAuthUser } from "interfaces";

export const EditTask = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ITask>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneeProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Label" name="label">
          <Select {...labelSelectProps} />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select {...priorityProps} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select {...statusProps} />
        </Form.Item>
        <Form.Item label="Assignee" name="users">
          <Select {...assigneeProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/edit_test.gif" alt="overview" />
<br />

## Show Task

```tsx title="src/pages/task/show"
import { useShow, useOne } from "@refinedev/core";
import { Show, Typography, Tag, DateField } from "@refinedev/antd";
import { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";

const { Title, Text } = Typography;

export const TaskShow: React.FC = () => {
  const { queryResult } = useShow<ITask>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: assigned } = useOne<IAuthUser>({
    resource: "users",
    id: record?.users || "",
  });

  const { data: label } = useOne<ILabel>({
    resource: "label",
    id: record?.label || "",
  });

  const { data: priority } = useOne<IPriority>({
    resource: "priority",
    id: record?.priority || "",
  });

  const { data: status } = useOne<IStatus>({
    resource: "status",
    id: record?.status || "",
  });

  console.log(status?.data);

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Task:</Title>
      <Text>{record?.title || "-"}</Text>

      <Title level={5}>Task Description:</Title>
      <Text>{record?.description}</Text>

      <Title level={5}>Assigned To:</Title>
      <Text>
        <Tag>{assigned?.data?.email ?? "-"}</Tag>
      </Text>

      <Title level={5}>Label:</Title>
      <Text>
        <Tag>{label?.data?.title ?? "-"}</Tag>
      </Text>

      <Title level={5}>Priority:</Title>
      <Text>{priority?.data?.title ?? "-"}</Text>

      <Title level={5}>Status:</Title>
      <Text>{status?.data?.title ?? "-"}</Text>

      <Title level={5}>Start Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.start_time ?? "-"} />

      <Title level={5}>Due Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.end_time ?? "-"} />
    </Show>
  );
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/show.png" alt="overview" />
<br />

By using Refine's basic views such as [create](https://refine.dev/docs/ui-frameworks/antd/components/basic-views/create), [edit](https://refine.dev/docs/ui-frameworks/antd/components/basic-views/edit/) and [show](https://refine.dev/docs/ui-frameworks/antd/components/basic-views/show/), we can now create tasks, edit these tasks and view their details.

Let's see how to add a dashboard page to our project together.

## Add Custom Chart

```tsx title="src/components/task/pie.tsx"
import React from "react";
import { Pie } from "@ant-design/charts";

interface ChartProps {
  data: {
    type: any;
    value: any;
  }[];
}

export const TaskChart: React.FC<ChartProps> = ({ data }) => {
  var config = {
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref: any) {
        var percent = _ref.percent;
        return "".concat((percent * 100).toFixed(0), "%");
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} />;
};
```

```tsx title="src/pages/dashboard/index.tsx"
import React from "react";
import { useList, useMany } from "@refinedev/core";
import { Row, Col, Card } from "@refinedev/antd";
import { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";
import { TaskChart } from "components/task/pie";
import { groupBy } from "helper";

export const Dashboard = () => {
  const taskList = useList<ITask>({
    resource: "tasks",
  });

  const labelIds = taskList.data?.data.map((item) => item.label) ?? [];
  const priorityIds = taskList.data?.data.map((item) => item.priority) ?? [];
  const assignedIds = taskList.data?.data.map((item) => item.users) ?? [];
  const statusIds = taskList.data?.data.map((item) => item.status) ?? [];

  const { data: labels } = useMany<ILabel>({
    resource: "label",
    ids: labelIds || [],
  });

  const { data: priority } = useMany<IPriority>({
    resource: "priority",
    ids: priorityIds || [],
  });

  const { data: assigned } = useMany<IAuthUser>({
    resource: "users",
    ids: assignedIds || [],
  });

  const { data: status } = useMany<IStatus>({
    resource: "status",
    ids: statusIds || [],
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              labels?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(labelIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              priority?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(priorityIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              status?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(statusIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              assigned?.data.map((i) => {
                return {
                  type: i.email,
                  value: groupBy(assignedIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/dash_overview.png" alt="overview" />
<br/>

Final version of our `<App.tsx/>`.

```tsx
import { Refine } from "@refinedev/core";
import { useNotificationProvider Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@refinedev/antd/dist/reset.css";

import { UserList } from "./pages/user";
import { TaskList, TaskShow, TaskCreate, EditTask } from "./pages/task";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      DashboardPage={Dashboard}
      LoginPage={Login}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            element: <Signup />,
            path: "/signup",
          },
        ] as typeof routerProvider.routes,
      }}
      resources={[
        {
          name: "users",
          list: UserList,
        },
        {
          name: "tasks",
          list: TaskList,
          edit: EditTask,
          create: TaskCreate,
          show: TaskShow,
        },
      ]}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
}

export default App;
```

Our project is done. Lets see how its look like.

## Overview Project

`Overview`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/overview-project.gif" alt="overview" />
<br />

`Task Filter`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/filter.gif" alt="overview" />
<br />

`Dashboard Page`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-11-12-issue-tracker-refine/dashboard.gif" alt="overview" />
<br />

As you can see, we made a simple and short task manager application using Refine on our front end and using its data-provider.

[Here is repo](https://github.com/refinedev/refine/tree/main/examples/blog-issue-tracker)

For more information about Refine: [Refine Github Page](https://github.com/refinedev/refine)

For other examples and articles that will interest you with Refine: [https://refine.dev/blog/](https://refine.dev/blog/)

## Example

<CodeSandboxExample path="blog-issue-tracker" />
