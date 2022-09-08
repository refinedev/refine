import { TitleProps, LayoutProps, ITreeMenu } from "@pankod/refine-core";
import {} from "@pankod/refine-core";

export type RefineLayoutHeaderProps = {};

export type RefineLayoutSiderProps = {
    items?: JSX.Element[];
    logout?: React.ReactNode;
    dashboard?: React.ReactNode;
};

export type RefineLayoutFooterProps = {};

export type RefineLayoutTitleProps = TitleProps;

export type RefineLayoutLayoutProps = LayoutProps;
