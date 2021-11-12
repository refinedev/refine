---
title: Create Your Easy Customizable Internal Issue Tracker With Refine and Supabase
description: This is my first post on Docusaurus 2.
slug: customizable-issue-tracker-with-refine-and-supabase
authors: melih
tags: [refine, supabase, react, tutorial]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

import overview from '@site/static/img/blog/2021-11-12-issue-tracker-refine/overview-project.gif';

In this article, we will make a customizable internal issue tracker web application with supabase and refine.

<!--truncate-->

This web application will  us to create issue and tasks for your team members. You will also be able to choose the priority of these tasks, their tags, and which person to assign them to.


We will use [Supabase](https://supabase.io/) in backend. Let's start by creating our Supabase account and tables.


## Create Supabase Database

We have to go to [Supabase](https://supabase.io/) and create an organization and database. Then we can start creating our tables.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/636z7hqvn6leph0krb2n.png)
 

The tables we need to create for our project are as follows:

> label
* `id`: bigint
* `title`: varchar
* `color`: varchar

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/publxje4ij7irsnabp6y.png)

> priority 
* `id` bigint
* `title` varchar

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zmfn1w8dsqngr5x0apqm.png)
 

> status
* `id` bigint
* `title` varchar

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zmfn1w8dsqngr5x0apqm.png)

> users
* `email` varchar
* `id` uuid

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1yu5v8p0a0th5buba34w.png)
 
> tasks
* `id` bigint
* `title` varchar
* `description` varchar
* `start_time` date
* `end_time` date
* `label` bigint
* `priority` bigint
* `statuts` bigint
* `users` uuid

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jlshwalwk3dd2boz4zx2.png)
 

We created our database tables. The important part here is that as you can see, in our tasks table, label, priority, status and users values ​​are defined as bigint. To summarize the reason for this, we relation the label, priority, status and users tables that we created above with the corresponding values ​​in our tasks table.

 **💡 TIP**: Add Foreign key relationships steps:

1. Got to a table, right click the column you wish to add a foreign key for

2. Select 'edit column'

3. Select 'Add foreign key relation'

4. Select the table and column to make a foreign key for

5. Click save



So we can take  reference their id and use their value in our tasks table.

Now let's go to the Supabase Table editor and create our constant values.

`Label Table`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x57znd24e8rx4z8ojf11.png)

`Priority Table`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dlz595fo5z84m4ozjmda.png)
 
`Status Table`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p4d8bsrw8jxze2e1mwee.png)
 
 
Let's create a test task to better understand key relation. 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mvqfnfsf0sj7qtmnny3f.gif)

As you can see, since we have defined the ids of our label, status, priority and users tables as references to our tasks table, we can now use their values.

Let's look at how we can use this data we created on the Supabase side with refine .

## Refine Project Setup

Now let's refine the task-manager panel. With superplate, we can quickly create a refine project

```bash
  npx superplate-cli refine-task-manager
```

```bash
✔ Select your project type › refine
✔ What will be the name of your app · refine-task-manager
✔ Package manager: · npm
✔ Do you want to customize theme?: · css
✔ Data Provider: · supabase-data-provider
✔ Do you want to customize layout? · custom-layout
✔ i18n - Internationalization: · no
```

After the project setup is loaded, let's start by entering our project and making the necessary changes.

Let's add our supabase url and key to our refine project.

`src/utility/supabaseClient.ts`

```ts
import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_API_KEY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
```

Now we can access and list the tables we created via the supabase.

- Add custom login and signup page in App.tsx

Our purpose here is to log in if there is a registered user in the supabase. If you do not have a registered user, saving a user to the supabase with refine.
 
#### Custom Login Page

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
  useLogin,
  useNavigation,
} from "@pankod/refine";

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
                    style={{ fontWeight: "bold", marginLeft:  12 }}
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

#### Custom Sign Up Page

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
  useNavigation,
} from "@pankod/refine";
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
                    style={{ fontWeight: "bold" }}
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

- `App.tsx`

```tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import "styles/antd.less";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";
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
            exact: true,
            component: Signup,
            path: "/signup",
          },
        ] as typeof routerProvider.routes,
      }}
    />
  );
}

export default App;
```

Here we define our login and signup pages. We then use the refine's [router-provider](https://refine.dev/docs/next/api-references/providers/router-provider/) and [useNavigaton](https://refine.dev/docs/next/api-references/hooks/navigation/useNavigation/) hooks to switch between login and signup.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq8z0kzqhdw9xy9vwgig.gif)
 

We can now create supabase users and log in from our refine interface.
 

**Adding resources according to the table name we created in Supabase**

```tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import "styles/antd.less";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";
import { Dashboard } from "./pages/dashboard";
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
            exact: true,
            component: Signup,
            path: "/signup",
          },
        ] as typeof routerProvider.routes,
      }}
      resources={[
        {
          name: "users"
        },
        {
          name: "tasks"
        },
      ]}
    />
  );
}

```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6l4clvggytlr83a9fr8m.png)
 
We can now create lists of tasks and make changes to them.

`src/pages/task/list.tsx`

