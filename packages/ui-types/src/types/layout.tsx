import { TitleProps, LayoutProps } from "@pankod/refine-core";

export type SiderRenderProps = {
    items: JSX.Element[];
    logout: React.ReactNode;
    dashboard: React.ReactNode;
    collapsed: boolean;
};

export type RefineLayoutSiderProps = {
    render?: (props: SiderRenderProps) => React.ReactNode;
    meta?: Record<string, unknown>;
};

export type RefineLayoutHeaderProps = {};

export type RefineLayoutFooterProps = {};

export type RefineLayoutTitleProps = TitleProps;

export type RefineLayoutLayoutProps = LayoutProps;
