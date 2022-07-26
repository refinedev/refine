export type RefineBreadcrumbProps<
    TBreadcrumbProps extends {} = Record<keyof any, unknown>,
> = {
    breadcrumbProps?: TBreadcrumbProps;
    showHome?: boolean;
    hideIcons?: boolean;
};
