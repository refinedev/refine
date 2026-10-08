---
title: "Ant Design v5 to v6 Migration Guide | Upgrade Checklist & Fixes in Refine v5"
display_title: "Migration Guide for Ant Design from v5 to v6"
sidebar_label: Ant Design v5 to v6
description: "Upgrade @refinedev/antd to support Ant Design v6. Version alignment, required package updates, React 19 patch removal, PageHeader changes and common prop renames."
---

# Migration Guide for Ant Design v6

Ant Design released a new major version, v6. `@refinedev/antd@7` is the release that supports it. This guide focuses on migrating the Refine-related parts of your project.

:::simple Official Migration Guide

- [Ant Design v6](https://ant.design/docs/react/migration-v6)

:::

## Package Version Alignment

Please ensure the following version alignment to avoid issues:

| @refinedev/antd | antd   | @ant-design/icons | React    |
| --------------- | ------ | ----------------- | -------- |
| 6.x.x           | ^5.x.x | ^5.x.x            | 18 or 19 |
| 7.x.x           | ^6.6.5 | ^6.3.4            | 18 or 19 |

`antd@6` requires React 18 or later and no longer supports React 17.

## Updating the packages

Update `@refinedev/antd`, `antd` and `@ant-design/icons` to the versions listed above.

<Tabs
defaultValue="npm"
values={[
{label: 'npm', value: 'npm'},
{label: 'pnpm', value: 'pnpm'},
{label: 'yarn', value: 'yarn'},
]}>

<TabItem value="npm">

```bash
npm i @refinedev/antd@^7.0.0 antd@^6.6.5 @ant-design/icons@^6.3.4
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm add @refinedev/antd@^7.0.0 antd@^6.6.5 @ant-design/icons@^6.3.4
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add @refinedev/antd@^7.0.0 antd@^6.6.5 @ant-design/icons@^6.3.4
```

</TabItem>

</Tabs>

## Remove the React 19 patch

`antd@6` supports React 19 natively, so `@ant-design/v5-patch-for-react-19` is no longer needed. Uninstall it and remove its import:

```bash
npm uninstall @ant-design/v5-patch-for-react-19
```

```diff title="App.tsx"
- import "@ant-design/v5-patch-for-react-19";
```

## `@ant-design/pro-layout` is no longer a dependency

`@refinedev/antd` no longer depends on `@ant-design/pro-layout`. The `<PageHeader>` used by `<List>`, `<Create>`, `<Edit>` and `<Show>` is now implemented inside `@refinedev/antd`. It accepts the same props (`PageHeaderProps`) and renders the same `ant-page-header*` CSS class names, so code using `headerProps` or importing `PageHeader` from `@refinedev/antd` keeps working without changes.

If your own code imports from `@ant-design/pro-layout` or `@ant-design/pro-components`, Refine no longer installs these packages for you. Install them yourself and check their compatibility with `antd@6`: the latest stable releases still declare `antd` `^4 || ^5` as their peer dependency.

If you list these packages in `transpilePackages` (for example in `next.config.js`), you can remove the entries you no longer use.

## Changes in `@refinedev/antd`

### `useTable` pagination placement

`tableProps.pagination` now uses `placement` instead of the deprecated `position`, and `"bottomRight"` became `"bottomEnd"`. Ant Design gives `placement` priority over `position`, so if you override it, use `placement`:

```diff
<Table
  {...tableProps}
  pagination={{
    ...tableProps.pagination,
-   position: ["bottomRight"],
+   placement: ["bottomEnd"],
  }}
/>
```

### `useDrawerForm` drawer size

`drawerProps` now sets `size: "500px"` instead of `width: "500px"`. Ant Design gives `size` priority over `width`, so override `size` to change the drawer width.

### `<ThemedSider />` menu items

`<ThemedSider />` now renders its menu with the Ant Design `items` API instead of `<Menu.Item>` children, so it no longer logs the `` `children` is deprecated `` warning. Items that the user can not access are still hidden.

The `render` prop receives two new values: `menuItems`, the access-filtered menu items as `ItemType[]`, and `logoutItem`. Return an array of menu items to render them with the `items` API:

```tsx
<ThemedSider
  render={({ menuItems, logoutItem }) => [
    ...menuItems,
    { key: "/post-review", label: <Link to="/post-review">Post Review</Link> },
    logoutItem,
  ]}
/>
```

Existing `render` functions that return the `items` and `logout` elements keep working, but they still render `<Menu.Item>` children and log the warning.

If you build your own sider, `<CanAccessMenuItems />` checks the `menuItems` tree returned by `useMenu` against your access control provider and gives you a `canAccess` predicate to filter it before converting it to Ant Design menu items:

```tsx
import { useMenu, type TreeMenuItem } from "@refinedev/core";
import { CanAccessMenuItems } from "@refinedev/antd";
import { Menu, type MenuProps } from "antd";

const { menuItems, selectedKey } = useMenu();

const toAntdItems = (
  items: TreeMenuItem[],
  canAccess: (item: TreeMenuItem) => boolean,
): MenuProps["items"] =>
  items.filter(canAccess).map((item) => ({
    key: item.key,
    label: item.label,
    children: item.children.length
      ? toAntdItems(item.children, canAccess)
      : undefined,
  }));

<CanAccessMenuItems menuItems={menuItems}>
  {(canAccess) => (
    <Menu selectedKeys={[selectedKey]} items={toAntdItems(menuItems, canAccess)} />
  )}
</CanAccessMenuItems>;
```

## Ant Design Changes

Refine's own components were updated to use the non-deprecated Ant Design v6 APIs. Your own code that uses Ant Design components directly should follow the [official Ant Design v6 migration guide](https://ant.design/docs/react/migration-v6).

These are some of the most common renames. See the official guide for the full list.

| Component                    | Before (deprecated)   | After                  |
| ---------------------------- | --------------------- | ---------------------- |
| `Space`                      | `direction`           | `orientation`          |
| `notification`               | `message`             | `title`                |
| `Drawer`                     | `width`               | `size`                 |
| `Modal`                      | `destroyOnClose`      | `destroyOnHidden`      |
| `Card`, `Input`, `Select`, … | `bordered`            | `variant`              |
| `Select`, `Dropdown`, …      | `dropdownRender`      | `popupRender`          |
| `Table`                      | `pagination.position` | `pagination.placement` |

```diff title="Example"
- <Space direction="vertical">
+ <Space orientation="vertical">
```

## Known Issues

### Peer dependency warnings from `@ant-design/pro-*` packages

If your project still uses `@ant-design/pro-layout` or `@ant-design/pro-components`, your package manager may warn about an unmet `antd` peer dependency, because these packages declare `antd` `^4 || ^5`. Refine does not use them anymore, so this only affects code you wrote yourself.
