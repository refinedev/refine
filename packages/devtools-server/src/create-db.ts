import type { WebSocket } from "ws";

type Invocation = {
    id: number;
    method: string;
    trace: string[];
    fileName: string;
    lineNumber: number;
    meta: Record<string, unknown>;
};

export type Data = {
    connectedApp: null | string;
    clientWs: null | WebSocket;
    invocations: Invocation[];
};

const defaultData: Data = {
    connectedApp: null,
    clientWs: null,
    invocations: [],
};

export const createDb = (): Data => {
    return {
        ...defaultData,
    };
};
