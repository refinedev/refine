import React, { type ComponentProps } from "react";
import {
  type GoConfig,
  type ParseResponse,
  type RouterBindings,
  matchResourceFromRoute,
  ResourceContext,
} from "@refinedev/core";
import { useCallback, useContext } from "react";
import qs from "qs";
import {
  useNavigate,
  useLocation,
  Link,
  useParams,
} from "@tanstack/react-router";
import { convertToNumberIfPossible } from "./convert-to-number-if-possible";

export const stringifyConfig = {
  addQueryPrefix: true,
  skipNulls: true,
  arrayFormat: "indices" as const,
  encode: false,
  encodeValuesOnly: true,
};

export const routerBindings: RouterBindings = {
  go: () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fn = useCallback(
      ({
        to,
        type,
        query,
        hash,
        options: { keepQuery, keepHash } = {},
      }: GoConfig) => {
        /** Construct query params */
        const urlQuery = {
          ...(keepQuery &&
            location.search &&
            qs.parse(location.search, { ignoreQueryPrefix: true })),
          ...query,
        };

        if (urlQuery.to) {
          urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
        }

        const hasUrlQuery = Object.keys(urlQuery).length > 0;

        /** Get hash */
        const urlHash = `#${(hash || (keepHash && location.hash) || "").replace(
          /^#/,
          "",
        )}`;

        const hasUrlHash = urlHash.length > 1;

        const urlTo = to || "";

        const fullPath = `${urlTo}${
          hasUrlQuery ? qs.stringify(urlQuery, stringifyConfig) : ""
        }${hasUrlHash ? urlHash : ""}`;

        if (type === "path") {
          return fullPath;
        }

        /** Navigate to the url */
        navigate({
          to: fullPath,
          replace: type === "replace",
        });

        return;
      },
      [location.hash, location.search, navigate],
    );

    return fn;
  },
  back: () => {
    const navigate = useNavigate();

    const fn = useCallback(() => {
      // Use browser's history.back() for true back navigation
      window.history.back();
    }, [navigate]);

    return fn;
  },
  parse: () => {
    const params = useParams({ strict: false });
    const location = useLocation();
    const { resources } = useContext(ResourceContext);

    const { resource, action, matchedRoute } = React.useMemo(() => {
      return matchResourceFromRoute(location.pathname, resources);
    }, [resources, location.pathname]);

    const fn = useCallback(() => {
      const parsedSearch = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      const combinedParams = {
        ...params,
        ...parsedSearch,
      };

      const response: ParseResponse = {
        ...(resource && { resource }),
        ...(action && { action }),
        ...(params?.id && { id: decodeURIComponent(params.id) }),
        pathname: location.pathname,
        params: {
          ...combinedParams,
          current: convertToNumberIfPossible(
            combinedParams.current as string,
          ) as number | undefined,
          pageSize: convertToNumberIfPossible(
            combinedParams.pageSize as string,
          ) as number | undefined,
          to: combinedParams.to
            ? decodeURIComponent(combinedParams.to as string)
            : undefined,
        },
      };

      return response;
    }, [location.pathname, location.search, params, resource, action]);

    return fn;
  },
  Link: React.forwardRef<
    HTMLAnchorElement,
    ComponentProps<NonNullable<RouterBindings["Link"]>>
  >(function RefineLink({ to, ...props }, ref) {
    return <Link to={to} {...props} ref={ref} />;
  }),
};
