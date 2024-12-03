---
title: Migrating a React-Admin Application to Refine
description: Recently, our team decided to migrate a B2B admin panel of one of our customers from React-Admin to Refine to battle test our new framework and improve our productivity.
slug: migrating-a-react-admin-application-to-refine
authors: umut
tags: [Refine]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

Recently, our team decided to migrate a B2B admin panel of one of our customers from React-Admin to Refine to battle test our new framework and improve our productivity. My mission was to migrate it and it took one and a half days for me to rewrite the panel in refine.

<!--truncate-->

### Migrating a React-Admin Application to Refine

[Refine](https://refine.dev/) is an extremely customizable [Ant Design](https://ant.design/) based [React](https://reactjs.org/) framework for data-intensive applications and it handles most of the CRUD functionality that can be a requirement in many applications, without much effort. Providing the rest of the desired functionality (outside CRUD) is up to you, like in any <strong>React</strong> application.

React-Admin is an amazing B2B application framework based on [Material Design](https://material.io/), using [Material UI](https://mui.com/material-ui/getting-started/overview/). It provides ready-to-fetch-data components, so you just compose them together to create an application.

<strong>Refine</strong> is different in the way it makes you compose your application. Refine directly provides <strong>Ant Design</strong> components and some hooks to work with those components. Hooks give you the required props for those Ant Design components.

It is, also, one step forward towards the dream of <strong>making it headless</strong>.

To learn more about Refine, see: https://refine.dev/docs/

|                                                 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/sider.png" alt="sider" />                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _Our panel has 7 resources (all listable), which 4 of them must have create and edit pages, 6 of them must be exportable to `.csv` files and some of those resources have images, all images must be uploaded in `base64` format._ |

This is how it looks before the migration (React-Admin):

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/react_admin.png" alt="react-admin" />
<br/>

And this is how it looks like after the migration (Refine):

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/refine_table.png" alt="refine" />
<br/>

Both of these images show a list page of a resource (campaign).

## Migrating Listing Pages

List pages have one/more tables inside them. Ideally, all table state should be managed by the framework in use.

Refine is very flexible with tables. You can put them anywhere, configure it as much as you want with [useTable](https://refine.dev/docs/api-reference/antd/hooks/table/useTable/). See the [fineFoods example](https://refine.dev/demo/) and [it's code](https://github.com/refinedev/refine/blob/main/examples/finefoods-antd/src/pages/categories/list.tsx).

Here is an example list page from React-Admin that shows you the list of `id`,`name`, `isActive`, `startDate`, `endDate` from the API endpoint for `campaigns` resource.

```tsx
import React from "react";
import {
  List as ReactAdminList,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
} from "react-admin";

import LocalizeDateField from "../../fields/LocalizeDateField";

const List = (props) => (
  <ReactAdminList {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <BooleanField source="isActive" label="Active" />
      <LocalizeDateField source="startDate" />
      <LocalizeDateField source="endDate" />
      <EditButton basePath="/campaigns" />
    </Datagrid>
  </ReactAdminList>
);

export default List;
```

And looks like this:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/react_admin.png" alt="react-admin" />
<br/>

Here's the code that renders this same list in Refine:

```tsx
import React from "react";
import {
  List,
  Table,
  Space,
  Button,
  BooleanField,
  DateField,
  CreateButton,
  EditButton,
  ExportButton,
  Icons,
  useTable,
  getDefaultSortOrder,
  useExport,
  useDeleteMany,
  IResourceComponentsProps,
} from "@pankod/refine";

import { ICampaign } from "interfaces";

export const CampaignsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ICampaign>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
  });

  const { isLoading: isExportLoading, triggerExport } = useExport();

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  const { mutate, isLoading } = useDeleteMany<ICampaign>();

  const deleteSelectedItems = () => {
    mutate(
      {
        resource: "campaigns",
        ids: selectedRowKeys.map(String),
        mutationMode: "undoable",
      },
      {
        onSuccess: () => {
          setSelectedRowKeys([]);
        },
      },
    );
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <List
      pageHeaderProps={{
        subTitle: hasSelected && (
          <Button
            type="text"
            onClick={() => deleteSelectedItems()}
            loading={isLoading}
            icon={<Icons.DeleteOutlined style={{ color: "green" }} />}
          >
            Delete
          </Button>
        ),
        extra: (
          <Space>
            <CreateButton />
            <ExportButton onClick={triggerExport} loading={isExportLoading} />
          </Space>
        ),
      }}
    >
      <Table {...tableProps} rowSelection={rowSelection} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          width="70px"
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
        />
        <Table.Column
          dataIndex="isActive"
          title="Active"
          render={(isActive) => <BooleanField value={isActive} />}
          sorter
          defaultSortOrder={getDefaultSortOrder("isActive", sorter)}
        />
        <Table.Column
          dataIndex="startDate"
          title="Start Date"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
          defaultSortOrder={getDefaultSortOrder("startDate", sorter)}
        />
        <Table.Column
          dataIndex="endDate"
          title="End Date"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
          defaultSortOrder={getDefaultSortOrder("endDate", sorter)}
        />
        <Table.Column<ICampaign>
          fixed="right"
          title="Actions"
          dataIndex="actions"
          render={(_, { id }) => <EditButton recordItemId={id} />}
        />
      </Table>
    </List>
  );
};
```

It is long. Because we had to handle selection and bulk delete button manually. That's because Refine is decoupled from Ant Design components' code, too. But the advantage here is that you use Ant Design. You can use the Ant Design's Table as however you like, and then connect its data with refine. The point is customizability.
And it looks like this:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/refine_table.png" alt="refine" />
<br/>

In Refine, we use Ant Design's [Table](https://ant.design/components/table/) components.

## Migrating Create/Edit Pages

A resource creation page's code looked like this in React-Admin:

```tsx
import React from "react";
import {
  required,
  Create as ReactAdminCreate,
  SimpleForm,
  BooleanInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

const Create = (props: any) => (
  <ReactAdminCreate {...props}>
    <SimpleForm>
      <TextInput
        fullWidth
        variant="outlined"
        source="name"
        validate={[required()]}
      />
      <BooleanInput
        fullWidth
        variant="outlined"
        source="isActive"
        label="Active"
      />
      <DateTimeInput
        source="startDate"
        label="Start Date"
        validate={[required()]}
        fullWidth
        variant="outlined"
      />
      <DateTimeInput
        source="endDate"
        label="End Date"
        validate={[required()]}
        fullWidth
        variant="outlined"
      />
    </SimpleForm>
  </ReactAdminCreate>
);

export default Create;
```

And it looks like this:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-6-migrating-react-admin-to-refine/react_admin_create.png" alt="react-admin" />
<br/>

For Refine, code of our campaign create page looks like:

```tsx
import {
  Create,
  DatePicker,
  Form,
  Input,
  IResourceComponentsProps,
  Switch,
  useForm,
} from "@pankod/refine";
import dayjs from "dayjs";

export const CampaignsCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{ isActive: false }}
      >
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
        <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => dayjs(value)}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => dayjs(value)}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

In both Refine and React-Admin, by default, there aren't much differences between new resource page's code and resource edit page's code.

Also note that for both Refine and React-Admin, this is all customizable. These code examples and screenshots mean little or no extra customization in resource list/create/edit pages.

Advantage of Refine is that you use Ant Design directly. Let's assume you have your own way around your Ant Design application. Refine doesn't interfere. Instead, it provides you the necessary data for your Ant Design application. This way, Refine gives you all the freedom to customize all the components as you wish.

Happy hacking with Refine 🪄
