---
title: List
swizzle: true
---

`<ListButton>` is using Material UI's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/docs/routing/hooks/use-navigation) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useShow } from "@refinedev/core";
// highlight-next-line
import { ListButton, Show } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerButtons={
        // highlight-start
        <ListButton />
        // highlight-end
      }
    >
      <Stack gap="10px">
        <Typography fontWeight="bold">Id</Typography>
        <Typography>{record?.id}</Typography>
        <Typography fontWeight="bold">Title</Typography>
        <Typography>{record?.title}</Typography>
      </Stack>
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

The button text is defined automatically by Refine based on the `resource` definition.

## Properties

### resource

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@refinedev/mui";

const MyListComponent = () => {
  return <ListButton resource="categories" recordItemId="2" />;
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
      },
    ]}
    DashboardPage={MyListComponent}
  />,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `list` method of [`useNavigation`](/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `list` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `list` action route is defined by the pattern: `/:authorId/posts`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ListButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to show and hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@refinedev/mui";

const MyListComponent = () => {
  return (
    <ListButton
      resourceNameOrRouteName="posts"
      // highlight-next-line
      hideText
    />
  );
};

// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
      },
    ]}
    DashboardPage={MyListComponent}
  />,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/docs/core/refine-component)

```tsx
import { ListButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ListButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::
