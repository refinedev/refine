import React from "react";
import * as ReactRouterDom from "react-router-dom";
import type * as RefineCoreTypes from "@refinedev/core";
import { MemoryRouterComponent } from "@refinedev/react-router-v6/legacy";
import * as LegacyRefineReactRouterV6Base from "@refinedev/react-router-v6/legacy";
import * as RefineReactRouterV6Base from "@refinedev/react-router-v6";
import * as RefineSimpleRest from "@refinedev/simple-rest";
import * as RefineReactHookForm from "@refinedev/react-hook-form";
import * as RefineReactTable from "@refinedev/react-table";
import * as ReactHookForm from "react-hook-form";
import * as TanstackReactTable from "@tanstack/react-table";
import * as RefineCore from "@refinedev/core";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

declare global {
  interface Window {
    routerSettings?: { initialEntries?: string[] };
    refineProps?: Partial<React.ComponentProps<typeof RefineCore.Refine>>;
    __refineIconSVGContent?: string;
    __refineTitleContent?: string;
  }
}

export const ExternalNavigationContext = React.createContext<{
  go: RefineCoreTypes.GoFunction;
  setGo: (ref: { current: RefineCoreTypes.GoFunction }) => void;
}>({
  go: () => undefined,
  setGo: () => undefined,
});

const ExternalNavigationProvider = ({ children }: React.PropsWithChildren) => {
  const [navigation, setNavigation] = React.useState<{
    current: RefineCoreTypes.GoFunction;
  }>({ current: () => undefined });

  return (
    <ExternalNavigationContext.Provider
      value={{
        go: (...args) => navigation.current(...args),
        setGo: (go) => setNavigation(go),
      }}
    >
      {children}
    </ExternalNavigationContext.Provider>
  );
};

const NavigationHandler = () => {
  const context = React.useContext(ExternalNavigationContext);
  const go = RefineCore.useGo();
  const goRef = React.useRef(go);

  React.useEffect(() => {
    if (context) {
      goRef.current = go;
      context.setGo(goRef);
    }
  }, []);

  return null;
};

const Refine = (
  props: React.ComponentProps<typeof RefineCore.Refine>,
): JSX.Element => {
  const { options: hiddenRefineOptions, ...hiddenRefineProps } =
    window.refineProps ?? {};
  return (
    <RefineCore.Refine
      {...props}
      options={{
        disableTelemetry: true,
        ...(props?.options || {}),
        ...(hiddenRefineOptions || {}),
        reactQuery: {
          devtoolConfig: false,
          ...(props?.options?.reactQuery || {}),
          ...(hiddenRefineOptions?.reactQuery || {}),
        },
      }}
      {...hiddenRefineProps}
    >
      {props.children}
      <NavigationHandler />
    </RefineCore.Refine>
  );
};

const setInitialRoutes = (initialEntries: string[]): void => {
  if (typeof window !== "undefined") {
    window.routerSettings = {
      initialEntries,
    };
  }
};

const setRefineProps = (
  props: Partial<React.ComponentProps<typeof RefineCore.Refine>>,
) => {
  if (typeof window !== "undefined") {
    window.refineProps = props;
  }
};

const DemoMemoryRouterComponent = (
  props: React.ComponentProps<typeof MemoryRouterComponent>,
): JSX.Element => {
  return (
    <MemoryRouterComponent
      {...props}
      {...(typeof window !== "undefined" ? window.routerSettings : {})}
    />
  );
};

const DemoMemoryRouter = (
  props: React.ComponentProps<typeof ReactRouterDom.MemoryRouter>,
): JSX.Element => {
  return (
    <ReactRouterDom.MemoryRouter
      {...props}
      {...(typeof window !== "undefined" ? window.routerSettings : {})}
    />
  );
};

const LegacyRefineReactRouterV6 = {
  ...LegacyRefineReactRouterV6Base,
  MemoryRouterComponent: DemoMemoryRouterComponent,
  default: {
    ...LegacyRefineReactRouterV6Base.default,
    RouterComponent: DemoMemoryRouterComponent,
  },
};

/**
 * @deprecated please use `setInitialRoutes` instead
 */
const LegacyRefineDemoReactRouterV6 = (
  initialRoutes?: string[],
): RefineCoreTypes.IRouterProvider => {
  if (initialRoutes) {
    setInitialRoutes(initialRoutes);
  }

  return LegacyRefineReactRouterV6.default;
};

const RefineHeadlessDemo: React.FC<
  Partial<RefineCoreTypes.RefineProps> & {
    initialRoutes?: string[];
  }
> = ({ initialRoutes, ...rest }) => {
  if (initialRoutes) {
    setInitialRoutes(initialRoutes);
  }

  return (
    <Refine
      legacyRouterProvider={LegacyRefineReactRouterV6.default}
      dataProvider={RefineSimpleRest.default(SIMPLE_REST_API_URL)}
      options={{
        disableTelemetry: true,
        reactQuery: {
          devtoolConfig: false,
        },
      }}
      {...rest}
    />
  );
};

export const RefineCommonScope = {
  // React
  React,
  ...React,
  // Core
  RefineCore: {
    ...RefineCore,
    ExternalNavigationProvider,
    Refine,
  },
  ReactRouterDom: {
    ...ReactRouterDom,
    BrowserRouter: DemoMemoryRouter,
  },
  // Data
  RefineSimpleRest,
  // Utilities
  setInitialRoutes,
  setRefineProps,
  RefineReactRouterV6: RefineReactRouterV6Base,
  LegacyRefineReactRouterV6,
  LegacyRefineDemoReactRouterV6,
  // UI
  RefineHeadlessDemo,
  // Other
  RefineReactHookForm,
  RefineReactTable,
  ReactHookForm,
  TanstackReactTable,
};
