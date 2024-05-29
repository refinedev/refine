import React, { type ReactNode } from "react";

import type { QueryClient, QueryClientConfig } from "@tanstack/react-query";

import type { RedirectAction } from "../../hooks/form/types";
import type { UseLoadingOvertimeRefineContext } from "../../hooks/useLoadingOvertime";
import type { AccessControlProvider } from "../accessControl/types";
import type { AuditLogProvider } from "../auditLog/types";
import type { AuthProvider, LegacyAuthProvider } from "../auth/types";
import type { DataProvider, DataProviders, MutationMode } from "../data/types";
import type { I18nProvider } from "../i18n/types";
import type { LiveModeProps, LiveProvider } from "../live/types";
import type { NotificationProvider } from "../notification/types";
import type { ResourceProps } from "../resource/types";
import type { LegacyRouterProvider } from "../router/legacy/types";
import type { RouterProvider } from "../router/types";

export type TitleProps = {
  collapsed: boolean;
};

export type LayoutProps = {
  Sider?: React.FC<{
    Title?: React.FC<TitleProps>;
    render?: (props: {
      items: JSX.Element[];
      logout: React.ReactNode;
      dashboard: React.ReactNode;
      collapsed: boolean;
    }) => React.ReactNode;
    meta?: Record<string, unknown>;
  }>;
  Header?: React.FC;
  Title?: React.FC<TitleProps>;
  Footer?: React.FC;
  OffLayoutArea?: React.FC;
  dashboard?: boolean;
  children?: ReactNode;
};

export type DashboardPageProps<TCrudData = any> = {
  initialData?: TCrudData;
} & Record<any, any>;

export type TextTransformers = {
  /**
   * Convert a camelized/dasherized/underscored string into a humanized one
   * @example
   * humanize("some_name") => "Some name"
   */
  humanize?: (text: string) => string;
  /**
   * Pluralize a word
   * @example
   * plural('regex') => "regexes"
   */
  plural?: (word: string) => string;
  /**
   * Singularize a word
   * @example
   * singular('singles') => "single"
   */
  singular?: (word: string) => string;
};

export interface IRefineOptions {
  breadcrumb?: ReactNode;
  mutationMode?: MutationMode;
  syncWithLocation?: boolean;
  warnWhenUnsavedChanges?: boolean;
  undoableTimeout?: number;
  liveMode?: LiveModeProps["liveMode"];
  disableTelemetry?: boolean;
  redirect?: {
    afterCreate?: RedirectAction;
    afterClone?: RedirectAction;
    afterEdit?: RedirectAction;
  };
  reactQuery?: {
    clientConfig?: QueryClientConfig | InstanceType<typeof QueryClient>;
    /**
     * @deprecated `@tanstack/react-query`'s devtools are removed from the core. Please use the `@tanstack/react-query-devtools` package manually in your project. This option will be removed in the next major version and has no effect on the `@tanstack/react-query-devtools` package usage.
     */
    devtoolConfig?: any | false;
  };
  overtime?: UseLoadingOvertimeRefineContext;
  textTransformers?: TextTransformers;
  /**
   * Disables server-side validation globally for the useForm hook
   * @default false
   * @see {@link https://refine.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean;
  /**
   * The project id of your refine project. Will be set automatically. Don't modify.
   */
  projectId?: string;
  useNewQueryKeys?: boolean;
  /**
   * Icon and name for the app title. These values are used as default values in the <ThemedLayoutV2 /> and <AuthPage /> components.
   * By default, `icon` is the Refine logo and `text` is "Refine Project".
   */
  title?: {
    icon?: React.ReactNode;
    text?: React.ReactNode;
  };
}

export interface IRefineContextOptions {
  breadcrumb?: ReactNode;
  mutationMode: MutationMode;
  syncWithLocation: boolean;
  warnWhenUnsavedChanges: boolean;
  undoableTimeout: number;
  liveMode: LiveModeProps["liveMode"];
  redirect: {
    afterCreate: RedirectAction;
    afterClone: RedirectAction;
    afterEdit: RedirectAction;
  };
  overtime: UseLoadingOvertimeRefineContext;
  textTransformers: Required<TextTransformers>;
  disableServerSideValidation: boolean;
  projectId?: string;
  useNewQueryKeys?: boolean;
  title: {
    icon?: React.ReactNode;
    text?: React.ReactNode;
  };
}

