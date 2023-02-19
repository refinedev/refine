import {
    GoConfig,
    RouterBindings,
    ResourceContext,
    matchResourceFromRoute,
    ParseResponse,
} from "@pankod/refine-core";
import { useRouter } from "next/router";
import Link from "next/link";
import { parse, stringify } from "qs";
import React, { useContext } from "react";
import { paramsFromCurrentPath } from "../common/params-from-current-path";

export const stringifyConfig = {
    addQueryPrefix: true,
    skipNulls: true,
    arrayFormat: "indices" as const,
    encode: false,
    encodeValuesOnly: true,
};

export const routerBindings: RouterBindings = {
    go: () => {
        const { push, replace, asPath: pathname } = useRouter();

        const fn = React.useCallback(
            ({
                to,
                type,
                query,
                options: { keepQuery, keepHash } = {},
                hash,
            }: GoConfig) => {
                let urlHash = "";

                if (keepHash && typeof document !== "undefined") {
                    urlHash = document.location.hash;
                }

                if (hash) {
                    urlHash = `#${hash.replace(/^#/, "")}`;
                }

                const urlQuery = {
                    ...(keepQuery
                        ? parse(pathname.split("?")[1], {
                              ignoreQueryPrefix: true,
                          })
                        : {}),
                    ...query,
                };

                const urlTo = to || "";

                const hasUrlHash = urlHash.length > 1;
                const hasUrlQuery = Object.keys(urlQuery).length > 0;

                const fullPath = `${urlTo}${
                    hasUrlQuery ? stringify(urlQuery, stringifyConfig) : ""
                }${hasUrlHash ? urlHash : ""}`;

                if (type === "path") {
                    return fullPath;
                }

                if (type === "replace") {
                    replace(fullPath);
                } else {
                    push(fullPath);
                }

                return undefined;
            },
            [pathname, push, replace],
        );

        return fn;
    },
    back: () => {
        const { back } = useRouter();

        return back;
    },
    parse: () => {
        const { query, asPath: pathname } = useRouter();
        const { resources } = useContext(ResourceContext);

        const { resource, action, matchedRoute } = React.useMemo(() => {
            return matchResourceFromRoute(pathname, resources);
        }, [pathname, resources]);

        const inferredParams =
            matchedRoute && pathname
                ? paramsFromCurrentPath(pathname, matchedRoute)
                : {};

        const inferredId = inferredParams.id;

        const parsedParams = React.useMemo(() => {
            const searchParams = pathname.split("?")[1];
            return parse(searchParams, { ignoreQueryPrefix: true });
        }, [pathname]);

        const fn = React.useCallback(() => {
            const response: ParseResponse = {
                ...(resource && { resource }),
                ...(action && { action }),
                ...(inferredId && { id: decodeURIComponent(inferredId) }),
                ...(query?.id && { id: decodeURIComponent(`${query?.id}`) }),
                params: {
                    pathname,
                    ...inferredParams,
                    ...query,
                    ...parsedParams,
                },
            };

            return response;
        }, [
            pathname,
            query,
            resource,
            action,
            inferredParams,
            inferredId,
            parsedParams,
        ]);

        return fn;
    },
    Link: ({ to, ...rest }) => <Link href={to} {...rest} />,
};
