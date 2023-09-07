import { DevtoolsEvent, TraceType, send } from "@refinedev/devtools-shared";
import { Mutation, Query } from "@tanstack/react-query";
import { createIdentifier } from "./create-identifier";

export const createMutationListener =
    (ws: WebSocket) => (mutation?: Mutation) => {
        if (!mutation?.meta?.trace) return;

        new Promise<void>((resolve) => {
            send(ws, DevtoolsEvent.ACTIVITY, {
                type: "mutation",
                identifier: createIdentifier(
                    mutation?.options.mutationKey,
                    mutation?.meta?.trace as any,
                ),
                key: mutation?.options.mutationKey as any,
                status: mutation?.state.status,
                trace: mutation?.meta?.trace as TraceType[],
                state: mutation?.state,
                variables: mutation?.state?.variables,
            });
            resolve();
        });

        // console.table({
        //     type: "mutation",
        //     key: mutation?.options.mutationKey,
        //     id: mutation?.mutationId,
        //     status: mutation?.state.status,
        //     trace: mutation?.meta?.trace,
        //     state: mutation?.state,
        //     variables: mutation?.state?.variables,
        // });
    };

export const createQueryListener = (ws: WebSocket) => (query: Query) => {
    if (!query?.meta?.trace) return;

    new Promise<void>((resolve) => {
        send(ws, DevtoolsEvent.ACTIVITY, {
            type: "query",
            identifier: createIdentifier(
                query.queryKey,
                query.meta?.trace as any,
            ),
            key: query.queryKey as any,
            status: query.state.status,
            trace: query.meta?.trace as TraceType[],
            state: query.state,
        });
        resolve();
    });

    // console.table({
    //     type: "query",
    //     key: query.queryKey,
    //     status: query.state.status,
    //     trace: query.meta?.trace,
    //     state: query.state,
    // });
};