export interface IRefineContext {
  __initialized?: boolean;
  hasDashboard: boolean;
  mutationMode: MutationMode;
  /**
   * @deprecated Please use `UnsavedChangesNotifier` components from router packages instead.
   */
  warnWhenUnsavedChanges: boolean;
  syncWithLocation: boolean;
  undoableTimeout: number;
  catchAll?: React.ReactNode;
  DashboardPage?: RefineProps["DashboardPage"];
  LoginPage?: React.FC | false;
  Title?: React.FC<TitleProps>;
  Layout: React.FC<LayoutProps>;
  Sider?: React.FC;
  Header?: React.FC;
  Footer?: React.FC;
  OffLayoutArea?: React.FC;
  liveMode: LiveModeProps["liveMode"];
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  options: IRefineContextOptions;
}

export interface IRefineContextProvider {
  __initialized?: boolean;
  hasDashboard: boolean;
  mutationMode: MutationMode;
  warnWhenUnsavedChanges: boolean;
  syncWithLocation: boolean;
  undoableTimeout: number;
  /**
   * @deprecated Please use the `catchAll` element in your routes instead.
   */
  catchAll?: React.ReactNode;
  /**
   * @deprecated Please use the `DashboardPage` component in your routes instead.
   */
  DashboardPage?: RefineProps["DashboardPage"];
  /**
   * @deprecated Please use the `LoginPage` component in your routes instead.
   */
  LoginPage?: React.FC | false;
  /**
   * @deprecated Please pass the `Title` component to your `Layout` component.
   */
  Title?: React.FC<TitleProps>;
  /**
   * @deprecated Please use the `Layout` component as a children instead of a prop.
   */
  Layout?: React.FC<LayoutProps>;
  /**
   * @deprecated Please pass the `Sider` component to your `Layout` component.
   */
  Sider?: React.FC;
  /**
   * @deprecated Please pass the `Header` component to your `Layout` component.
   */
  Header?: React.FC;
  /**
   * @deprecated Please pass the `Footer` component to your `Layout` component.
   */
  Footer?: React.FC;
  /**
   * @deprecated Please use your `OffLayoutArea` component as a children instead of a prop.
   */
  OffLayoutArea?: React.FC;
  liveMode: LiveModeProps["liveMode"];
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  options: IRefineContextOptions;
  children?: ReactNode;
}

