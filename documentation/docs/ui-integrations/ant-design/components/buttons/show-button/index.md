---
title: Show
swizzle: true
---

`<ShowButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component and the`show` method from [`useNavigation`](/docs/routing/hooks/use-navigation) under the hood.

It can be useful when redirecting the app to the show page with the record id route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=300px
const { useRouterContext } = RefineCore;
// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  ShowButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="100%" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            // highlight-next-line
            <ShowButton size="small" recordItemId={record.id} />
          )}
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const PostShow = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    resources={[
      {
        name: "posts",
        list: PostList,
        show: PostShow,
      },
    ]}
  />,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;
// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};

// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

### resource

The redirection endpoint is defined by the `resource`'s `show` action path. By default, `<ShowButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      resource="categories"
      recordItemId="123"
    />
  );
};

// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
      {
        name: "categories",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `show` method of [`useNavigation`](/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `show` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `show` action route is defined by the pattern: `/posts/:authorId/show/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ShowButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      recordItemId="123"
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyShowComponent,
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
  />,
);
```

### accessControl

This prop can be used to skip the access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with its `hideIfUnauthorized` property. However, this only works when an [`accessControlProvider`](/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/docs/core/refine-component)

```tsx
import { ShowButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <ShowButton
      // highlight-start
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
      // highlight-end
    />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/ShowButton" />

:::simple External Props

`<ShowButton>` also accepts all props of Ant Design's [Button](https://ant.design/components/button/#API) component.

:::
