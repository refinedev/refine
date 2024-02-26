---
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Material UI [Breadcrumb][mui-breadcrumb] components using the [`useBreadcrumb`](/docs/core/hooks/utilities/use-breadcrumb) hook.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { Show, Breadcrumb } from "@refinedev/mui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb />}
    >
      <p>Content of your show page...</p>
    </Show>
  );
};
// visible-block-end

const PostList = () => {
  return (
    <RefineMui.List>
      <p>Content of your list page...</p>
    </RefineMui.List>
  );
};

const PostIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={9} y1={6} x2={20} y2={6}></line>
    <line x1={9} y1={12} x2={20} y2={12}></line>
    <line x1={9} y1={18} x2={20} y2={18}></line>
    <line x1={5} y1={6} x2={5} y2="6.01"></line>
    <line x1={5} y1={12} x2={5} y2="12.01"></line>
    <line x1={5} y1={18} x2={5} y2="18.01"></line>
  </svg>
);

render(
  <RefineMuiDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        icon: PostIcon,
        show: PostShow,
        list: PostList,
      },
    ]}
  />,
);
```

:::simple Good to know

- You can swizzle this component with the [**Refine CLI**](/docs/packages/list-of-packages) to customize it.

- In earlier versions of Refine, `<Refine>` component had accepted `DashboardPage` which could be used to add an index page to your app. With the changes in `routerProvider` API of Refine, `DashboardPage` is deprecated. You can now define an index route yourself manually by your router package.

- In earlier versions, the home icon in the `Breadcrumb` was created by the `DashboardPage`, now it is rendered if you define a an action route as `/` in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting `showHome` to `false`.

:::

## Properties

### breadcrumbProps

`<Breadcrumb>` component uses the Material UI's [Breadcrumb][mui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
  return (
    <List breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}>
      ...
    </List>
  );
};
```

### showHome

If you have a page with route `/`, it will be used as the root of the hierarchy and shown in the `Breadcrumb` with a home icon. To hide the root item, set `showHome` to `false.`

```tsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={true} />}
    >
      ...
    </List>
  );
};
```

### meta

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}
    >
      ...
    </List>
  );
};
```

### hideIcons

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
    return (
        <List breadcrumb={<Breadcrumb hideIcons />}>...</List>;
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://mui.com/material-ui/react-breadcrumbs/#main-content)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://mui.com/material-ui/react-breadcrumbs/#api)"
/>

[mui-breadcrumb]: https://mui.com/material-ui/react-breadcrumbs/#main-content
