---
title: Clone
swizzle: true
---

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component and the `clone` method from [`useNavigation`](/docs/routing/hooks/use-navigation) under the hood.

It can be useful when redirecting the app to the create page with the record id route of resource.

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
  CloneButton,
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
            <CloneButton size="small" recordItemId={record.id} />
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

const PostCreate = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    resources={[
      {
        name: "posts",
        list: PostList,
        create: PostCreate,
      },
    ]}
  />,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { CloneButton } from "@refinedev/antd";

const MyCloneComponent = () => {
  return <CloneButton resource="posts" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

### resource

`resource` is used to redirect the app to the `clone` action of the given resource name. By default, the app redirects to the inferred resource's `clone` action path.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@refinedev/antd";

const MyCloneComponent = () => {
  return <CloneButton resource="categories" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `clone` method of [`useNavigation`](/docs/routing/hooks/use-navigation). By default, the existing parameters in the route are used by the `clone` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `clone` action route is defined by the pattern: `/posts/:authorId/clone/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CloneButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@refinedev/antd";

const MyCloneComponent = () => {
  return (
    <CloneButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyCloneComponent,
        create: ClonedPage,
      },
    ]}
  />,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/docs/core/refine-component)

```tsx
import { CloneButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <CloneButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use the `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/CloneButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::
