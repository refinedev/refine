import {
    GoConfig,
    RouterBindings,
    ResourceContext,
    matchResourceFromRoute,
    ParseResponse,
} from "@pankod/refine-core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
        const { push, replace } = useRouter();
        const searchParamsObj = useSearchParams();

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
                        ? parse(searchParamsObj.toString(), {
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
            [searchParamsObj, push, replace],
        );

        return fn;
    },
    back: () => {
        const { back } = useRouter();

        return back;
    },
    parse: () => {
        const pathname = usePathname();
        const searchParamsObj = useSearchParams();
        const { resources } = useContext(ResourceContext);

        const { resource, action, matchedRoute } = React.useMemo(() => {
            if (!pathname) return { found: false };
            return matchResourceFromRoute(pathname, resources);
        }, [pathname, resources]);

        const inferredParams =
            matchedRoute && pathname
                ? paramsFromCurrentPath(pathname, matchedRoute)
                : {};

        const inferredId = inferredParams.id;

        const parsedParams = React.useMemo(() => {
            const searchParams = searchParamsObj.toString();
            return parse(searchParams, { ignoreQueryPrefix: true });
        }, [searchParamsObj]);

        const fn = React.useCallback(() => {
            const response: ParseResponse = {
                ...(resource && { resource }),
                ...(action && { action }),
                ...(inferredId && { id: decodeURIComponent(inferredId) }),
                params: {
                    pathname: pathname ? pathname : undefined,
                    ...inferredParams,
                    ...parsedParams,
                },
            };

            return response;
        }, [
            pathname,
            parsedParams,
            inferredParams,
            inferredId,
            resource,
            action,
        ]);

        return fn;
    },
    Link: ({ to, ...rest }) => <Link href={to} {...rest} />,
};
