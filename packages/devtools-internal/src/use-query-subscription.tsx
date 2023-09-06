import { DevToolsContext } from "@refinedev/devtools-shared";
import { QueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";

export const useQuerySubscription = (queryClient: QueryClient) => {
    const { ws } = useContext(DevToolsContext);
    const queryCacheSubscription = React.useRef<() => void>();
    const mutationCacheSubscription = React.useRef<() => void>();

    React.useEffect(() => {
        console.log("useQuerySubscription", ws);
        if (!ws) return () => 0;

        const queryCache = queryClient.getQueryCache();

        queryCache.getAll().forEach((query) => {
            console.table({
                name: "sub - init",
                key: query.queryKey,
                status: query.state.status,
                meta: query.meta,
            });
        });

        queryCacheSubscription.current = queryCache.subscribe(
            ({ query, type }) => {
                if (["added", "updated"].includes(type)) {
                    console.table({
                        name: `sub - ${type}`,
                        key: query.queryKey,
                        status: query.state.status,
                        meta: query.meta,
                    });
                }
            },
        );

        return () => {
            queryCacheSubscription.current?.();
        };
    }, [ws, queryClient]);

    React.useEffect(() => {
        if (!ws) return () => 0;

        const mutationCache = queryClient.getMutationCache();

        mutationCache.getAll().forEach((mutation) => {
            console.table({
                name: "sub - (mut) init",
                key: mutation.options.mutationKey,
                id: mutation.mutationId,
                status: mutation.state.status,
                meta: mutation.meta,
            });
        });

        mutationCacheSubscription.current = mutationCache.subscribe(
            ({ mutation, type }) => {
                if (["added", "updated"].includes(type)) {
                    console.table({
                        name: `sub - (mut) ${type}`,
                        key: mutation?.options.mutationKey,
                        id: mutation?.mutationId,
                        status: mutation?.state.status,
                        meta: mutation?.meta,
                    });
                }
            },
        );

        return () => {
            mutationCacheSubscription.current?.();
        };
    }, [ws, queryClient]);

    return {};
};
