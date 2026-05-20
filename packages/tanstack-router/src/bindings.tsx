import React, { type ComponentProps } from "react";
import {
  type GoConfig,
  type ParseResponse,
  type RouterProvider,
  matchResourceFromRoute,
  ResourceContext,
} from "@refinedev/core";
import { useCallback, useContext } from "react";
import {
  Link as TanStackLink,
  useLocation,
  useNavigate,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { convertToNumberIfPossible } from "./convert-to-number-if-possible";

export const stringifyConfig = {
  addQueryPrefix: true,
  skipNulls: true,
  arrayFormat: "indices" as const,
  encode: false,
  encodeValuesOnly: true,
};

export const routerProvider: RouterProvider = {
  go: () => {
    const {
      pathname,
      search: existingSearch,
      hash: existingHash,
    } = useLocation();
    const navigate = useNavigate();
    const router = useRouter();

    const fn = useCallback(
      ({
        to,
        type,
        query,
        hash,
        options: { keepQuery, keepHash } = {},
      }: GoConfig) => {
        const urlQuery = {
          ...(keepQuery ? existingSearch : {}),
          ...query,
        };

        const normalizedHash = (hash ?? (keepHash ? existingHash : "") ?? "")
          .replace(/^#/, "")
          .trim();

        const urlTo = to || pathname;
        const hasUrlQuery = Object.keys(urlQuery).length > 0;
        const hasUrlHash = normalizedHash.length > 0;

        const fullPath = router.buildLocation({
          to: urlTo as never,
          search: hasUrlQuery ? (urlQuery as never) : undefined,
          hash: hasUrlHash ? normalizedHash : undefined,
        }).href;

        if (type === "path") {
          return fullPath;
        }

        void navigate({
          to: urlTo as never,
          search: hasUrlQuery ? (urlQuery as never) : undefined,
          hash: hasUrlHash ? normalizedHash : undefined,
          replace: type === "replace",
        });

        return;
      },
      [existingHash, existingSearch, navigate, pathname, router],
    );

    return fn;
  },
  back: () => {
    const router = useRouter();

    const fn = useCallback(() => {
      router.history.back();
    }, [router]);

    return fn;
  },
  parse: () => {
    const params = useParams({ strict: false }) ?? {};
    const { pathname, search } = useLocation();
    const { resources } = useContext(ResourceContext);

    const { resource, action } = React.useMemo(() => {
      return matchResourceFromRoute(pathname, resources);
    }, [resources, pathname]);

    const fn = useCallback(() => {
      const combinedParams = {
        ...params,
        ...search,
      };

      const response: ParseResponse = {
        ...(resource && { resource }),
        ...(action && { action }),
        ...(params?.id && { id: params.id }),
        pathname,
        params: {
          ...combinedParams,
          currentPage: convertToNumberIfPossible(combinedParams.currentPage) as
            | number
            | undefined,
          pageSize: convertToNumberIfPossible(combinedParams.pageSize) as
            | number
            | undefined,
          to: combinedParams.to as string | undefined,
        },
      };

      return response;
    }, [action, params, pathname, resource, search]);

    return fn;
  },
  Link: React.forwardRef<
    HTMLAnchorElement,
    ComponentProps<NonNullable<RouterProvider["Link"]>>
  >(function RefineLink(props, ref) {
    return (
      <TanStackLink
        {...(props as ComponentProps<typeof TanStackLink>)}
        to={props.to as never}
        ref={ref as never}
      />
    );
  }),
};
