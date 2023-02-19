import React from "react";
import {
    GoConfig,
    ParseResponse,
    RouterBindings,
    matchResourceFromRoute,
    ResourceContext,
} from "@pankod/refine-core";
import { useCallback, useContext } from "react";
import { parse, stringify } from "qs";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";

export const stringifyConfig = {
    addQueryPrefix: true,
    skipNulls: true,
    arrayFormat: "indices" as const,
    encode: false,
    encodeValuesOnly: true,
};

export const routerBindings: RouterBindings = {
    go: () => {
        const { search: existingSearch, hash: existingHash } = useLocation();
        const navigate = useNavigate();

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
                        existingSearch &&
                        parse(existingSearch, { ignoreQueryPrefix: true })),
                    ...query,
                };

                const hasUrlQuery = Object.keys(urlQuery).length > 0;

                /** Get hash */
                const urlHash = `#${(
                    hash ||
                    (keepHash && existingHash) ||
                    ""
                ).replace(/^#/, "")}`;

                const hasUrlHash = urlHash.length > 1;

                const urlTo = to || "";

                const fullPath = `${urlTo}${
                    hasUrlQuery ? stringify(urlQuery, stringifyConfig) : ""
                }${hasUrlHash ? urlHash : ""}`;

                if (type === "path") {
                    return fullPath;
                }

                /** Navigate to the url */
                return navigate(fullPath, {
                    replace: type === "replace",
                });
            },
            [existingHash, existingSearch, navigate],
        );

        return fn;
    },
    back: () => {
        const navigate = useNavigate();

        const fn = useCallback(() => {
            navigate(-1);
        }, [navigate]);

        return fn;
    },
    parse: () => {
        const params = useParams();
        const { pathname, search } = useLocation();
        const { resources } = useContext(ResourceContext);

        const { resource, action } = React.useMemo(() => {
            return matchResourceFromRoute(pathname, resources);
        }, [resources, pathname]);

        const fn = useCallback(() => {
            const parsedSearch = parse(search, { ignoreQueryPrefix: true });

            const response: ParseResponse = {
                ...(resource && { resource }),
                ...(action && { action }),
                ...(params?.id && { id: decodeURIComponent(params.id) }),
                // ...(params?.action && { action: params.action }), // lets see if there is a need for this
                params: {
                    pathname,
                    ...params,
                    ...parsedSearch,
                },
            };

            return response;
        }, [pathname, search, params, resource, action]);

        return fn;
    },
    Link: ({ to, ...rest }) => <Link to={to} {...rest} />,
};
