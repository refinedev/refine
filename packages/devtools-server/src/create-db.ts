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
    invocations: Invocation[];
};

const defaultData: Data = {
    connectedApp: null,
    invocations: [],
};

export const createDb = (): Data => {
    return {
        ...defaultData,
    };
};
