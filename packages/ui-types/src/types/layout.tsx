import { TitleProps, LayoutProps } from "@refinedev/core";

export type SiderRenderProps = {
  /**
   * menu items created depending on the `resources` defined in `<Refine>` component.
   */
  items: JSX.Element[];
  /**
   * logout button if you have `authProvider` defined and the current session is authenticated.
   */
  logout: React.ReactNode;
  /**
   * Dashboard menu item, if you have `DashboardPage` defined in `<Refine>` component.
   * @deprecated This only works with legacy router providers. Please use `resources` array instead.
   */
  dashboard: React.ReactNode;
  /**
   * Whether the sider is collapsed or not.
   */
  collapsed: boolean;
};

export type RefineLayoutSiderProps = {
  Title?: React.FC<TitleProps>;
  render?: (props: SiderRenderProps) => React.ReactNode;
  meta?: Record<string, unknown>;
};

export type RefineLayoutHeaderProps = {};

export type RefineLayoutFooterProps = {};

export type RefineLayoutTitleProps = TitleProps;

export type RefineLayoutLayoutProps = LayoutProps;

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export type RefineThemedLayoutProps = RefineLayoutLayoutProps;

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export type RefineThemedLayoutSiderProps = RefineLayoutSiderProps & {
  isSiderOpen?: boolean;
  onToggleSiderClick?: (isOpen?: boolean) => void;
};

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mui/components/mui-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export type RefineThemedLayoutHeaderProps = RefineLayoutHeaderProps & {
  isSiderOpen?: boolean;
  onToggleSiderClick?: (isOpen?: boolean) => void;
  toggleSiderIcon?: (open: boolean) => React.ReactNode;
};

export type RefineLayoutThemedTitleProps = RefineLayoutTitleProps & {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  wrapperStyles?: React.CSSProperties;
};

export type RefineThemedLayoutV2Props = {
  /**
   * Whether the sider is collapsed or not by default.
   */
  initialSiderCollapsed?: boolean;
} & RefineLayoutLayoutProps;
export type RefineThemedLayoutV2SiderProps = RefineLayoutSiderProps & {
  activeItemDisabled?: boolean;
};
export type RefineThemedLayoutV2HeaderProps = RefineLayoutHeaderProps & {
  /**
   * Whether the header is sticky or not.
   * @deprecated `isSticky` is deprecated. Please use `sticky` instead.
   */
  isSticky?: boolean;
  sticky?: boolean;
};
