import type { TitleProps, LayoutProps } from "@refinedev/core";

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
  /**
   *
   * Icon element to be displayed in the title.
   *
   * Default: Refine Icon
   *
   * ![Refine](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZGF0YS10ZXN0aWQ9InJlZmluZS1sb2dvIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEzLjguNGE0IDQgMCAwIDAtMy42IDBsLTggNEE0IDQgMCAwIDAgMCA4djhhNCA0IDAgMCAwIDIuMiAzLjZsOCA0YTQgNCAwIDAgMCAzLjYgMGw4LTRBNCA0IDAgMCAwIDI0IDE2VjhhNCA0IDAgMCAwLTIuMi0zLjZsLTgtNHpNOCA4YTQgNCAwIDEgMSA4IDB2OGE0IDQgMCAwIDEtOCAwVjh6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0xNCA4YTIgMiAwIDEgMS00IDAgMiAyIDAgMCAxIDQgMHoiLz48L3N2Zz4=)
   */
  icon?: React.ReactNode;
  /**
   * Text to be displayed in the title.
   *
   * @default "Refine Project"
   */
  text?: React.ReactNode;
  wrapperStyles?: React.CSSProperties;
};

export type RefineThemedLayoutV2Props = {
  /**
   * Whether the sider is collapsed or not by default.
   */
  initialSiderCollapsed?: boolean;

  /**
   * Callback function triggered when the sider's collapsed state changes.
   */
  onSiderCollapsed?: (collapsed: boolean) => void;
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
