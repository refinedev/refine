import { TitleProps, LayoutProps } from "@refinedev/core";

export type SiderRenderProps = {
    items: JSX.Element[];
    logout: React.ReactNode;
    dashboard: React.ReactNode;
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
