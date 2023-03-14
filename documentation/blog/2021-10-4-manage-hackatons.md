---
title: Let's Build an App to Manage Your Hackathons with Refine
description: We'll be building a demo app to manage hackathons with refine.
slug: manage-hackathons-with-refine
authors: muharrem
tags: [refine, supabase, react, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---


:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

:::


We'll be building a demo app to manage hackathons with [refine](https://refine.dev/). We'll be able to create new hackathons, new project entries for a hackathon and criterias for a hackathon.

<!--truncate-->

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-manage-hackathons/hackathons.png" alt="hackathons" />
</div>
<br/>

We'll use [supabase](https://supabase.io/) as the backend service. **refine** comes with a builtin data provider for supabase thus it's very easy to create crud pages.

## Creating tables
Our app will have these tables in supabase
* criterias
* hackathons
* hackathoners
* projects
* projectscores  

These are reflected in our app as 
```ts
export type HackathonerType = {
  id: string;
  name: string;
};

export type HackathonType = {
  id: string;
  start: string;
  end: string;
  name: string;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  url: string;
  hackathon_id: string;
  hackathoner_id: string;
};

export type CriteriaType = {
  id: string;
  name: string;
  hackathon_id: string;
};

export type ProjectScoreType = {
  project_id: string;
  criteria_id: string;
  score: string;
};

```

## Craeting CRUD pages
Creating crud pages is as easy like this:

List page:
```tsx
import {
  List,
  Table,
  useTable,
  Space,
  ShowButton,
  EditButton,
  TextField,
} from "@pankod/refine";

import dayjs from "dayjs";

import { HackathonType } from "interfaces";

export const HackathonsList: React.FC = () => {
  const { tableProps } = useTable<HackathonType>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="start"
          title="Starts"
          render={(value) => (
            <TextField value={dayjs(value).format("DD/MMMM dddd")} />
          )}
        />
        <Table.Column
          dataIndex="end"
          title="Ends"
          render={(value) => (
            <TextField value={dayjs(value).format("DD/MMMM dddd")} />
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_text, record: HackathonType): React.ReactNode => {
            return (
              <Space>
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};

```

## Create page:
```tsx
import { Create, Form, Input, useForm, DatePicker } from "@pankod/refine";

import { HackathonType } from "interfaces";

export const HackathonsCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<HackathonType>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="start">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Name" name="end">
          <DatePicker />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

Then use these pages as the corresponding crud component for the `hackathon` resource:
```tsx
import { Refine } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "utility";
import {
  HackathonsList,
  HackathonsCreate,
  HackathonsEdit,
  HackathonsShow,
} from "./pages/hackathons";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      resources={[{
        name: "hackathons",
        list: HackathonsList,
        create: HackathonsCreate,
        edit: HackathonsEdit,
        show: HackathonsShow
      }]}
    />
  );
}

export default App;

```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-manage-hackathons/create.png" alt="create" />
</div>
<br/>

**refine** comes with builtin hooks for Ant design components. You can find detailed usage for the hooks and supabase in the [documentation](https://refine.dev/docs/)

## Creating voting page
We'll use the dashboard option to place voting page. We'll need data from different resources. **refine** comes with powerful hooks that are based on react-query to get data from those resources.

For example to get the hackathons that are active now we can use the `useList` hook:
```tsx
export const DashboardPage: React.FC = () => {
  const currentHackathons = useList<HackathonType>({
    resource: "hackathons",
    filters: [
      {
        field: "start",
        operator: "lte",
        value: now,
      },
      {
        field: "end",
        operator: "gte",
        value: now,
      },
    ],
  });
}
```
## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/hackathonize-xcpcp?autoresize=1fontsize=14&=1&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="hackathonize"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

We can get data from other resources in a similar fashion. You can find the [repo here](https://github.com/refinedev/refine/tree/master/examples/blog-hackathonize)
## Conclusion
This project itself is a product of a hackathon. It lacks lots of feature like authorization though it shows how **refine** makes it easy to quickly build a working app.