import type React from "react";
import type { MenuProps } from "antd";
import type {
  RefineThemedLayoutSiderProps as BaseRefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
  RefineLayoutThemedTitleProps,
} from "@refinedev/ui-types";

/**
 * A single antd `<Menu>` item, as accepted by its `items` prop.
 */
type ThemedSiderMenuItem = NonNullable<MenuProps["items"]>[number];

type BaseSiderRenderProps = Parameters<
  NonNullable<BaseRefineThemedLayoutSiderProps["render"]>
>[0];

type ThemedSiderRenderProps = BaseSiderRenderProps & {
  /**
   * Menu items of the resources as antd `<Menu>` `items` data, already filtered by access control.
   * Same tree as `items`, which holds the deprecated element form.
   */
  menuItems: ThemedSiderMenuItem[];
  /**
   * Logout item as antd `<Menu>` `items` data,
   * `undefined` when no `authProvider` is provided.
   */
  logoutItem?: ThemedSiderMenuItem;
};

type RefineThemedLayoutSiderProps = Omit<
  BaseRefineThemedLayoutSiderProps,
  "render"
> & {
  fixed?: boolean;
  /**
   * Customizes the menu.
   * - Return an array of menu item data (e.g. `[...menuItems, logoutItem]`) to render it with `<Menu items>`.
   * - Returning elements built from `items` and `logout` is still supported; they are rendered as `<Menu>`
   *   children, which antd v6 reports as deprecated.
   */
  render?: (
    props: ThemedSiderRenderProps,
  ) => React.ReactNode | (ThemedSiderMenuItem | undefined | false)[];
};

export type {
  RefineLayoutThemedTitleProps,
  RefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
  ThemedSiderMenuItem,
  ThemedSiderRenderProps,
};
