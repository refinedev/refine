import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { BaseKey } from "src/interfaces";

type TLogRenameData = void | false | string;

export const useLogRename = (): UseMutationResult<
    TLogRenameData,
    Error,
    { id: BaseKey; name: string }
> => {
    const auditLogContext = useContext(AuditLogContext);
    const queryClient = useQueryClient();

    if (!auditLogContext) {
        throw new Error("auditLogProvider is not defined.");
    }

    if (!auditLogContext.rename) {
        throw new Error("auditLogProvider's `rename` is not defined.");
    }

    const queryResponse = useMutation<
        TLogRenameData,
        Error,
        { id: BaseKey; name: string },
        unknown
    >("useLogRename", auditLogContext.rename, {
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(["useLogList", data.resource]);
        },
    });

    return queryResponse;
};
