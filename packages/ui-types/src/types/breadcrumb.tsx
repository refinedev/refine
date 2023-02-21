export type RefineBreadcrumbProps<
    TBreadcrumbProps extends {} = Record<keyof any, unknown>,
> = {
    /**
     * Passes properties for <Breadcrumb>
     */
    breadcrumbProps?: TBreadcrumbProps;
    /**
     * Shows the home button if application has [`DashboardPage`](/docs/api-reference/core/components/refine-config/#dashboardpage)
     */
    showHome?: boolean;
    /**
     * Allows to hide resource icons
     */
    hideIcons?: boolean;
    /**
     * To Show an item for home page
     */
    home?: {
        icon?: React.ReactNode;
        path?: string;
    };
};
