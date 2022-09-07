import { TitleProps, LayoutProps } from "@pankod/refine-core";

export type RefineLayoutHeaderProps = {};

export type RefineLayoutSiderProps = {
    bottomSection?:
        | React.ReactNode
        | ((defaultBottom: React.ReactNode) => React.ReactNode);
    topSection?:
        | React.ReactNode
        | ((defaultTop: React.ReactNode) => React.ReactNode);
};

export type RefineLayoutFooterProps = {};

export type RefineLayoutTitleProps = TitleProps;

export type RefineLayoutLayoutProps = LayoutProps;