export interface RefineProps {
  children?: React.ReactNode;
  /**
   * `resources` is the predefined interaction points for a refine app. A resource represents an entity in an endpoint in the API.
   * While this is not a required property, it is used in resource detection and creation of routes for the app.
   * @type [`ResourceProps[]`](https://refine.dev/docs/api-reference/core/components/refine-config/#resources)
   */
  resources?: ResourceProps[];
  /**
   * **refine** needs some router functions to create resource pages, handle navigation, etc. This provider allows you to use the router library you want
   * @type [`IRouterProvider`](https://refine.dev/docs/api-reference/core/providers/router-provider/)
   * @deprecated This property is deprecated and was the legacy way of routing. Please use `routerProvider` with new router bindings instead.
   */
  legacyRouterProvider?: LegacyRouterProvider;
  /**
   * Router bindings for **refine**. A simple interface for **refine** to interact with your router in a flexible way.
   * @type [`RouterProvider`](https://refine.dev/docs/routing/router-provider/)
   */
  routerProvider?: RouterProvider;
  /**
   * A `dataProvider` is the place where a refine app communicates with an API. Data providers also act as adapters for refine, making it possible for it to consume different API's and data services.
   * @type [`DataProvider` | `DataProviders`](https://refine.dev/docs/api-reference/core/providers/data-provider/)
   */
  dataProvider?: DataProvider | DataProviders;
  /**
   * `authProvider` handles authentication logic like login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.
   * @type [`AuthProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/)
   */
  authProvider?: AuthProvider;
  /**
   * `legacyAuthProvider` handles authentication logic like login, logout flow and checking user credentials. It is an object with methods that refine uses when necessary.
   * @type [`AuthProvider`](https://refine.dev/docs/api-reference/core/providers/auth-provider/)
   * @deprecated `legacyAuthProvider` is deprecated with refine@4, use `authProvider` instead.
   */
  legacyAuthProvider?: LegacyAuthProvider;
  /**
   * **refine** lets you add Realtime support to your app via `liveProvider`. It can be used to update and show data in Realtime throughout your app.
   * @type [`LiveProvider`](https://refine.dev/docs/api-reference/core/providers/live-provider/)
   */
  liveProvider?: LiveProvider;
  /**
   * `notificationProvider` handles notification logics. It is an object with methods that refine uses when necessary.
   * @type [`NotificationProvider` | `(() => NotificationProvider)`](https://refine.dev/docs/api-reference/core/providers/notification-provider/)
   */
  notificationProvider?: NotificationProvider | (() => NotificationProvider);
  /**
   * `accessControlProvider` is the entry point for implementing access control for refine apps.
   * @type [`AccessControlProvider`](https://refine.dev/docs/api-reference/core/providers/accessControl-provider/)
   */
  accessControlProvider?: AccessControlProvider;
  /**
   * **refine** allows you to track changes in your data and keep track of who made the changes.
   * @type [`AuditLogProvider`](https://refine.dev/docs/api-reference/core/providers/audit-log-provider#overview)
   */
  auditLogProvider?: AuditLogProvider;
  /**
   * `i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.
   * @type [`i18nProvider`](https://refine.dev/docs/api-reference/core/providers/i18n-provider/)
   */
  i18nProvider?: I18nProvider;
  /**
   * A custom error component.
   * @type [`ReactNode`](https://refine.dev/docs/api-reference/core/components/refine-config/#catchall)
   * @deprecated Please use the `catchAll` element in your routes instead.
   */
  catchAll?: React.ReactNode;
  /**
   * Custom login component can be passed to the `LoginPage` property.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#loginpage)
   * @deprecated Please use the `LoginPage` component in your routes instead.
   */
  LoginPage?: React.FC;
  /**
   * A custom dashboard page can be passed to the `DashboardPage` prop which is accessible on root route.
   * @type [`React.FC<DashboardPageProps>`](https://refine.dev/docs/api-reference/core/components/refine-config/#dashboardpage)
   * @deprecated Please use the `DashboardPage` component in your routes instead.
   */
  DashboardPage?: React.FC<DashboardPageProps>;
  /**
   * Custom ready page component can be set by passing to `ReadyPage` property.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#readypage)
   * @deprecated This component is only used with the legacy router and will be removed in the future.
   */
  ReadyPage?: React.FC;
  /**
   * Default layout can be customized by passing the `Layout` property.
   * @type [`React.FC<LayoutProps>`](https://refine.dev/docs/api-reference/core/components/refine-config/#layout)
   * @deprecated Please use the `Layout` component as a children instead of a prop.
   */
  Layout?: React.FC<LayoutProps>;
  /**
   * The default sidebar can be customized by using refine hooks and passing custom components to `Sider` property.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#sider)
   * @deprecated Please pass the `Sider` component to your `Layout` component.
   */
  Sider?: React.FC;
  /**
   * The default app header can be customized by passing the `Header` property.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#header)
   * @deprecated Please pass the `Header` component to your `Layout` component.
   */
  Header?: React.FC;
  /**
   *The default app footer can be customized by passing the `Footer` property.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#footer)
   * @deprecated Please pass the `Footer` component to your `Layout` component.
   */
  Footer?: React.FC;
  /**
   * The component wanted to be placed out of app layout structure can be set by passing to `OffLayoutArea` prop.
   * @type [`React.FC`](https://refine.dev/docs/api-reference/core/components/refine-config/#offlayoutarea)
   * @deprecated Please use your `OffLayoutArea` component as a children instead of a prop.
   */
  OffLayoutArea?: React.FC;
  /**
   * TThe app title can be set by passing the `Title` property.
   * @type [`React.FC<TitleProps>`](https://refine.dev/docs/api-reference/core/components/refine-config/#title)
   * @deprecated Please pass the `Title` component to your `Layout` component.
   */
  Title?: React.FC<TitleProps>;
  /**
   * Callback to handle all live events.
   * @type [`(event: LiveEvent) => void`](https://refine.dev/docs/api-reference/core/providers/live-provider/#onliveevent)
   */
  onLiveEvent?: LiveModeProps["onLiveEvent"];
  /**
   * `options` is used to configure the app.
   * @type [`IRefineOptions`](https://refine.dev/docs/api-reference/core/components/refine-config/#options)
   * */
  options?: IRefineOptions;
}
