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
