---
"@refinedev/antd": major
"@refinedev/inferencer": major
---

feat: add support for Ant Design v6

Updated the `antd` peer dependency from `^5.23.0` to `^6.6.5` and `@ant-design/icons` from `^5.5.1` to `^6.3.4`.

`@refinedev/inferencer` is a major bump too: its `antd` and `@ant-design/icons` peer dependencies now require v6, and `@ant-design/icons` is a non-optional peer dependency, so projects on Ant Design v5 must stay on the previous major.

This is a major version bump because Ant Design v6 contains breaking changes that users should be aware of:

- React 18 or newer is required. `@ant-design/v5-patch-for-react-19` is no longer needed and can be removed.
- `@ant-design/pro-layout` is no longer a dependency. `<PageHeader />` is now implemented inside `@refinedev/antd` with the same props (`PageHeaderProps`) and the same `ant-page-header*` class names.
- Refine components and hooks now use the non-deprecated Ant Design v6 APIs:
  - `useTable` returns `tableProps.pagination.placement` instead of `position` (`"bottomRight"` → `"bottomEnd"`).
  - `useDrawerForm` returns `drawerProps.size` instead of `width`.
  - `notificationProvider` and `useImport` pass `title` instead of `message` to Ant Design's `notification`.
- `<ThemedSider />` renders its menu with the `items` API instead of `<Menu.Item>` children, so it no longer triggers the `[antd: Menu] children is deprecated` warning. Access control behaves as before: items the user can not access are not rendered.
  - The `render` prop now also receives `menuItems` (access-filtered `ItemType[]`) and `logoutItem`, and may return an array of menu items instead of a React node. Existing `render` functions that return `items` / `logout` elements keep working, but still use `<Menu.Item>` children.
  - Added `<CanAccessMenuItems />` to filter a custom menu item tree by access control in your own sider.

Here is the updated version alignment:

| @refinedev/antd | antd  | @ant-design/icons |
| --------------- | ----- | ----------------- |
| 6.x.x           | 5.x.x | 5.x.x             |
| 7.x.x           | 6.x.x | 6.x.x             |

For the full Ant Design v6 migration guide, see: https://ant.design/docs/react/migration-v6

[Resolves #7140](https://github.com/refinedev/refine/issues/7140)
