import type {
    RefineLayoutSiderProps,
    RefineLayoutHeaderProps,
    RefineLayoutLayoutProps,
    RefineLayoutTitleProps,
} from "@refinedev/ui-types";

type RefineLayoutThemedTitleProps = RefineLayoutTitleProps & {
    icon?: React.ReactNode;
    text?: React.ReactNode;
};

export type {
    RefineLayoutSiderProps as RefineThemedLayoutSiderProps,
    RefineLayoutHeaderProps as RefineThemedLayoutHeaderProps,
    RefineLayoutLayoutProps as RefineThemedLayoutProps,
    RefineLayoutThemedTitleProps,
};