```tsx
import React from "react";
import {
  useTable,
  useMany,
  List,
  Table,
  TextField,
  TagField,
  DateField,
  Space,
  ShowButton,
  EditButton,
  DeleteButton,
  IResourceComponentsProps,
  HttpError,
  CrudFilters,
  Row,
  Col,
  Card,
} from "@pankod/refine";

import {
  ILabel,
  IPriority,
  ITask,
  ITaskFilterVariables,
  IStatus,
  IAuthUser,
} from "interfaces";

import { Filter } from "../task";

export const TaskList: React.FC<IResourceComponentsProps> = () => {
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
        }
      );
      return filters;
    },
  });

  const labelIds = tableProps?.dataSource?.map((item) => item.label) ?? [];
  const priorityIds = tableProps?.dataSource?.map((item) => item.priority) ?? [];
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

`src/pages/task/filter.tsx`

```tsx
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
} from "@pankod/refine";

import { ITask, IPriority, IStatus, IAuthUser } from "interfaces";

const { RangePicker } = DatePicker

export const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { selectProps: labelSelectProps } = useSelect<ITask>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status"
  });

  const { selectProps: assigneProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Search" name="title">
        <Input
          placeholder="Title"
          prefix={<Icons.SearchOutlined />}
        />
      </Form.Item>
      <Form.Item label="Label" name="label">
        <Select {...labelSelectProps} allowClear placeholder="Seach Label" />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select {...priorityProps} allowClear placeholder="Seach Priority" />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select {...statusProps} allowClear placeholder="Search Status" />
      </Form.Item>
      <Form.Item label="Assigned" name="users">
        <Select {...assigneProps} allowClear placeholder="Search Assignee" />
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

`src/interfaces`

```ts
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
  title: string
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
  users: string
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



![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hcxwmwa09aq4ohu4tygz.png)

 Using refine's [tableSearch](https://refine.dev/docs/guides-and-concepts/search/table-search) and list, we can create our list and perform filtering. 

As seen in the example, we listed and showed the task table we created in supabase with refine. Now you can make changes as you want with refine.

Now how do we create task? Let's examine how we can edit them and see their details.

`src/pages/task/create.tsx`

```tsx
import {
  useForm,
  Create,
  Form,
  Input,
  Select,
  useSelect,
  IResourceComponentsProps,
  DatePicker,
} from "@pankod/refine";

import { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";

export const TaskCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ILabel>({
    resource: "label",
  });

  const { selectProps: prioritySelectPorps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneSelectProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusSelectProps } = useSelect<IStatus>({
    resource: "status"
  })

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
        <Form.Item label="Assigne To" name="users">
          <Select {...assigneSelectProps} />
        </Form.Item>
        <Form.Item label="Select Status" name="status">
          <Select {...statusSelectProps}/>
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
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ee1bbg97cdckvl96d4ce.png)
 
`src/pages/task/edit.tsx`

```tsx
import {
  useForm,
  Form,
  Input,
  Select,
  Edit,
  useSelect,
  IResourceComponentsProps,
} from "@pankod/refine";

import { ITask, IPriority,  IStatus, IAuthUser } from "interfaces";

export const EditTask: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ITask>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneProps } = useSelect<IAuthUser>({
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
        <Form.Item label="Assigne" name="users">
          <Select {...assigneProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kpbbz3xvuop9791u1ifp.png)
 

`src/pages/task/show`

```tsx
import { useShow, Show, Typography, Tag, useOne, DateField } from "@pankod/refine";
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

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Task:</Title>
      <Text>{record?.title || "-"}</Text>

      <Title level={5}>Task Desciption:</Title>
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
      <DateField format="DD/MM/YYYY" value={record?.start_time ?? "-"}/>

      <Title level={5}>Due Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.end_time ?? "-"}/>
    </Show>
  );
};
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pj1i0p6ham59me8qmud5.png)
 

By using Refine's basic views such as [create](https://refine.dev/docs/api-references/components/basic-views/create), [edit](https://refine.dev/docs/api-references/components/basic-views/edit/) and [show](https://refine.dev/docs/api-references/components/basic-views/show/), we can now create tasks, edit these tasks and view their details.


Let's see how to add a dashboard page to our project together.

`src/components/task/pie.tsx`

```tsx
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

`src/pages/dashboard/index.tsx`

```tsx
import React from "react";
import { useList, useMany, Row, Col, Card } from "@pankod/refine";
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
                return { type: i.title, value: groupBy(labelIds)[i.id] };
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
                return { type: i.title, value: groupBy(priorityIds)[i.id] };
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
                return { type: i.title, value: groupBy(statusIds)[i.id] };
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
                return { type: i.email, value: groupBy(assignedIds)[i.id] };
              }) ?? []
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l8mhcul8jvnxagiqotbv.png)
 
Final version of our `<App.tsx/>`.

```tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import "styles/antd.less";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";
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
            exact: true,
            component: Signup,
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
    />
  );
}
```

Our project is done. Lets see how its look like.

`Overview`

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={overview} alt="overview" />
</div>

<br />

`Task Filter`

 ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8du6o2q97l6g1773qjwq.gif)

`Dashboard Page`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bphuk3oaufhxacu4xseg.gif)
 

As you can see, we made a simple and short task manager application using refine on our front end and using its data-provider. 

[Here is repo](https://github.com/mlhekinci/refine-supabase-manage-task) 

For more information about Refine: [Refine Github Page](https://github.com/pankod/refine)

For other examples and articles that will interest you with refine:  [https://dev.to/pankod](https://dev.to/pankod)

 

