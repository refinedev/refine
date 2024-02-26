export type RefineBreadcrumbProps<
  TBreadcrumbProps extends {} = Record<keyof any, unknown>,
> = {
  /**
   * Passes properties for <Breadcrumb>
   */
  breadcrumbProps?: TBreadcrumbProps;
  /**
   * Shows the home button if you have a resource with `list` action defined as `/` route.
   */
  showHome?: boolean;
  /**
   * Allows to hide resource icons
   */
  hideIcons?: boolean;
  /**
   * Additional params to be used in the route generation process.
   */
  meta?: Record<string, string | number>;
};
