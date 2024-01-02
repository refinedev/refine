---
title: Refresh
swizzle: true
---

`<RefreshButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component to update the data shown on the page via the [`useInvalidate`][use-invalidate] hook.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useShow } from "@refinedev/core";
// highlight-next-line
import { Show, RefreshButton } from "@refinedev/mui";
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
        <RefreshButton />
        // highlight-end
      }
    >
      <Typography fontWeight="bold">Id</Typography>
      <Typography>{record?.id}</Typography>
      <Typography fontWeight="bold">Title</Typography>
      <Typography>{record?.title}</Typography>
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

## Properties

### recordItemId

`recordItemId` allows us to manage which data is going to be refreshed. By default, `recordItemId` will be inferred from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@refinedev/mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      resource="posts"
      // highlight-next-line
      recordItemId="1"
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
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetch the record whose resource is "post" and whose id is "1".

### resource

`resource` allows us to manage which resource is going to be refreshed. By default, `<RefreshButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@refinedev/mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      resource="categories"
      // highlight-next-line
      recordItemId="2"
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
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetches the record whose resource is "categories" and whose id is "2".

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### hideText

`hideText` is used to show and hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@refinedev/mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      hideText
      resourceNameOrRouteName="posts"
      recordItemId="1"
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
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use the `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/RefreshButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::

[use-invalidate]: /docs/data/hooks/use-invalidate
