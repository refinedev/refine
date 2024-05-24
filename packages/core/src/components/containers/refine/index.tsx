import React from "react";

import { useQuerySubscription } from "@refinedev/devtools-internal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReadyPage as DefaultReadyPage, RouteChangeHandler } from "@components";
import { Telemetry } from "@components/telemetry";
import { handleRefineOptions } from "@definitions";
import { useDeepMemo } from "@hooks/deepMemo";

import { AccessControlContextProvider } from "../../../contexts/accessControl";
import { AuditLogContextProvider } from "../../../contexts/auditLog";
import {
  AuthBindingsContextProvider,
  LegacyAuthContextProvider,
} from "../../../contexts/auth";
import { DataContextProvider } from "../../../contexts/data";
import { I18nContextProvider } from "../../../contexts/i18n";
import { LiveContextProvider } from "../../../contexts/live";
import { NotificationContextProvider } from "../../../contexts/notification";
import { RefineContextProvider } from "../../../contexts/refine";
import { ResourceContextProvider } from "../../../contexts/resource";
import { RouterContextProvider } from "../../../contexts/router";
import { LegacyRouterContextProvider } from "../../../contexts/router/legacy";
import { RouterPickerProvider } from "../../../contexts/router/picker";
import { UndoableQueueContextProvider } from "../../../contexts/undoableQueue";
import { UnsavedWarnContextProvider } from "../../../contexts/unsavedWarn";

import type { RefineProps } from "../../../contexts/refine/types";
import { useRouterMisuseWarning } from "../../../hooks/router/use-router-misuse-warning/index";

/**
 * {@link https://refine.dev/docs/api-reference/core/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, resources can be added as property.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config} for more details.
 */
export const Refine: React.FC<RefineProps> = ({
  legacyAuthProvider,
  authProvider,
  dataProvider,
  legacyRouterProvider,
  routerProvider,
  notificationProvider,
  accessControlProvider,
  auditLogProvider,
  resources,
  DashboardPage,
  ReadyPage,
  LoginPage,
  catchAll,
  children,
  liveProvider,
  i18nProvider,
  Title,
  Layout,
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  onLiveEvent,
  options,
}) => {
  const {
    optionsWithDefaults,
    disableTelemetryWithDefault,
    reactQueryWithDefaults,
  } = handleRefineOptions({
    options,
  });

  const queryClient = useDeepMemo(() => {
    if (reactQueryWithDefaults.clientConfig instanceof QueryClient) {
      return reactQueryWithDefaults.clientConfig;
    }

    return new QueryClient({
      ...reactQueryWithDefaults.clientConfig,
      defaultOptions: {
        ...reactQueryWithDefaults.clientConfig.defaultOptions,
        queries: {
          refetchOnWindowFocus: false,
          keepPreviousData: true,
          ...reactQueryWithDefaults.clientConfig.defaultOptions?.queries,
        },
      },
    });
  }, [reactQueryWithDefaults.clientConfig]);

  useQuerySubscription(queryClient);

  const useNotificationProviderValues = React.useMemo(() => {
    return typeof notificationProvider === "function"
      ? notificationProvider
      : () => notificationProvider;
  }, [notificationProvider]);

  const notificationProviderContextValues = useNotificationProviderValues();

  /**
   * Warn our users if they are using the old way of routing in the wrong prop.
   */
  useRouterMisuseWarning(routerProvider);
  /** */

  /**
   * `<ReadyPage />` is only used in the legacy routing and is not used in the new routing.
   * If `legacyRouterProvider` is provided and `routerProvider` is not, we'll check for the `resources` prop to be empty.
   * If `resources` is empty, then we'll render `<ReadyPage />` component.
   */
  if (
    legacyRouterProvider &&
    !routerProvider &&
    (resources ?? []).length === 0
  ) {
    return ReadyPage ? <ReadyPage /> : <DefaultReadyPage />;
  }

  /** Router
   *
   * Handle routing from `RouterContextProvider` and `router` prop for the brand new way
   * If `router` is not provided, then we'r checking for `routerProvider` prop
   * If `routerProvider` is provided, then `RouterContextProvider` is used
   * If none of them is provided, then `RouterContextProvider` is used because it supports undefined router
   *
   * `RouterContextProvider` is skipped whenever possible and by this way,
   * we can achieve backward compability only when its provided by user
   *
   */
  const { RouterComponent = React.Fragment } = !routerProvider
    ? legacyRouterProvider ?? {}
    : {};
  /** */

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider {...notificationProviderContextValues}>
        <LegacyAuthContextProvider
          {...(legacyAuthProvider ?? {})}
          isProvided={Boolean(legacyAuthProvider)}
        >
          <AuthBindingsContextProvider
            {...(authProvider ?? {})}
            isProvided={Boolean(authProvider)}
          >
            <DataContextProvider dataProvider={dataProvider}>
              <LiveContextProvider liveProvider={liveProvider}>
                <RouterPickerProvider
                  value={
                    legacyRouterProvider && !routerProvider ? "legacy" : "new"
                  }
                >
                  <RouterContextProvider router={routerProvider}>
                    <LegacyRouterContextProvider {...legacyRouterProvider}>
                      <ResourceContextProvider resources={resources ?? []}>
                        <I18nContextProvider i18nProvider={i18nProvider}>
                          <AccessControlContextProvider
                            {...(accessControlProvider ?? {})}
                          >
                            <AuditLogContextProvider
                              {...(auditLogProvider ?? {})}
                            >
                              <UndoableQueueContextProvider>
                                <RefineContextProvider
                                  mutationMode={
                                    optionsWithDefaults.mutationMode
                                  }
                                  warnWhenUnsavedChanges={
                                    optionsWithDefaults.warnWhenUnsavedChanges
                                  }
                                  syncWithLocation={
                                    optionsWithDefaults.syncWithLocation
                                  }
                                  Title={Title}
                                  undoableTimeout={
                                    optionsWithDefaults.undoableTimeout
                                  }
                                  catchAll={catchAll}
                                  DashboardPage={DashboardPage}
                                  LoginPage={LoginPage}
                                  Layout={Layout}
                                  Sider={Sider}
                                  Footer={Footer}
                                  Header={Header}
                                  OffLayoutArea={OffLayoutArea}
                                  hasDashboard={!!DashboardPage}
                                  liveMode={optionsWithDefaults.liveMode}
                                  onLiveEvent={onLiveEvent}
                                  options={optionsWithDefaults}
                                >
                                  <UnsavedWarnContextProvider>
                                    <RouterComponent>
                                      {children}
                                      {!disableTelemetryWithDefault && (
                                        <Telemetry />
                                      )}
                                      <RouteChangeHandler />
                                    </RouterComponent>
                                  </UnsavedWarnContextProvider>
                                </RefineContextProvider>
                              </UndoableQueueContextProvider>
                            </AuditLogContextProvider>
                          </AccessControlContextProvider>
                        </I18nContextProvider>
                      </ResourceContextProvider>
                    </LegacyRouterContextProvider>
                  </RouterContextProvider>
                </RouterPickerProvider>
              </LiveContextProvider>
            </DataContextProvider>
          </AuthBindingsContextProvider>
        </LegacyAuthContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  );
};
