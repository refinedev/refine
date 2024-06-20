import React, { useMemo } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import {
  LoginPage as DefaultLoginPage,
  ErrorComponent,
  LayoutWrapper,
  useResource,
  useRefineContext,
  useRouterContext,
  CanAccess,
  type ResourceRouterParams,
  useActiveAuthProvider,
  useIsAuthenticated,
} from "@refinedev/core";
import type { RefineRouteProps } from "./index";

const ResourceComponent: React.FC<{ route: string }> = ({ route }) => {
  const { catchAll } = useRefineContext();
  const { useParams } = useRouterContext();
  const { resources } = useResource();

  const { action, id } = useParams<ResourceRouterParams>();

  const resource = resources.find((res) => res.route === route);

  if (resource) {
    const {
      list,
      create,
      edit,
      show,
      name,
      canCreate,
      canEdit,
      canShow,
      canDelete,
      options,
    } = resource;

    const stringError = () =>
      console.error(
        "`string` resource routes are not supported in legacy router. Please switch to the new router or assign Components to the resource routes.",
      );
    const definitionError = () =>
      console.error(
        "`Object` resource routes are not supported in legacy router. Please switch to the new router or assign Components to the resource routes.",
      );

    const List =
      (typeof list === "string"
        ? stringError()
        : typeof list === "object"
          ? definitionError()
          : list) ?? (() => null);
    const Create =
      (typeof create === "string"
        ? stringError()
        : typeof create === "object"
          ? definitionError()
          : create) ?? (() => null);
    const Edit =
      (typeof edit === "string"
        ? stringError()
        : typeof edit === "object"
          ? definitionError()
          : edit) ?? (() => null);
    const Show =
      (typeof show === "string"
        ? stringError()
        : typeof show === "object"
          ? definitionError()
          : show) ?? (() => null);

    const renderCrud = () => {
      switch (action) {
        case undefined:
          return (
            <CanAccess
              resource={name}
              action="list"
              fallback={catchAll ?? <ErrorComponent />}
              params={{
                resource,
              }}
            >
              {!list ? (
                catchAll ?? <ErrorComponent />
              ) : (
                <List
                  name={name}
                  canCreate={canCreate}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  canShow={canShow}
                  options={options}
                />
              )}
            </CanAccess>
          );
        case "create":
        case "clone":
          return (
            <CanAccess
              resource={name}
              action="create"
              fallback={catchAll ?? <ErrorComponent />}
              params={{
                id: id ? decodeURIComponent(id) : undefined,
                resource,
              }}
            >
              {!create ? (
                catchAll ?? <ErrorComponent />
              ) : (
                <Create
                  name={name}
                  canCreate={canCreate}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  canShow={canShow}
                  options={options}
                />
              )}
            </CanAccess>
          );

        case "edit":
          return (
            <CanAccess
              resource={name}
              action="edit"
              params={{
                id: id ? decodeURIComponent(id) : undefined,
                resource,
              }}
              fallback={catchAll ?? <ErrorComponent />}
            >
              {!edit ? (
                catchAll ?? <ErrorComponent />
              ) : (
                <Edit
                  name={name}
                  canCreate={canCreate}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  canShow={canShow}
                  options={options}
                />
              )}
            </CanAccess>
          );

        case "show":
          return (
            <CanAccess
              resource={name}
              action="show"
              params={{
                id: id ? decodeURIComponent(id) : undefined,
                resource,
              }}
              fallback={catchAll ?? <ErrorComponent />}
            >
              {!show ? (
                catchAll ?? <ErrorComponent />
              ) : (
                <Show
                  name={name}
                  canCreate={canCreate}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  canShow={canShow}
                  options={options}
                />
              )}
            </CanAccess>
          );
        default:
          return <>{catchAll ?? <ErrorComponent />}</>;
      }
    };

    return renderCrud();
  }

  return <>{catchAll ?? <ErrorComponent />}</>;
};

type RouteProviderProps = {
  initialRoute?: string;
};

export const RouteProvider = ({
  initialRoute,
}: RouteProviderProps): JSX.Element => {
  const { resources } = useResource();
  const { catchAll, DashboardPage, LoginPage } = useRefineContext();

  const { routes: customRoutes } = useRouterContext();

  const authProvider = useActiveAuthProvider();
  const {
    isFetching,
    isError,
    data: authData,
  } = useIsAuthenticated({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    params: {
      type: "routeProvider",
    },
  });

  const isAuthenticated = useMemo(() => {
    if (authProvider?.isProvided) {
      if (authProvider?.isLegacy) {
        const hasAuthError = isError || authData?.error;
        return !hasAuthError;
      }

      return authData?.authenticated;
    }
    return true;
  }, [authData, isError, authProvider?.isLegacy]);

  if (isFetching) {
    return (
      <Routes>
        <Route path="*" element={null} />
      </Routes>
    );
  }

  const CustomPathAfterLogin: React.FC = (): JSX.Element | null => {
    const { pathname, search } = location;
    const toURL = `${pathname}${search}`;

    return <Navigate to={`/login?to=${encodeURIComponent(toURL)}`} />;
  };

  const resourceRoutes: JSX.Element[] = [];

  resources.map((resource) => {
    const route = (
      <Route
        key={`${resource.route}`}
        path={`${resource.route}`}
        element={<ResourceComponent route={resource.route!} />}
      >
        <Route
          path=":action"
          element={<ResourceComponent route={resource.route!} />}
        >
          <Route
            path=":id"
            element={<ResourceComponent route={resource.route!} />}
          />
        </Route>
      </Route>
    );
    resourceRoutes.push(route);
  });

  const renderAuthorized = () => (
    <Routes>
      {[...(customRoutes || [])]
        .filter((p: RefineRouteProps) => !p.layout)
        .map((route, i) => (
          <Route key={`custom-route-${i}`} {...route} element={route.element} />
        ))}
      <Route
        path="/"
        element={
          <LayoutWrapper>
            <Outlet />
          </LayoutWrapper>
        }
      >
        {[...(customRoutes || [])]
          .filter((p: RefineRouteProps) => p.layout)
          .map((route, i) => (
            <Route
              key={`custom-route-${i}`}
              {...route}
              element={route.element}
            />
          ))}
        {DashboardPage ? (
          <Route
            index
            element={
              <CanAccess
                resource="dashboard"
                action="list"
                fallback={catchAll ?? <ErrorComponent />}
              >
                <DashboardPage />
              </CanAccess>
            }
          />
        ) : (
          <Route
            index
            element={
              <Navigate
                to={
                  initialRoute ??
                  `/${resources.find((p) => p.list)?.route?.replace(/^\//, "")}`
                }
              />
            }
          />
        )}
        {...[...(resourceRoutes || [])]}
        <Route path="*" element={<ResourceComponent route="" />} />
      </Route>
    </Routes>
  );

  const renderLoginRouteElement = (): JSX.Element => {
    if (LoginPage) return <LoginPage />;
    return <DefaultLoginPage />;
  };

  const renderUnauthorized = () => (
    <Routes>
      {[...(customRoutes || [])].map((route, i) => (
        <Route key={`custom-route-${i}`} {...route} />
      ))}
      <Route path="/" element={renderLoginRouteElement()} />
      <Route path="/login" element={renderLoginRouteElement()} />
      <Route path="*" element={<CustomPathAfterLogin />} />
    </Routes>
  );
  return isAuthenticated ? renderAuthorized() : renderUnauthorized();
};
